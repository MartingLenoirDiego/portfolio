from fastapi import FastAPI, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
import shutil
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends, HTTPException, status, Security
from fastapi.security.api_key import APIKeyHeader
from app.db.session import get_db, engine
from app.db.base import Base
from app.models.project import Project
from fastapi.staticfiles import StaticFiles
from app.core.config import API_KEY, ORIGINS, API_KEY_NAME


app = FastAPI(title="Portfolio API")

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,     
    allow_credentials=True,
    allow_methods=["*"],        
    allow_headers=["*"],        
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")
api_key_header = APIKeyHeader(name="X-API-KEY")

def get_api_key(api_key: str = Security(api_key_header)):
    if api_key != API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API key",
        )
    return api_key

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/projects")
def get_projects(db: Session = Depends(get_db)):
    projects = db.query(Project).all()
    return {
        "projects": [
            {
                "id": p.id,
                "title": p.title,
                "description": p.description,
                "link": p.link,
                "image_url": p.image_url
            }
            for p in projects
        ]
    }

@app.put("/projects/{project_id}")
def create_or_update_project(
    project_id: int,
    title: str = Form(...),
    description: str = Form(...),
    link: str = Form(...),
    file: UploadFile = File(None),
    db: Session = Depends(get_db),
    api_key: str = Depends(get_api_key)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    
    if project:
        project.title = title
        project.description = description
        project.link = link
    else:
        project = Project(id=project_id, title=title, description=description, link=link)
        db.add(project)
    
    if file:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)
        project.image_url = file_path
    
    db.commit()
    db.refresh(project)

    return {"status": "success", "project": {
        "id": project.id,
        "title": project.title,
        "description": project.description,
        "link": project.link,
        "image_url": project.image_url
    }}

@app.delete("/projects/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db),api_key: str = Depends(get_api_key)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        return {"status": "error", "message": "Project not found"}
    
    db.delete(project)
    db.commit()
    return {"status": "success", "message": "Project deleted"}
