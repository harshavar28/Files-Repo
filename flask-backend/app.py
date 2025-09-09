from flask import Flask
from flask_cors import CORS
from config import Config
from models import db
from auth import auth_bp
from uploads import uploads_bp
import os

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)  # Enable CORS for all routes

db.init_app(app)  

# Create upload folder if not exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Register routes
app.register_blueprint(auth_bp)
app.register_blueprint(uploads_bp)

# Initialize DB
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
