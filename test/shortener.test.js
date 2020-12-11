const { test, expect } = require('@jest/globals');
const { encode, decode } = require('../utils/shortener');

test('encode and decode', () => {
  for (let i = 0; i < 100000; i++) {
    expect(decode(encode(i))).toBe(i);
  }
});
