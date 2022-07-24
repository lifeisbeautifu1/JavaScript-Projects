const fact = document.querySelector('#fact');
const factText = document.querySelector('#factText');

const input = document.querySelector('#numberInput');

input.addEventListener('input', (e) => {
  let number = input.value;

  fetch('http://numbersapi.com/' + number)
    .then((response) => response.text())
    .then((data) => {
      if (number != '') {
        fact.style.display = 'block';
        factText.innerText = data;
      } else {
        fact.style.display = 'none';
      }
    });
});
