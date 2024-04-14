export function getRandomAlphabet() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex];
}

export function getRandomIndex() {
    return  parseInt(Math.random() * 39)
}
