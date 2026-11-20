import re


def clean_claim(text: str) -> str:
    if not text:
        return ""

    # 1. Remove URLs if present
    text = re.sub(r"https?://\S+|www\.\S+", " ", text)

    # 2. Collapse extra spaces and line breaks into a single space
    text = re.sub(r"\s+", " ", text).strip()

    # 3. Remove unwanted symbols while keeping English/Urdu chars, numbers, and common claim punctuation
    text = re.sub(r"[^\w\s\u0600-\u06FF.,!?\-'%$]", " ", text)

    # 4. Normalize spaces again after symbol removal
    return re.sub(r"\s+", " ", text).strip()