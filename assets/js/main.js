// Menú hamburguesa
const btn = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

if (btn && nav) {
    btn.addEventListener("click", () => {
        nav.classList.toggle("nav-cerrado");
        nav.classList.toggle("nav-abierto");
    });
}