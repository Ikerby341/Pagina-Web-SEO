document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const subject = "Consulta desde la página web";
    const body = `Nombre: ${name}\nCorreo: ${email}\nMensaje:\n${message}`;

    window.location.href = `mailto:recocyc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
