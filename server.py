# server.py
# Flask backend for product API using MongoDB Atlas

from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB connection
mongo_uri = os.getenv("MONGO_URI")
if not mongo_uri:
    raise RuntimeError("MONGO_URI is not set")

client = MongoClient(mongo_uri)
db = client["HOMEPAGE"]
products = db["products"]


@app.route("/products", methods=["GET"])
def get_products():
    """Return active products."""
    data = list(
        products.find(
            {"active": True},
            {"_id": 0}
        )
    )
    return jsonify(data)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
