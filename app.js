// app.js

const API_URL = "https://colourful-grant-semiliberally.ngrok-free.dev";

/*
This script connects the GitHub Pages frontend
to the Flask backend exposed via ngrok.

The ngrok-skip-browser-warning header is required
to bypass ngrok's free-tier warning page.
*/

async function updateColor() {
    const res = await fetch(`${API_URL}/color`, {
        headers: {
            "ngrok-skip-browser-warning": "true"
        }
    });

    const data = await res.json();

    document.querySelector(".container").style.backgroundColor = data.color;
}

async function toggleColor() {
    await fetch(`${API_URL}/toggle`, {
        method: "POST",
        headers: {
            "ngrok-skip-browser-warning": "true"
        }
    });

    updateColor();
}

// Initial load
updateColor();
