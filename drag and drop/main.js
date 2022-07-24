const fill = document.querySelector('.fill');
const boxes = document.querySelectorAll('.empty');

fill.addEventListener('dragstart', () => {
  fill.classList.add('hold');
  setTimeout(() => fill.classList.add('invisible'), 0);
});

fill.addEventListener('dragend', () => {
  fill.classList.remove('hold');
  fill.classList.remove('invisible');
});

boxes.forEach((box) => {
  box.addEventListener('dragover', (e) => {
    e.preventDefault();
  });
  box.addEventListener('dragenter', (e) => {
    e.preventDefault();
    box.classList.add('hovered');
  });
  box.addEventListener('dragleave', () => {
    box.className = 'empty';
  });
  box.addEventListener('drop', () => {
    box.className = 'empty';
    box.append(fill);
  });
});
