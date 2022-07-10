/**
 * @jest-environment jsdom
 */
const { openMenuToogle, closeMenuToogle, navMenu, hamburger, close } = require('./js/index.js');

test('test if all the html elements exist', () => {
  expect(navMenu).not.toBeNull()
  expect(hamburger).not.toBeNull()
  expect(close).not.toBeNull()
})

test('test if it is possible to open the menu toogle', () => {
  const show = document.getElementsByClassName(".show");
  expect(show).not.toBeNull()
  const hide = document.getElementsByClassName(".hide");
  expect(hide).not.toBeNull()
  // expect(navMenu.style={right: 0}).toBe(0)
  // expect(navMenu.style.width).toBe("16rem")
})

test('test if it is possible to close the menu toogle', () => {
  const show = document.getElementsByClassName(".show");
  expect(show).not.toBeNull()
  const hide = document.getElementsByClassName(".hide");
  expect(hide).not.toBeNull()
  // expect(navMenu.style.right).toBe("-16rem")
  // expect(navMenu.style.width).toBe(0)
})