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