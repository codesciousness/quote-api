const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
};

const getIndexElement = (arr, id) => {
 return arr.findIndex(el => el.id === id);
};

module.exports = {
  getRandomElement,
  getIndexElement
};
