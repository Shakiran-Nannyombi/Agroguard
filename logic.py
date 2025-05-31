from datetime import datetime
import random

def get_advice(district, crop):
    """Main advisory logic with comprehensive rules"""
    weather_data = {
        "Kabale": {"rainfall": 15, "ndvi": 0.7, "pest_risk": "high", "temperature": 18},
        "Masaka": {"rainfall": 30, "ndvi": 0.9, "pest_risk": "low", "temperature": 25},
        "Gulu": {"rainfall": 18, "ndvi": 0.6, "pest_risk": "medium", "temperature": 28},
        "Default": {"rainfall": 20, "ndvi": 0.8, "pest_risk": "low", "temperature": 22}
    }
    
    rules = {
        "maize": [
            (lambda d: d["rainfall"] < 20, "🌧 Delay planting - rainfall too low (needs 20mm+)"),
            (lambda d: d["pest_risk"] == "high", "🐛 High pest risk - use resistant varieties"),
            (lambda d: d["ndvi"] < 0.7, "🌱 Low vegetation index - add fertilizer"),
            (lambda d: d["temperature"] > 25, "🔥 High temperatures may affect growth")
        ],
        "beans": [
            (lambda d: d["rainfall"] > 25, "✅ Good for planting now"),
            (lambda d: d["ndvi"] < 0.8, "⚗ Consider soil enrichment"),
            (lambda d: d["pest_risk"] in ["high", "medium"], "⚠ Apply neem extract for pest control"),
            (lambda d: d["temperature"] < 20, "❄ Low temperatures - consider greenhouse")
        ],
        "coffee": [
            (lambda d: d["rainfall"] < 30, "💧 Irrigation recommended"),
            (lambda d: d["temperature"] > 28, "🌡 Provide shade cover")
        ]
    }
    
    current_data = weather_data.get(district, weather_data["Default"])
    advice = []
    
    for condition, message in rules.get(crop.lower(), []):
        if condition(current_data):
            advice.append(message)
    
    return advice if advice else ["✅ Normal conditions - proceed with planting"]

def get_system_status():
    """Get the current status of all system components"""
    # In a real system, these would be actual checks
    # For now, we'll simulate with some randomness
    status = {
        "satelliteFeed": random.choice(["Online", "Degraded"]),
        "weatherApi": random.choice(["Active", "Degraded"]),
        "spaceWeatherMonitor": random.choice(["Alert Mode", "Normal"]),
        "smsGateway": random.choice(["Connected", "Degraded"])
    }
    
    # Add some realistic behavior
    if status["spaceWeatherMonitor"] == "Alert Mode":
        status["satelliteFeed"] = "Online"  # Always online during alerts
    
    return status

def calculate_planting_window(district, crop):
    """Calculate the optimal planting window based on weather data"""
    # This would use historical weather data and forecasts
    # For now, return a mock window
    return "June 5-15"

def get_crop_health(district, crop):
    """Get the health status of crops in a district"""
    # This would use NDVI data and other metrics
    # For now, return mock data
    return {
        "ndvi_value": 0.75,
        "health_status": "healthy",
        "rainfall": 25,
        "temperature": 22,
        "pest_risk": "low"
    }

def generate_alert(district, crop, alert_type):
    """Generate an alert based on conditions"""
    alerts = {
        "weather": [
            "Heavy rainfall expected in the next 24 hours",
            "Drought conditions developing",
            "High winds forecast"
        ],
        "pest": [
            "Increased pest activity detected",
            "Disease outbreak reported in neighboring areas",
            "Pest control measures recommended"
        ],
        "space_weather": [
            "Solar flare activity may affect crop growth",
            "Increased radiation levels detected",
            "Space weather conditions normal"
        ]
    }
    
    return random.choice(alerts.get(alert_type, ["No alerts at this time"]))