/**
 * @jest-environment jsdom
 */
const {  hamburger, navMenu, addShow, addHide, addMenuToggleDimensions, removeMenuToggleDimensions } = require('../js/index');

test('test if each element exists', () => {
  expect(hamburger).toBeInTheDocument();
  expect(navMenu).toBeInTheDocument();
})

test('test if it is possible to add show class', () => {
  const show = addShow();
  expect(show).toBeTruthy();
})

test('test if it is possible to add hide class', () => {
  const hide = addHide();
  expect(hide).toBeTruthy();
})

test('test if it is possible to add dimensions to the navMenu element', () => {
  const { x, y } = addMenuToggleDimensions(4,10);
  expect(x).toBe(4);
  expect(y).toBe("10rem");
})

test('test if it is possible to remove dimensions to the navMenu element', () => {
  const { a, b } = removeMenuToggleDimensions(5,8);
  expect(a).toBe("-5rem");
  expect(b).toBe(8);
})

test('test if it is possible to open the menu toggle', () => {
  if(addShow() && addHide()) {
    const { u, v } = addMenuToggleDimensions(2, 3);
    expect(u).toBe(2);
    expect(v).toBe("3rem")
  } 
})

test('test if it is possible to close the menu toggle', () => {
  if(addShow() && addHide()) {
    const { c, d } = removeMenuToggleDimensions(2, 3);
    expect(c).toBe("-2rem");
    expect(d).toBe(3)
  } 
})