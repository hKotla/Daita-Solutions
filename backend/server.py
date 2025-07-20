from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List
from models import (
    CompanyInfo, Service, TeamMember, Testimonial, CaseStudy, 
    ContactInfo, ContactMessage, ContactMessageCreate, ContactMessageResponse
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Company endpoint
@api_router.get("/company", response_model=CompanyInfo)
async def get_company():
    company = await db.company.find_one()
    if not company:
        raise HTTPException(status_code=404, detail="Company information not found")
    return CompanyInfo(**company)


# Services endpoints
@api_router.get("/services", response_model=List[Service])
async def get_services():
    services = await db.services.find({"is_active": True}).sort("order", 1).to_list(1000)
    return [Service(**service) for service in services]


# Team endpoints
@api_router.get("/team", response_model=List[TeamMember])
async def get_team():
    team_members = await db.team.find({"is_active": True}).sort("order", 1).to_list(1000)
    return [TeamMember(**member) for member in team_members]


# Testimonials endpoints
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    testimonials = await db.testimonials.find({"is_active": True}).to_list(1000)
    return [Testimonial(**testimonial) for testimonial in testimonials]


# Case Studies endpoints
@api_router.get("/case-studies", response_model=List[CaseStudy])
async def get_case_studies():
    case_studies = await db.case_studies.find({"is_active": True}).to_list(1000)
    return [CaseStudy(**study) for study in case_studies]


# Contact endpoints
@api_router.get("/contact", response_model=ContactInfo)
async def get_contact():
    contact = await db.contact.find_one()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact information not found")
    return ContactInfo(**contact)


# Contact message endpoint
@api_router.post("/contact/message", response_model=ContactMessageResponse)
async def create_contact_message(message_data: ContactMessageCreate):
    # Create contact message
    contact_message = ContactMessage(**message_data.dict())
    
    # Save to database
    result = await db.contact_messages.insert_one(contact_message.dict())
    
    if not result.inserted_id:
        raise HTTPException(status_code=500, detail="Failed to save message")
    
    return ContactMessageResponse(
        id=contact_message.id,
        status=contact_message.status,
        timestamp=contact_message.timestamp
    )


# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "DAITA Solutions API is running"}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()


# Startup event to ensure data is seeded
@app.on_event("startup")
async def startup_event():
    logger.info("Starting DAITA Solutions API...")
    
    # Run seed data on startup
    from seed_data import seed_all_data
    try:
        await seed_all_data()
        logger.info("Database seeded successfully")
    except Exception as e:
        logger.error(f"Error seeding database: {e}")
    
    logger.info("DAITA Solutions API started successfully")