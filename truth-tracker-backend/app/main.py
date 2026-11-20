from fastapi import FastAPI
from pydantic import BaseModel
from app.cleaner import clean_claim
from app.language_detector import detect_language
from app.translator import translate_to_english  # apne translator module ka exact path check kar lein

app = FastAPI(title="Truth Tracker Backend")


class ClaimInput(BaseModel):
    claim: str


@app.get("/")
def home():
    return {"message": "FastAPI is running!"}


@app.post("/ingest")
def ingest_claim(data: ClaimInput):
    cleaned = clean_claim(data.claim)
    language = detect_language(cleaned)

    translated = None
    translation_warning = None

    if language in ("Urdu", "Roman Urdu"):
        try:
            translated = translate_to_english(cleaned, language)
        except Exception as exc:
            translation_warning = str(exc)

    return {
        "original_claim": data.claim,
        "cleaned_claim": cleaned,
        "detected_language": language,
        "translated_claim": translated,
        "translation_warning": translation_warning,
    }