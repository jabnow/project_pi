# backend/app.py

import os
from flask import Flask
from dotenv import load_dotenv
from pymongo import MongoClient
import gridfs

load_dotenv()

app = Flask(__name__)

#  Connect to MongoDB Atlas once
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client.client["sample_resume"]      # or get_default_database()
fs = gridfs.GridFS(db)                   # GridFS instance for file storage

# Store references in app.config to acess in route modules
app.config["DB_CLIENT"] = client
app.config["DB"] = db
app.config["FS"] = fs

# Import & register your blueprint
from routes.resume import upload_bp
app.register_blueprint(upload_bp)  

if __name__ == '__main__':
    port = os.getenv("FLASK_RUN_PORT", 5000)
    app.run(host='0.0.0.0', port=port, debug=True)
