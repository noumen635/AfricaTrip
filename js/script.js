//MENU TOOGLER
const hamburger = document.querySelector(".hamburger");
const close = document.querySelector(".close");
const navMenu = document.querySelector(".navigation-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("show");
  hamburger.classList.toggle("hide");
  navMenu.style.right = "0";
  navMenu.style.width = "16rem";
});

close.addEventListener("click", () => {
  navMenu.classList.toggle("show");
  hamburger.classList.toggle("hide");
  navMenu.style.right = "-16rem";
  navMenu.style.width = "0";
});