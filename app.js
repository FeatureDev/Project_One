// app.js
// Load products from Flask backend and render them

const API_URL = "http://127.0.0.1:5000";

const statusEl = document.getElementById("status");
const productsEl = document.getElementById("products");

async function loadProducts() {
    statusEl.textContent = "Status: loading products...";

    try {
        const response = await fetch(`${API_URL}/products`);

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const products = await response.json();

        statusEl.textContent = `Status: loaded ${products.length} products`;
        productsEl.innerHTML = "";

        products.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";

            card.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <strong>${product.price} SEK</strong>
            `;

            productsEl.appendChild(card);
        });

    } catch (error) {
        statusEl.textContent = "Status: error loading products";
        productsEl.textContent = error.toString();
    }
}

loadProducts();
