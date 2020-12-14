const { test, expect } = require('@jest/globals');
const { encode, decode } = require('../utils/shortener');

test('encode', () => {
  expect(encode(1)).toBe('b');
  expect(encode(10)).toBe('k');
  expect(encode(100)).toBe('c2');
  expect(encode(500)).toBe('n6');
  expect(encode(1111)).toBe('45');
  expect(encode(12345)).toBe('js7');
  expect(encode(777000)).toBe('qxtm');
});

test('decode', () => {
  expect(decode('b')).toBe(1);
  expect(decode('k')).toBe(10);
  expect(decode('c2')).toBe(100);
  expect(decode('n6')).toBe(500);
  expect(decode('45')).toBe(1111);
  expect(decode('js7')).toBe(12345);
  expect(decode('qxtm')).toBe(777000);
});

test('encode and decode', () => {
  for (let i = 0; i < 100000; i++) {
    expect(decode(encode(i))).toBe(i);
  }
});
