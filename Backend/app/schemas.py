from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field

class HealthResponse(BaseModel):
    status: str
    app: str

# Auth Schemas
class UserCreate(BaseModel):
    email: str = Field(..., description="User's email address")
    password: str = Field(..., description="User's password")

class OTPGenerate(BaseModel):
    email: str = Field(..., description="User's email address")

class OTPVerify(BaseModel):
    email: str = Field(..., description="User's email address")
    otp_code: str = Field(..., description="The 6-digit OTP code received via email")

class UserLogin(BaseModel):
    email: str = Field(..., description="User's email address")
    password: str = Field(..., description="User's password")

class Token(BaseModel):
    access_token: str
    token_type: str

class UserResponse(BaseModel):
    id: int
    email: str
    is_verified: bool

# Case / Formulation Submission Schemas
class CreateCasePayload(BaseModel):
    title: str = Field(..., description="Title of the formulation/case")
    description: str = Field(..., description="Description of the case")
    as_of_date: str = Field(..., description="Relevant date for the case")
    jurisdiction: str = Field(..., description="Jurisdiction involved")

class CaseResponse(BaseModel):
    id: str = Field(..., description="Case ID (submission_id)")
    title: str
    description: str
    as_of_date: str
    jurisdiction: str
    status: str

class FormulationSubmitRequest(BaseModel):
    title: str = Field(..., description="Title of the formulation")
    ingredients: str = Field(..., description="Comma separated list of ingredients")
    disease: str = Field(..., description="Target disease or purpose")
    preparation_method: Optional[str] = Field(None, description="How to prepare the formulation")
    dosage: Optional[str] = Field(None, description="Recommended dosage")
    route: Optional[str] = Field(None, description="Route of administration")

class FormulationSubmissionResponse(BaseModel):
    submission_id: str
    status: str
    message: str

class FormulationDetailResponse(BaseModel):
    submission_id: str
    title: str
    status: str
    result: Optional[Dict[str, Any]] = None

class ExtractedFactSchema(BaseModel):
    id: Optional[int] = None
    submission_id: str
    field: str
    value: Optional[str] = None
    normalized_value: Optional[str] = None
    status: str = "PENDING"
    confidence: float = 0.0

    class Config:
        from_attributes = True


# TKDL Search Schemas
class TKDLSearchRequest(BaseModel):
    query: Optional[str] = None
    ingredient: Optional[str] = None
    disease: Optional[str] = None
    tkrc_code: Optional[str] = None

class TKDLRecordResponse(BaseModel):
    record_id: str
    title: str
    disease: Optional[str] = None
    ingredients: Optional[str] = None
    tkrc_code: Optional[str] = None
    ipc_code: Optional[str] = None

class TKDLSearchResponse(BaseModel):
    results: List[TKDLRecordResponse]
    total_count: int

# Integration Contracts (ML & RAG)
class MLInputSchema(BaseModel):
    submission_id: str
    title: str
    ingredients: str
    disease: str
    preparation_method: Optional[str]
    dosage: Optional[str]
    route: Optional[str]

class MLOutputSchema(BaseModel):
    risk_category: str
    confidence: float
    similarity_scores: Dict[str, float]
    matched_records: List[str]
    feature_breakdown: Dict[str, Any]

class RAGInputSchema(BaseModel):
    formulation: FormulationSubmitRequest
    matched_records: List[Dict[str, Any]]
    similarity_scores: Dict[str, float]

class RAGOutputSchema(BaseModel):
    explanation_text: str
    citations: List[str]
    confidence_note: str
    insufficient_evidence: bool = False

class ErrorResponse(BaseModel):
    detail: str
