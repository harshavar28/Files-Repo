import os
from flask import Blueprint, request, jsonify, send_from_directory, current_app
from models import db, Upload, User
from werkzeug.utils import secure_filename

uploads_bp = Blueprint('uploads', __name__, url_prefix='/uploads')

@uploads_bp.route('/upload', methods=['POST'])
def upload_file():
    user_id = request.form.get('user_id')
    file = request.files.get('file')

    if not user_id or not file:
        return jsonify({'error': 'Missing user_id or file'}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    filename = secure_filename(file.filename)
    filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    upload = Upload(filename=filename, user_id=user.id)
    db.session.add(upload)
    db.session.commit()

    return jsonify({'message': 'File uploaded', 'file_id': upload.id})

@uploads_bp.route('/list/<int:user_id>', methods=['GET'])
def list_files(user_id):
    uploads = Upload.query.filter_by(user_id=user_id).all()
    return jsonify([{'id': u.id, 'filename': u.filename} for u in uploads])

@uploads_bp.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename, as_attachment=True)

@uploads_bp.route('/delete/<int:file_id>', methods=['DELETE'])
def delete_file(file_id):
    upload = Upload.query.get(file_id)
    if not upload:
        return jsonify({'error': 'File not found'}), 404

    filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], upload.filename)
    if os.path.exists(filepath):
        os.remove(filepath)

    db.session.delete(upload)
    db.session.commit()

    return jsonify({'message': 'File deleted'})
