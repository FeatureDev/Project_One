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

async function saveOpenAiKey() {
    const input = document.querySelector("#openai-api-key");
    const message = document.querySelector("#api-key-message");
    const apiKey = input.value.trim();

    if (!apiKey) {
        message.textContent = "Please enter an API key.";
        return;
    }

    const res = await fetch(`${API_URL}/openai-key`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify({ api_key: apiKey })
    });

    const data = await res.json();
    message.textContent = data.message || "Unable to save API key.";
}

// Initial load
updateColor();
