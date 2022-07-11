/**
 * @jest-environment jsdom
 */
const {  addShow, addHide, addMenuToggleDimensions, removeMenuToggleDimensions } = require('./index');

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