// app.js

const API_URL = "https://YOUR-NGROK-URL.ngrok.io";

/*"""
This script connects the frontend to the backend.

It fetches the shared color and updates the UI.
"""*/

async function updateColor() {
    const res = await fetch(`${API_URL}/color`);
    const data = await res.json();

    document.querySelector(".container").style.backgroundColor = data.color;
}

async function toggleColor() {
    await fetch(`${API_URL}/toggle`, { method: "POST" });
    updateColor();
}

updateColor();
