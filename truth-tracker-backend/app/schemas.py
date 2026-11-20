from pydantic import BaseModel, Field


class ClaimRequest(BaseModel):
    claim: str = Field(..., min_length=1, max_length=1500)
    days: int = Field(default=7, ge=1, le=365)


class IngestionPreviewResponse(BaseModel):
    original_claim: str
    cleaned_claim: str