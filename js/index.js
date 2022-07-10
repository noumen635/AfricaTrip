//MENU TOOGLER
const hamburger = document.querySelector(".hamburger");
const close = document.querySelector(".close");
const navMenu = document.querySelector(".navigation-menu");

function openMenuToogle () {
  navMenu.classList.toggle("show");
  hamburger.classList.toggle("hide");
  navMenu.style.right = "0";
  navMenu.style.width = "16rem";
}

function closeMenuToogle () {
  navMenu.classList.toggle("show");
  hamburger.classList.toggle("hide");
  navMenu.style.right = "-16rem";
  navMenu.style.width = "0";
}

// hamburger.addEventListener("click", openMenuToogle);
// close.addEventListener("click", closeMenuToogle);

module.exports = openMenuToogle, closeMenuToogle, navMenu, hamburger, close