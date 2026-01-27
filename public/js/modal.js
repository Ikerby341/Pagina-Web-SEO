const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modal-title");
const modalLink = document.getElementById("modalLink");
const closeBtn = document.querySelector(".modal-close");

// Busca .imatge (accesorios) y .imagen-container (recomendaciones)
const images = document.querySelectorAll(".imatge, .imagen-container");

images.forEach((imageContainer) => {
  imageContainer.style.cursor = "pointer";

  imageContainer.addEventListener("click", function () {
    const img = this.querySelector("img");
    
    // Busca el título dependiendo de la estructura
    let title;
    const accesorioCard = this.closest(".accesorio-card");
    
    if (accesorioCard) {
      title = accesorioCard.querySelector(".producte").textContent;
    } else {
      const parentDiv = this.parentElement;
      const h3 = parentDiv.querySelector("h3");
      title = h3 ? h3.textContent : "Bicicleta";
    }
    
    const url = this.getAttribute("data-url");

    modalImage.src = img.src;
    modalImage.alt = img.alt;
    modalTitle.textContent = title;
    modalLink.href = url;

    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeModal();
  }
});

function closeModal() {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "auto";
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modal.style.display === "flex") {
    closeModal();
  }
});