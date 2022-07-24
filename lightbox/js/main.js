const images = Array.from(document.querySelectorAll('.gallery img'));
const modal = document.querySelector('.modal');
const content = modal.firstElementChild;
const closeBtn = modal.querySelector('.modal .close');
const nextBtn = modal.querySelector('.modal .right');
const prevBtn = modal.querySelector('.modal .left');
let currIndex = 0;
const size = images.length;

images.forEach((img) => {
  img.addEventListener('click', (e) => {
    e.preventDefault();

    const source = e.target.getAttribute('src');

    modal.style.display = 'block';
    setTimeout(() => (modal.style.opacity = 1), 250);

    content.innerHTML = `<img src='${source}' />`;

    currIndex = images.indexOf(e.target);
  });
});

nextBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (currIndex < size - 1) {
    currIndex++;
  } else {
    currIndex = 0;
  }
  content.innerHTML = `<img src='${images[currIndex].getAttribute('src')}' />`;
});

prevBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (currIndex !== 0) {
    currIndex--;
  } else {
    currIndex = size - 1;
  }
  content.innerHTML = `<img src='${images[currIndex].getAttribute('src')}' />`;
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.opacity = 0;
    modal.style.display = 'none';
  }
});

closeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  modal.style.opacity = 0;
  modal.style.display = 'none';
});
