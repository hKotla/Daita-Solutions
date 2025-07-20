from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid


# Company Models
class CompanyInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    tagline: str
    description: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class CompanyInfoCreate(BaseModel):
    name: str
    tagline: str
    description: str


# Service Models
class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    features: List[str]
    icon: str
    order: int = 0
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ServiceCreate(BaseModel):
    title: str
    description: str
    features: List[str]
    icon: str
    order: int = 0


# Team Models
class TeamMember(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    bio: str
    image: str
    order: int = 0
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class TeamMemberCreate(BaseModel):
    name: str
    role: str
    bio: str
    image: str
    order: int = 0


# Testimonial Models
class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    content: str
    rating: int = Field(ge=1, le=5)
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class TestimonialCreate(BaseModel):
    name: str
    role: str
    content: str
    rating: int = Field(ge=1, le=5)


# Case Study Models
class CaseStudy(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    client: str
    challenge: str
    solution: str
    results: List[str]
    industry: str
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class CaseStudyCreate(BaseModel):
    title: str
    client: str
    challenge: str
    solution: str
    results: List[str]
    industry: str


# Contact Models
class ContactInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    phone: str
    address: str
    hours: str
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ContactInfoCreate(BaseModel):
    email: str
    phone: str
    address: str
    hours: str


# Contact Message Models
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: Optional[str] = None
    message: str
    status: str = "received"
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    ip_address: Optional[str] = None

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    company: Optional[str] = None
    message: str

class ContactMessageResponse(BaseModel):
    id: str
    status: str
    timestamp: datetime