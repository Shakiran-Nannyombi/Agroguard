from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Farmer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    district = db.Column(db.String(100), nullable=False)
    sub_county = db.Column(db.String(100), nullable=False)
    crop = db.Column(db.String(50), nullable=False)
    language = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f'<Farmer {self.name}>'