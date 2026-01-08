# server.py

from flask import Flask, jsonify
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


if __name__ == "__main__":
    app.run(port=5000)

