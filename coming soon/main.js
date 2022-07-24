const countTime = new Date('March 31, 2022 18:30:00').getTime();

const countDown = document.querySelector('.countdown');

const int = setInterval(() => {
  const left = (countTime - new Date().getTime()) / 1000;

  const days = Math.floor(left / 3600 / 24);

  const hours = Math.floor((left / 3600) % 24);

  const minutes = Math.floor((left / 60) % 60);

  const seconds = Math.floor(left % 60);

  const text = `
  <div>${days}<span>Days</span></div>
  <div>${hours}<span>Hours</span></div>
  <div>${minutes}<span>Minutes</span></div>
  <div>${seconds}<span>Seconds</span></div>
  `;

  countDown.innerHTML = text;
}, 1000);
