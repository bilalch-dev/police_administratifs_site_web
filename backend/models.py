from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone
import string
import random

db = SQLAlchemy()

def generate_tracking_id():
    """Generates a unique tracking code like POL-2026-X8B9K"""
    random_str = ''.join(random.choices(string.ascii_uppercase + string.digits, k=5))
    return f"POL-2026-{random_str}"

class Complaint(db.Model):
    __tablename__ = 'complaints'

    id = db.Column(db.String(20), primary_key=True, default=generate_tracking_id)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    details = db.Column(db.Text, nullable=False)
    
    # Status workflow: RECEIVED (1), INSPECTION (2), ENFORCEMENT (3), RESOLVED (4)
    status = db.Column(db.String(50), default="تم الاستلام وتسجيل البلاغ")
    status_step = db.Column(db.Integer, default=1)
    notes = db.Column(db.Text, default="تم تسجيل الشكاية بنجاح وإحالتها على المصالح الجماعية المختصة.")
    
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "phone": self.phone,
            "category": self.category,
            "title": self.title,
            "location": self.location,
            "details": self.details,
            "status": self.status,
            "statusStep": self.status_step,
            "notes": self.notes,
            "date": self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(50), default="OFFICER")

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "role": self.role
        }
