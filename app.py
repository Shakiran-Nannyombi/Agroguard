from flask import Flask, request, jsonify, render_template, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from logic import get_advice
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'your-secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///farmers.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Import models (could also keep them here)
from models import Farmer

# Home route - renders registration form
@app.route('/')
def home():
    return render_template('register.html')

# Register route - handles form data
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        farmer = Farmer(
            name=data['name'],
            district=data['district'],
            sub_county=data['sub_county'],
            crop=data['crop'],
            language=data['language']
        )
        db.session.add(farmer)
        db.session.commit()
        return jsonify({'message': 'Farmer registered successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Advice display route
@app.route('/get-advice')
def get_advice_route():
    district = request.args.get('district')
    crop = request.args.get('crop')
    if not district or not crop:
        return redirect(url_for('home'))
    
    advice = get_advice(district, crop)
    return render_template('advice.html',
                         district=district,
                         crop=crop,
                         advice=advice)

# API endpoint for advice
@app.route('/api/advice')
def advice_api():
    district = request.args.get('district')
    crop = request.args.get('crop')
    if not district or not crop:
        return jsonify({'error': 'Missing parameters'}), 400
    
    return jsonify({
        'district': district,
        'crop': crop,
        'advice': get_advice(district, crop)
    })

# Admin view of all farmers
@app.route('/farmers')
def farmers():
    all_farmers = Farmer.query.all()
    return render_template('farmers.html', farmers=all_farmers)

# Initialize the database
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)