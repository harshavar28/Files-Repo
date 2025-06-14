from flask import Blueprint, request, jsonify
from models import db, User

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('name') or not data.get('password'):
        return jsonify({'error': 'Missing name or password'}), 400

    if User.query.filter_by(name=data['name']).first():
        return jsonify({'error': 'User already exists'}), 409

    user = User(name=data['name'], password=data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'})

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(name=data.get('name'), password=data.get('password')).first()
    if user:
        return jsonify({'message': 'Login successful', 'user_id': user.id})
    return jsonify({'error': 'Invalid credentials'}), 401
