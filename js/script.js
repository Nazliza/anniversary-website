
const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

if (music && musicButton) {

    musicButton.addEventListener("click", async () => {

        if (music.paused) {
            try {
                await music.play();
                musicButton.textContent = "♫ Music ON";
            } catch (error) {
                musicButton.textContent = "Music unavailable";
            }
        } else {
            music.pause();
            musicButton.textContent = "♫ Music";
        }

    });

}

/* =========================
   GALLERY ANIMATION
========================= */

document.addEventListener("DOMContentLoaded", function () {

    // Foto muncul perlahan ketika halaman dibuka
    const photoCards = document.querySelectorAll(".photo-card");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        photoCards.forEach((card) => observer.observe(card));
    } else {
        photoCards.forEach((card) => card.classList.add("show"));
    }

    // Sembunyikan gambar jika file fotonya belum tersedia
    document.querySelectorAll(".gallery-photo").forEach((photo) => {
        photo.addEventListener("error", function () {
            this.style.display = "none";
        });
    });

    // Lightbox: klik foto untuk memperbesar
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeButton = document.getElementById("lightboxClose");

    document.querySelectorAll(".gallery-photo").forEach((photo) => {
        photo.addEventListener("click", function () {
            if (!this.complete || this.naturalWidth === 0) return;

            lightboxImage.src = this.src;
            lightbox.classList.add("active");
        });
    });

    // Tutup lightbox
    function closeLightbox() {
        lightbox.classList.remove("active");
        lightboxImage.src = "";
    }

    if (closeButton && lightbox) {
        closeButton.addEventListener("click", closeLightbox);

        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeLightbox();
            }
        });
    }

});
