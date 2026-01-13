"use strict";

const opinionForm = document.getElementById("opinionForm");
const comentariosDiv = document.getElementById("Comentarios");

// Configuración de JSONBin (reemplaza con tus valores)
const JSONBIN_ID = '69417309ae596e708f9e347e'; // Ej: '1234567890abcdef'
const JSONBIN_API_KEY = '$2a$10$bP1980cy4E4tN4xjgmgj6OJJHTdiKQxg0e7Dc9OuxDlOnaJzRU9SW'; // Tu clave de API de JSONBin
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_ID}`;

// Load comments on page load
// window.addEventListener("DOMContentLoaded", cargarComentarios);

// opinionForm.addEventListener("submit", enviarOpinion);

async function cargarComentarios() {
    try {
        const response = await fetch(JSONBIN_URL, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        if (response.ok) {
            const data = await response.json();
            const comments = data.record || [];
            comments.forEach(comment => {
                const comentarioElement = document.createElement("div");
                comentarioElement.innerHTML = `
                    <h3>${comment.username}</h3>
                    <p>${comment.comment}</p>
                `;
                comentariosDiv.appendChild(comentarioElement);
            });
        } else {
            console.error('Error loading comments');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function enviarOpinion(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const comment = document.getElementById("comment").value;

    const comentarioElement = document.createElement("div");
    comentarioElement.innerHTML = `
        <h3>${username}</h3>
        <p>${comment}</p>
    `;

    comentariosDiv.appendChild(comentarioElement);

    // Save to JSONBin
    try {
        // First, get current comments
        const getResponse = await fetch(JSONBIN_URL, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        let comments = [];
        if (getResponse.ok) {
            const data = await getResponse.json();
            comments = data.record || [];
        }
        comments.push({ username, comment });

        // Then, update
        const putResponse = await fetch(JSONBIN_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_API_KEY
            },
            body: JSON.stringify(comments)
        });

        if (!putResponse.ok) {
            console.error('Error saving comment');
        }
    } catch (error) {
        console.error('Error:', error);
    }

    opinionForm.reset();
}