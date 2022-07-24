const draggable_list = document.querySelector('#draggable-list'),
  check = document.querySelector('#check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];

const listItems = [];

createList();

function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, number: Math.random() }))
    .sort((a, b) => {
      return a.number - b.number;
    })
    .map((a) => {
      return a.value;
    })
    .forEach((person, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p class="person-name">${person}</p>
            <i class="fas fa-grip-lines"></i>
        </div>
        `;
      listItems.push(listItem);
      draggable_list.append(listItem);
    });

  addEventListeners();
}

function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index');
  // console.log('drag start');
}
function dragEnter() {
  // console.log('drag enter');
  this.classList.add('over');
}
function dragLeave() {
  // console.log('drag leave');
  this.classList.remove('over');
}
function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
  // console.log('drop');
}
function dragOver(e) {
  e.preventDefault();
  // console.log('drag over');
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');
  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });
  dragListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

check.addEventListener('click', () => {
  listItems.forEach((item, index) => {
    if (
      item.querySelector('.person-name').textContent === richestPeople[index]
    ) {
      item.className = '';
      item.classList.add('right');
    } else {
      item.className = '';
      item.classList.add('wrong');
    }
  });
});
