// app.js

const API_URL = "http://127.0.0.1:5000";

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
