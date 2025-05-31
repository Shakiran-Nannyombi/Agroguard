from flask import Blueprint, request, jsonify
from .models import db, Farmer
from .logic import get_advice

routes = Blueprint('routes', __name__)

@routes.route('/register', methods=['POST'])
def register():
    data = request.json
    farmer = Farmer(
        name=data['name'],
        district=data['district'],
        sub_county=data['sub_county'],
        crop=data['crop'],
        language=data['language']
    )
    db.session.add(farmer)
    db.session.commit()
    return jsonify({"message": "Registered successfully!"})

@routes.route('/advice', methods=['GET'])
def advice():
    district = request.args.get('district')
    crop = request.args.get('crop')
    return jsonify(get_advice(district, crop))
