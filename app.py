from flask import Flask, request, jsonify, render_template, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from logic import get_advice, get_system_status
from flask_cors import CORS
from datetime import datetime, timedelta
from models import Farmer, Alert, CropHealth, User, db

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'your-secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///farmers.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Home route - renders registration form
@app.route('/')
def home():
    return render_template('register.html')

# Register route - handles form data
@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        farmer = Farmer(
            name=data['name'],
            district=data['district'],
            sub_county=data['sub_county'],
            crop=data['crop'],
            language=data['language'],
            phone=data.get('phone')  # Optional field
        )
        db.session.add(farmer)
        db.session.commit()
        return jsonify({'message': 'Farmer registered successfully', 'id': farmer.id})
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

# Dashboard Stats API
@app.route('/api/dashboard/stats')
def dashboard_stats():
    try:
        total_farmers = Farmer.query.filter_by(status='active').count()
        active_alerts = Alert.query.filter_by(status='pending').count()
        
        # Get crop health stats
        healthy_crops = CropHealth.query.filter_by(health_status='healthy').count()
        risk_crops = CropHealth.query.filter_by(health_status='at_risk').count()
        
        # Get space weather status (mock for now)
        space_weather_status = "Minor Storm"  # This would come from a real API
        
        # Calculate next planting window (mock for now)
        next_planting_window = "June 5-15"  # This would be calculated based on weather data
        
        return jsonify({
            'totalFarmers': total_farmers,
            'activeAlerts': active_alerts,
            'healthyCrops': healthy_crops,
            'riskCrops': risk_crops,
            'spaceWeatherStatus': space_weather_status,
            'nextPlantingWindow': next_planting_window
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Recent Alerts API
@app.route('/api/alerts/recent')
def recent_alerts():
    try:
        # Get alerts from the last 24 hours
        recent_alerts = Alert.query.filter(
            Alert.created_at >= datetime.utcnow() - timedelta(days=1)
        ).order_by(Alert.created_at.desc()).limit(5).all()
        
        return jsonify([{
            'id': str(alert.id),
            'type': alert.type,
            'message': alert.message,
            'timestamp': alert.created_at.isoformat(),
            'affectedFarmers': len(alert.affected_districts.split(','))
        } for alert in recent_alerts])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# System Status API
@app.route('/api/system/status')
def system_status():
    try:
        status = get_system_status()
        return jsonify(status)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Login route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        user = User.query.filter_by(username=data.get('username')).first()
        
        if user and check_password_hash(user.password_hash, data.get('password')):
            login_user(user)
            user.last_login = datetime.utcnow()
            db.session.commit()
            return jsonify({'message': 'Logged in successfully'})
        
        return jsonify({'error': 'Invalid username or password'}), 401
    
    return render_template('login.html')

# Logout route
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'})

# Create admin user route
@app.route('/create-admin', methods=['POST'])
def create_admin():
    try:
        data = request.get_json()
        
        # Check if admin already exists
        if User.query.filter_by(username='admin').first():
            return jsonify({'error': 'Admin user already exists'}), 400
        
        # Create admin user
        admin = User(
            username='admin',
            email='admin@agroguard.com',
            password_hash=generate_password_hash(data.get('password')),
            is_admin=True
        )
        
        db.session.add(admin)
        db.session.commit()
        
        return jsonify({'message': 'Admin user created successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Initialize the database
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)