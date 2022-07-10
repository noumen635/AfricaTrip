//MENU TOOGLER
const hamburger = document.querySelector(".hamburger");
const close = document.querySelector(".close");
const navMenu = document.querySelector(".navigation-menu");
const show = document.querySelector(".show");
const hide = document.querySelector(".hide");

function openMenuToogle() {
  navMenu.classList.toggle("show");
  hamburger.classList.toggle("hide");
  navMenu.style.right = "0";
  navMenu.style.width = "16rem";
}

function closeMenuToogle() {
  navMenu.classList.toggle("show");
  hamburger.classList.toggle("hide");
  navMenu.style.right = "-16rem";
  navMenu.style.width = "0";
}

module.exports = { openMenuToogle, closeMenuToogle, navMenu, hamburger, close, show, hide };