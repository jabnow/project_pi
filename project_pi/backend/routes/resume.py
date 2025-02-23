# backend/routes/upload_res.py

from flask import Blueprint, request, jsonify, current_app
from bson import ObjectId

upload_bp = Blueprint('upload_bp', __name__)

@upload_bp.route('/upload', methods=['POST'])
def upload_resume():
    """
    POST /upload
    Expects form-data with key 'resume'
    Stores the file in GridFS, returns file_id
    """
    if 'resume' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['resume']
    if file.filename == '':
        return jsonify({"error": "Empty filename"}), 400

    try:
        # Access the GridFS instance from app.config
        fs = current_app.config["FS"]

        # Put the file into GridFS
        file_id = fs.put(file, filename=file.filename, contentType=file.content_type)
        return jsonify({
            "message": "Resume uploaded successfully",
            "file_id": str(file_id)
        }), 200

    except Exception as e:
        print("Upload error:", e)
        return jsonify({"error": "Failed to upload resume"}), 500

@upload_bp.route('/file/<file_id>', methods=['GET'])
def get_resume(file_id):
    """
    GET /file/<file_id>
    Streams the file back to the client if found
    """
    try:
        fs = current_app.config["FS"]

        # Convert the file_id string to an ObjectId
        _id = ObjectId(file_id)
        grid_out = fs.get(_id)  # grid_out is a GridOut cursor

        # Return file content as a response
        return (
            grid_out.read(),
            200,
            {
                "Content-Type": grid_out.content_type,
                "Content-Disposition": f'attachment; filename="{grid_out.filename}"'
            }
        )
    except Exception as e:
        print("File retrieval error:", e)
        return jsonify({"error": "File not found"}), 404
