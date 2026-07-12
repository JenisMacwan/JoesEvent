// ============================================
// CATEGORY FILTER
// ============================================

const filterButtons = document.querySelectorAll(".category-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Active Button
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryItems.forEach(item => {

            if (filter === "all") {

                item.style.display = "block";

                setTimeout(() => {
                    item.style.opacity = "1";
                    item.style.transform = "scale(1)";
                }, 100);

            } else {

                if (item.classList.contains(filter)) {

                    item.style.display = "block";

                    setTimeout(() => {
                        item.style.opacity = "1";
                        item.style.transform = "scale(1)";
                    }, 100);

                } else {

                    item.style.opacity = "0";
                    item.style.transform = "scale(.8)";

                    setTimeout(() => {
                        item.style.display = "none";
                    }, 300);

                }

            }

        });

    });

});


// ============================================
// IMAGE LIGHTBOX
// ============================================

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const closeBtn = document.querySelector(".close");

galleryItems.forEach(item => {

    const img = item.querySelector("img");

    img.addEventListener("click", () => {

        lightbox.classList.add("active");

        lightboxImage.src = img.src;

    });

});

closeBtn.addEventListener("click", () => {

    lightbox.classList.remove("active");

});

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        lightbox.classList.remove("active");

    }

});


// ============================================
// SCROLL REVEAL
// ============================================

const revealElements = document.querySelectorAll(
    ".gallery-item, .video-card, .section-title, .event-cta"
);

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {

        threshold: .15

    }

);

revealElements.forEach(el => {

    observer.observe(el);

});


// ============================================
// IMAGE HOVER EFFECT
// ============================================

galleryItems.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;

        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / 20);

        const rotateY = ((centerX - x) / 20);

        card.style.transform =

            `perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
scale(1.03)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


// ============================================
// VIDEO HOVER PLAY
// ============================================

const videos = document.querySelectorAll("video");

videos.forEach(video => {

    video.addEventListener("mouseenter", () => {

        video.play();

    });

    video.addEventListener("mouseleave", () => {

        video.pause();

        video.currentTime = 0;

    });

});


// ============================================
// HERO PARALLAX
// ============================================

const hero = document.querySelector(".events-hero");

window.addEventListener("mousemove", (e) => {

    const x = (window.innerWidth / 2 - e.pageX) / 60;

    const y = (window.innerHeight / 2 - e.pageY) / 60;

    hero.style.backgroundPosition =

        `${50 + x}% ${50 + y}%`;

});


// ============================================
// SMOOTH APPEAR ANIMATION
// ============================================

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});