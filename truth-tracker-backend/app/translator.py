import time
from deep_translator import GoogleTranslator, MyMemoryTranslator


def translate_to_english(text: str, detected_language: str) -> str:
    """
    Translates Urdu or Roman Urdu text into English using Deep-Translator (GoogleTranslator),
    with a short retry and MyMemoryTranslator fallback if rate-limited.
    Returns original text unchanged if already English.
    """
    if not text or not text.strip():
        return text

    if detected_language == "English":
        return text

    source_lang = "ur" if detected_language == "Urdu" else "auto"

    # 1. Primary: GoogleTranslator with brief retry on temporary rate-limits
    for attempt in range(2):
        try:
            translated = GoogleTranslator(source=source_lang, target="en").translate(text)
            if translated and translated.strip():
                return translated.strip()
        except Exception as exc:
            err_msg = str(exc).lower()
            if "too many requests" in err_msg or "429" in err_msg or "502" in err_msg:
                time.sleep(1.5 * (attempt + 1))
                continue
            break

    # 2. Fallback: MyMemoryTranslator if Google temporarily blocks/rate-limits
    try:
        fallback_result = MyMemoryTranslator(source="ur-PK", target="en-GB").translate(text)
        if fallback_result and fallback_result.strip():
            return fallback_result.strip()
    except Exception:
        pass

    raise RuntimeError(
        "Translation service is temporarily rate-limited. Please wait a moment and try again."
    )