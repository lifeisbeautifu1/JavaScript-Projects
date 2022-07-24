const result = document.querySelector('#result');
const length = document.querySelector('#length');
const uppercase = document.querySelector('#uppercase');
const lowercase = document.querySelector('#lowercase');
const numbers = document.querySelector('#numbers');
const symbols = document.querySelector('#symbols');
const generate = document.querySelector('#generate');
const clipboard = document.querySelector('#clipboard');

generate.addEventListener('click', () => {
  const hasUppercase = uppercase.checked;
  const hasLowercase = lowercase.checked;
  const hasNumbers = numbers.checked;
  const hasSymbols = symbols.checked;

  result.innerHTML = generatePassword(
    hasUppercase,
    hasLowercase,
    hasNumbers,
    hasSymbols,
    length.value
  );
});

clipboard.addEventListener('click', () => {
  navigator.clipboard
    .writeText(result.innerHTML)
    .then(() => {
      console.log('copied');
    })
    .catch(() => {
      console.log('not copied');
    });
});

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  return String.fromCharCode(Math.floor(Math.random() * 15) + 33);
}

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

function generatePassword(
  hasUppercase,
  hasLowercase,
  hasNumbers,
  hasSymbols,
  length
) {
  let password = '';
  let choices = [];
  if (hasUppercase) choices.push('upper');
  if (hasLowercase) choices.push('lower');
  if (hasNumbers) choices.push('number');
  if (hasSymbols) choices.push('symbol');
  if (choices.length == 0) return '';
  for (let i = 0; i < length; ++i) {
    password +=
      randomFunc[choices[Math.floor(Math.random() * choices.length)]]();
  }
  return password;
}
