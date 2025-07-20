from models import CompanyInfo, Service, TeamMember, Testimonial, CaseStudy, ContactInfo
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]


async def seed_company_data():
    """Seed company information"""
    company_data = CompanyInfo(
        name="DAITA Solutions",
        tagline="Transforming Business Through Intelligent AI Solutions",
        description="Leading IT consulting firm specializing in AI transformations, intelligent system testing, and GenAI-powered quality engineering for enterprise success."
    )
    
    # Check if company data exists
    existing = await db.company.find_one()
    if not existing:
        await db.company.insert_one(company_data.dict())
        print("Company data seeded successfully")
    else:
        print("Company data already exists")


async def seed_services_data():
    """Seed services data"""
    services = [
        Service(
            title="AI Transformations",
            description="End-to-end AI implementation strategies that revolutionize your business operations, from legacy system modernization to intelligent automation.",
            features=["Strategic AI Planning", "Legacy System Integration", "Process Automation", "ROI Optimization"],
            icon="Brain",
            order=1
        ),
        Service(
            title="AI System Testing",
            description="Comprehensive testing frameworks for AI models and systems, ensuring reliability, accuracy, and performance at enterprise scale.",
            features=["Model Validation", "Performance Testing", "Bias Detection", "Compliance Verification"],
            icon="TestTube",
            order=2
        ),
        Service(
            title="Quality Engineering with GenAI",
            description="Revolutionary quality assurance powered by Generative AI, transforming traditional QA into intelligent, predictive quality engineering.",
            features=["Automated Test Generation", "Predictive Quality Metrics", "Intelligent Bug Detection", "Continuous Quality Improvement"],
            icon="Cog",
            order=3
        )
    ]
    
    # Check if services exist
    existing_count = await db.services.count_documents({})
    if existing_count == 0:
        for service in services:
            await db.services.insert_one(service.dict())
        print("Services data seeded successfully")
    else:
        print("Services data already exists")


async def seed_team_data():
    """Seed team data"""
    team_members = [
        TeamMember(
            name="Dr. Sarah Chen",
            role="Chief AI Officer",
            bio="15+ years in AI research and enterprise implementation. Former Google AI researcher with expertise in machine learning and neural networks.",
            image="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            order=1
        ),
        TeamMember(
            name="Michael Rodriguez",
            role="Head of AI Testing",
            bio="Expert in AI system validation with 12+ years in quality assurance. Specializes in testing ML models and ensuring AI system reliability.",
            image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            order=2
        ),
        TeamMember(
            name="Emily Johnson",
            role="GenAI Quality Engineer",
            bio="Pioneer in GenAI applications for quality engineering. 10+ years in software testing with deep expertise in generative AI integration.",
            image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            order=3
        )
    ]
    
    # Check if team data exists
    existing_count = await db.team.count_documents({})
    if existing_count == 0:
        for member in team_members:
            await db.team.insert_one(member.dict())
        print("Team data seeded successfully")
    else:
        print("Team data already exists")


async def seed_testimonials_data():
    """Seed testimonials data"""
    testimonials = [
        Testimonial(
            name="David Thompson",
            role="CTO, TechCorp Industries",
            content="DAITA Solutions transformed our entire operation with their AI implementation. Our efficiency increased by 300% and we're now industry leaders in automation.",
            rating=5
        ),
        Testimonial(
            name="Lisa Wang",
            role="VP Engineering, InnovateTech",
            content="Their AI testing framework saved us millions in potential failures. The quality and reliability of our AI systems improved dramatically.",
            rating=5
        ),
        Testimonial(
            name="Robert Anderson",
            role="Head of Quality, DataFlow Solutions",
            content="GenAI-powered quality engineering revolutionized our QA process. We detect issues 80% faster and deliver higher quality products consistently.",
            rating=5
        )
    ]
    
    # Check if testimonials exist
    existing_count = await db.testimonials.count_documents({})
    if existing_count == 0:
        for testimonial in testimonials:
            await db.testimonials.insert_one(testimonial.dict())
        print("Testimonials data seeded successfully")
    else:
        print("Testimonials data already exists")


async def seed_case_studies_data():
    """Seed case studies data"""
    case_studies = [
        CaseStudy(
            title="Global Bank AI Transformation",
            client="Major Financial Institution",
            challenge="Manual processes causing delays and errors in loan processing",
            solution="Implemented AI-powered document processing and decision automation",
            results=["90% reduction in processing time", "99.5% accuracy improvement", "$50M annual savings"],
            industry="Financial Services"
        ),
        CaseStudy(
            title="Healthcare AI Testing Framework",
            client="Leading Medical Device Company",
            challenge="Ensuring AI diagnostic tools meet regulatory compliance",
            solution="Comprehensive AI testing suite with bias detection and validation",
            results=["100% regulatory compliance", "Zero critical failures", "6 months faster to market"],
            industry="Healthcare"
        ),
        CaseStudy(
            title="E-commerce Quality Revolution",
            client="Top 10 E-commerce Platform",
            challenge="Quality issues affecting customer experience and revenue",
            solution="GenAI-powered predictive quality engineering system",
            results=["85% reduction in bugs", "40% faster delivery", "99.9% system uptime"],
            industry="E-commerce"
        )
    ]
    
    # Check if case studies exist
    existing_count = await db.case_studies.count_documents({})
    if existing_count == 0:
        for study in case_studies:
            await db.case_studies.insert_one(study.dict())
        print("Case studies data seeded successfully")
    else:
        print("Case studies data already exists")


async def seed_contact_data():
    """Seed contact information"""
    contact_data = ContactInfo(
        email="hello@daitasolutions.com",
        phone="+1 (555) 123-4567",
        address="123 Innovation Drive, Tech Valley, CA 94025",
        hours="Monday - Friday, 9:00 AM - 6:00 PM PST"
    )
    
    # Check if contact data exists
    existing = await db.contact.find_one()
    if not existing:
        await db.contact.insert_one(contact_data.dict())
        print("Contact data seeded successfully")
    else:
        print("Contact data already exists")


async def seed_all_data():
    """Seed all data"""
    print("Starting data seeding...")
    await seed_company_data()
    await seed_services_data()
    await seed_team_data()
    await seed_testimonials_data()
    await seed_case_studies_data()
    await seed_contact_data()
    print("Data seeding completed!")
    client.close()


if __name__ == "__main__":
    asyncio.run(seed_all_data())