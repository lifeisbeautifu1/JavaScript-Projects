const current = document.querySelector('.current');

const imgs = document.querySelectorAll('.imgs img');

const opacity = 0.7;

imgs.forEach((img) => {
  img.addEventListener('click', (e) => {
    imgs.forEach((i) => {
      i.style.opacity = 1;
    });

    current.src = e.target.src;

    current.classList.add('fade-in');

    setTimeout(() => {
      current.classList.remove('fade-in');
    }, 500);

    e.target.style.opacity = opacity;
  });
});
