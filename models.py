from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_login import UserMixin

db = SQLAlchemy()

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime, nullable=True)

    def __repr__(self):
        return f'<User {self.username}>'

class Farmer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    district = db.Column(db.String(100), nullable=False)
    sub_county = db.Column(db.String(100), nullable=False)
    crop = db.Column(db.String(50), nullable=False)
    language = db.Column(db.String(20), nullable=False)
    phone = db.Column(db.String(15), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_advice = db.Column(db.DateTime, nullable=True)
    status = db.Column(db.String(20), default='active')  # active, inactive, blocked

    def __repr__(self):
        return f'<Farmer {self.name}>'

class Alert(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)  # weather, pest, space_weather
    message = db.Column(db.Text, nullable=False)
    affected_districts = db.Column(db.String(200), nullable=False)  # Comma-separated list
    severity = db.Column(db.String(20), nullable=False)  # low, medium, high
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    sent_at = db.Column(db.DateTime, nullable=True)
    status = db.Column(db.String(20), default='pending')  # pending, sent, failed

    def __repr__(self):
        return f'<Alert {self.type} - {self.severity}>'

class CropHealth(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    district = db.Column(db.String(100), nullable=False)
    crop = db.Column(db.String(50), nullable=False)
    ndvi_value = db.Column(db.Float, nullable=False)
    health_status = db.Column(db.String(20), nullable=False)  # healthy, at_risk, critical
    last_updated = db.Column(db.DateTime, default=datetime.utcnow)
    rainfall = db.Column(db.Float, nullable=False)
    temperature = db.Column(db.Float, nullable=False)
    pest_risk = db.Column(db.String(20), nullable=False)  # low, medium, high

    def __repr__(self):
        return f'<CropHealth {self.district} - {self.crop}>'