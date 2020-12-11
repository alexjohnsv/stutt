// based on https://stackoverflow.com/questions/742013/how-do-i-create-a-url-shortener,  https://gist.github.com/esamattis/1158171
const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
const base = chars.length;

const encode = (id) => {
  let s = '';

  while (id > 0) {
    s += chars[id % base]
    id = parseInt(id / base, 10);
  }

  return s.split('').reverse().join('');
};

const decode = (s) => {
  let i = 0;
  for (c of s) {
    i = i * base + chars.indexOf(c);
  }

  return i;
}

module.exports = {
  encode,
  decode
};
