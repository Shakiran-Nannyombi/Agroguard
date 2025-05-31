import os
import sys
from waitress import serve
from app import app
from config import config

def main():
    # Load production configuration
    app.config.from_object(config['production'])
    
    # Get port from environment variable or use default
    port = int(os.environ.get('PORT', 8080))
    
    # Get host from environment variable or use default
    host = os.environ.get('HOST', '0.0.0.0')
    
    print(f"Starting production server on {host}:{port}")
    serve(app, host=host, port=port)

if __name__ == '__main__':
    main() 