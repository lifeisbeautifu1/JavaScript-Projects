const container = document.querySelector('.container'),
  text = document.querySelector('#text');

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

breatheAnimation();

function breatheAnimation() {
  text.textContent = 'Breathe In!';
  container.classList.add('grow');
  container.classList.remove('shrink');
  setTimeout(() => {
    text.textContent = 'Hold';
    setTimeout(() => {
      text.textContent = 'Breathe out';
      container.classList.remove('grow');
      container.classList.add('shrink');
    }, holdTime);
  }, breatheTime);
}

setInterval(breatheAnimation, totalTime);
