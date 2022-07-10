/**
 * @jest-environment jsdom
 */
const { openMenuToogle, closeMenuToogle, navMenu, hamburger, close, show, hide } = require('./js/index');

test('test if all the html elements exist', () => {
  expect(navMenu).not.toBeNull()
  expect(hamburger).not.toBeNull()
  expect(close).not.toBeNull()
  expect(show).not.toBeNull();
  expect(hide).not.toBeNull();
})

test('test if it is possible to open the menu toogle', () => {
  // expect(navMenu.style.right).toBe(0)
  // expect(navMenu.style.width).toBe("16rem")
})

test('test if it is possible to close the menu toogle', () => {
  // expect(navMenu.style.right).toBe("-16rem")
  // expect(navMenu.style.width).toBe(0)
})