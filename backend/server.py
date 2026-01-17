from fastapi import FastAPI, APIRouter, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta
import random


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Add CORS middleware FIRST (before routes)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# BULLETPROOF Health check endpoints - registered on main app instance
# These are added directly to app (not router) to ensure they're always accessible
@app.get("/health")
async def health_check_root():
    """Health check at /health for Kubernetes probes"""
    return {"status": "ok"}

@app.get("/api/health")
async def health_check_api():
    """Health check at /api/health as fallback"""
    return {"status": "ok"}

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Messy Data Generation Configuration
COMPONENTS = [
    "Authentication Module", "auth-module", "Auth System", "authentication_service",
    "Payment Gateway", "payment-processor", "PaymentGateway", "payment_api",
    "User Dashboard", "dashboard", "user-ui", "Dashboard Component",
    "API Gateway", "api-gateway", "API_Gateway", "gateway-service",
    "Database Layer", "db-layer", "DatabaseService", "data_layer",
    "Notification System", "notifications", "NotificationService", "notify-service",
    "File Upload", "upload-module", "FileUploadService", "file_handler",
    "Search Engine", "search", "SearchService", "search-api"
]

DEFECT_TYPES = [
    "Null Pointer Exception", "NullPointerException", "NPE", "null reference",
    "Memory Leak", "memory-leak", "Memory Issue", "mem leak",
    "Race Condition", "race condition", "concurrency issue", "thread safety",
    "SQL Injection", "SQLInjection", "sql-injection", "injection vulnerability",
    "Authentication Bypass", "auth bypass", "AuthBypass", "authentication failure",
    "UI Rendering Bug", "ui-bug", "rendering issue", "display problem",
    "Performance Degradation", "performance issue", "slow response", "perf-bug",
    "Data Validation Error", "validation-error", "invalid data", "validation bug"
]

SEVERITIES = ["Critical", "critical", "CRITICAL", "High", "high", "HIGH", "Medium", "medium", "Med", "Low", "low", "LOW"]
STATUSES = ["Open", "open", "OPEN", "In Progress", "in-progress", "In-Progress", "Closed", "closed", "CLOSED", "Resolved", "resolved"]
OWNERS = ["john.doe@company.com", "jane.smith@company.com", "bob.wilson@company.com", "alice.brown@company.com", 
          "charlie.davis@company.com", "diana.miller@company.com", "eric.taylor@company.com", None, "unassigned", ""]
RELEASES = ["v1.2.0", "v1.2.1", "v1.3.0", "v1.3.1", "v1.4.0", "v2.0.0", "v2.1.0", None, "", "TBD", "unknown"]

# Generate messy defect dataset
def generate_messy_defects(count: int = 500) -> List[Dict[str, Any]]:
    defects = []
    base_date = datetime.now(timezone.utc) - timedelta(days=180)
    
    for i in range(count):
        # Introduce data quality issues
        missing_fields = random.random() < 0.15  # 15% chance of missing fields
        duplicate_chance = random.random() < 0.08  # 8% chance of duplicate
        inconsistent_naming = random.random() < 0.25  # 25% inconsistent naming
        
        created_date = base_date + timedelta(days=random.randint(0, 180), hours=random.randint(0, 23))
        
        # Normalize severity for internal logic but store messy version
        severity_raw = random.choice(SEVERITIES)
        severity_normalized = severity_raw.lower().replace('med', 'medium')
        
        # Determine resolution time based on severity
        if severity_normalized in ['critical', 'high']:
            resolution_days = random.randint(1, 10)
        elif severity_normalized == 'medium':
            resolution_days = random.randint(5, 20)
        else:
            resolution_days = random.randint(10, 40)
            
        status = random.choice(STATUSES)
        resolved_date = None
        if status.lower() in ['closed', 'resolved']:
            resolved_date = created_date + timedelta(days=resolution_days)
        
        defect = {
            "id": f"DEF-{1000 + i}",
            "title": random.choice(DEFECT_TYPES),
            "component": random.choice(COMPONENTS) if not missing_fields or random.random() > 0.3 else None,
            "severity": severity_raw if not inconsistent_naming else severity_raw.upper(),
            "status": status,
            "owner": random.choice(OWNERS) if not missing_fields else None,
            "release": random.choice(RELEASES),
            "created_at": created_date.isoformat(),
            "resolved_at": resolved_date.isoformat() if resolved_date else None,
            "description": f"Issue with {random.choice(COMPONENTS)}" if random.random() > 0.2 else None,
            "recurrence_count": random.randint(0, 5) if random.random() > 0.7 else 1,
        }
        
        defects.append(defect)
        
        # Add duplicate with slight variations
        if duplicate_chance:
            duplicate = defect.copy()
            duplicate["id"] = f"DEF-{1000 + i}-DUP"
            duplicate["created_at"] = (created_date + timedelta(hours=random.randint(1, 48))).isoformat()
            defects.append(duplicate)
    
    return defects


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


# Defect API Routes
@api_router.get("/defects")
async def get_defects(
    severity: Optional[str] = None,
    status: Optional[str] = None,
    component: Optional[str] = None,
    release: Optional[str] = None
):
    """Get defects with optional filters"""
    defects = generate_messy_defects(500)
    
    # Apply filters
    if severity:
        defects = [d for d in defects if d.get('severity', '').lower() == severity.lower()]
    if status:
        defects = [d for d in defects if d.get('status', '').lower() == status.lower()]
    if component:
        defects = [d for d in defects if d.get('component') and component.lower() in d.get('component', '').lower()]
    if release:
        defects = [d for d in defects if d.get('release') == release]
    
    return {"defects": defects, "total": len(defects)}


@api_router.get("/defects/analytics")
async def get_defect_analytics():
    """Get analytics data including recurrence, severity trends, and quality metrics"""
    defects = generate_messy_defects(500)
    
    # Calculate KPIs
    total_defects = len(defects)
    open_defects = len([d for d in defects if d.get('status', '').lower() in ['open', 'in progress', 'in-progress']])
    
    # Normalize severity for counting
    critical_defects = len([d for d in defects if d.get('severity', '').lower() == 'critical'])
    
    # Calculate recurrence rate
    recurring_defects = len([d for d in defects if d.get('recurrence_count', 1) > 1])
    recurrence_rate = (recurring_defects / total_defects * 100) if total_defects > 0 else 0
    
    # Calculate average resolution time
    resolved_defects = [d for d in defects if d.get('resolved_at')]
    total_resolution_time = 0
    for d in resolved_defects:
        created = datetime.fromisoformat(d['created_at'])
        resolved = datetime.fromisoformat(d['resolved_at'])
        total_resolution_time += (resolved - created).days
    avg_resolution_time = (total_resolution_time / len(resolved_defects)) if resolved_defects else 0
    
    # Data quality metrics
    missing_component = len([d for d in defects if not d.get('component')])
    missing_owner = len([d for d in defects if not d.get('owner') or d.get('owner') in ['', 'unassigned']])
    missing_description = len([d for d in defects if not d.get('description')])
    missing_required_fields_pct = ((missing_component + missing_owner) / (total_defects * 2) * 100)
    
    # Defect recurrence analysis
    defect_type_recurrence = {}
    for d in defects:
        defect_type = d.get('title', 'Unknown')
        recurrence = d.get('recurrence_count', 1)
        if defect_type in defect_type_recurrence:
            defect_type_recurrence[defect_type] += recurrence
        else:
            defect_type_recurrence[defect_type] = recurrence
    
    recurrence_data = [
        {"type": k, "count": v} 
        for k, v in sorted(defect_type_recurrence.items(), key=lambda x: x[1], reverse=True)[:10]
    ]
    
    # Severity trends over time (monthly)
    severity_trends = {}
    for d in defects:
        created = datetime.fromisoformat(d['created_at'])
        month_key = created.strftime('%Y-%m')
        severity = d.get('severity', '').lower().replace('med', 'medium')
        
        if month_key not in severity_trends:
            severity_trends[month_key] = {'critical': 0, 'high': 0, 'medium': 0, 'low': 0}
        
        if severity in severity_trends[month_key]:
            severity_trends[month_key][severity] += 1
    
    severity_timeline = [
        {"month": k, **v}
        for k, v in sorted(severity_trends.items())
    ]
    
    # Component-Severity Heatmap
    component_severity_map = {}
    for d in defects:
        component = d.get('component', 'Unknown')
        severity = d.get('severity', '').lower().replace('med', 'medium')
        
        if component not in component_severity_map:
            component_severity_map[component] = {'critical': 0, 'high': 0, 'medium': 0, 'low': 0}
        
        if severity in ['critical', 'high', 'medium', 'low']:
            component_severity_map[component][severity] += 1
    
    heatmap_data = [
        {"component": k, **v}
        for k, v in sorted(component_severity_map.items(), key=lambda x: sum(x[1].values()), reverse=True)[:10]
    ]
    
    # Release calendar
    release_data = {}
    for d in defects:
        release = d.get('release', 'Unknown')
        if release and release not in ['', 'TBD', 'unknown', None]:
            if release not in release_data:
                release_data[release] = {'total': 0, 'open': 0, 'closed': 0}
            release_data[release]['total'] += 1
            if d.get('status', '').lower() in ['open', 'in progress', 'in-progress']:
                release_data[release]['open'] += 1
            else:
                release_data[release]['closed'] += 1
    
    release_calendar = [
        {"release": k, **v}
        for k, v in sorted(release_data.items())
    ]
    
    return {
        "kpis": {
            "total_defects": total_defects,
            "open_defects": open_defects,
            "critical_defects": critical_defects,
            "recurrence_rate": round(recurrence_rate, 2),
            "avg_resolution_time": round(avg_resolution_time, 1),
            "missing_required_fields_pct": round(missing_required_fields_pct, 2)
        },
        "recurrence_analysis": recurrence_data,
        "severity_trends": severity_timeline,
        "component_severity_heatmap": heatmap_data,
        "release_calendar": release_calendar,
        "data_quality": {
            "missing_component": missing_component,
            "missing_owner": missing_owner,
            "missing_description": missing_description,
            "total_records": total_defects
        }
    }


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Defect Analytics API"}

# Additional health check in api_router (provides /api/health via router)
@api_router.get("/healthcheck")
async def health_check_router():
    """Alternative health check endpoint via router"""
    return {"status": "ok"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()