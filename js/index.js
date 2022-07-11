//MENU TOOGLER
const hamburger = document.querySelector(".hamburger");
const close = document.querySelector(".close");
const navMenu = document.querySelector(".navigation-menu");

function addShow() {
  navMenu.classList.toggle("show");
  return navMenu.toggleAttribute("show");
}

function addHide() {
  hamburger.classList.toggle("hide");
  return hamburger.toggleAttribute("hide");
}

function addMenuToggleDimensions(x, y) {
  navMenu.style.right = x;
  navMenu.style.width =  y + "rem";
  return navMenu.style.right, navMenu.style.width;
}

function removeMenuToggleDimensions(a, b) {
  navMenu.style.right = "-" + a + "rem";
  navMenu.style.width =  b;
  return navMenu.style.right, navMenu.style.width;
}

function openMenuToogle() {
  addShow();
  addHide();
  addMenuToggleDimensions(0,16);
}

function closeMenuToogle() {
  addShow();
  addHide();
  removeMenuToggleDimensions(16,0);
}

module.exports = { openMenuToogle, closeMenuToogle, addShow, addHide, addMenuToggleDimensions, removeMenuToggleDimensions };