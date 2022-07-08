//MENU TOOGLER
const hamburger = document.querySelector(".hamburger");
const close = document.querySelector(".close");
const navMenu = document.querySelector(".navigation-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("show");
  hamburger.classList.toggle("hide");
});

close.addEventListener("click", () => {
  navMenu.classList.toggle("show");
  hamburger.classList.toggle("hide");
});