const musicContainer = document.querySelector('.music-container'),
  playBtn = document.querySelector('#play'),
  prevBtn = document.querySelector('#prev'),
  nextBtn = document.querySelector('#next'),
  audio = document.querySelector('#audio'),
  progress = document.querySelector('.progress'),
  progressContainer = document.querySelector('.progress-container'),
  title = document.querySelector('#title'),
  cover = document.querySelector('#cover');

const songs = ['hey', 'summer', 'ukulele'];

let songIndex = 2;

loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpeg`;
}

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  audio.pause();
}

playBtn.addEventListener('click', (e) => {
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

prevBtn.addEventListener('click', prevSong);

function nextSong() {
  songIndex++;
  if (songIndex >= songs.length) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', (e) => {
  const { duration, currentTime } = e.srcElement;
  progress.style.width = `${(currentTime / duration) * 100}%`;
});

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);
