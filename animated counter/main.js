const counters = document.querySelectorAll('.counter');
const speed = 200;

counters.forEach((counter) => {
  const update = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerHTML;

    const inc = target / speed;
    if (count < target) {
      counter.innerHTML = count + inc;
      setTimeout(update, 1);
    } else {
      counter.innerHTML = target;
    }
  };
  update();
});
