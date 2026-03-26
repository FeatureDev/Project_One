# server.py

import os

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

"""
This server keeps a shared color state.

All clients read and modify the same state,
allowing real-time shared interaction.
"""

color_state = {
    "color": "gold"
}

@app.route("/color", methods=["GET"])
def get_color():
    """Return the current color.

    This endpoint allows clients to read
    the shared color state.
    """
    return jsonify(color_state)


@app.route("/toggle", methods=["POST"])
def toggle_color():
    """Toggle the shared color.

    Changes the color globally so all
    connected clients see the update.
    """
    color_state["color"] = (
        "gold" if color_state["color"] == "red" else "red"
    )
    return jsonify(color_state)


@app.route("/openai-key", methods=["POST"])
def set_openai_key():
    """Store an OpenAI API key in memory for this server session."""
    payload = request.get_json(silent=True) or {}
    api_key = payload.get("api_key", "").strip()

    if not api_key:
        return jsonify({"message": "API key is required."}), 400

    if not api_key.startswith("sk-") or len(api_key) < 20:
        return jsonify({"message": "Invalid API key format."}), 400

    os.environ["OPENAI_API_KEY"] = api_key
    return jsonify({"message": "OpenAI API key saved."}), 200


if __name__ == "__main__":
    app.run(port=5000)
