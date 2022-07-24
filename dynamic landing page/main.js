const time = document.querySelector('#time'),
  greeting = document.querySelector('#greeting'),
  name = document.querySelector('#name'),
  focus = document.querySelector('#focus');

const showAmPm = true;

function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    seconds = today.getSeconds();

  const amPm = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12 || 12;

  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    seconds
  )} ${showAmPm ? amPm : ''}`;

  setTimeout(showTime, 1000);
}

function changeBg() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    document.body.style.backgroundImage =
      'url(https://i.ibb.co/7vDLJFb/morning.jpg)';
    greeting.textContent = 'Good morning';
  } else if (hour < 18) {
    document.body.style.backgroundImage =
      'url(https://i.ibb.co/3mThcXc/afternoon.jpg)';
    greeting.textContent = 'Good afternoon';
  } else {
    document.body.style.backgroundImage =
      'url(https://i.ibb.co/924T2Wv/night.jpg)';
    greeting.textContent = 'Good evening';
    document.body.style.color = 'white';
  }
}

function getName() {
  if (localStorage.getItem('name')) {
    name.textContent = localStorage.getItem('name');
  } else {
    name.textContent = '[Enter name]';
  }
}

function getFocus() {
  if (localStorage.getItem('focus')) {
    focus.textContent = localStorage.getItem('focus');
  } else {
    focus.textContent = '[Enter focus]';
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

function setName(e) {
  if (e.type == 'keypress') {
    if (e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

function setFocus(e) {
  if (e.type == 'keypress') {
    if (e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

changeBg();

function addZero(n) {
  return (parseInt(n) < 10 ? '0' : '') + n;
}

showTime();
getName();
getFocus();
