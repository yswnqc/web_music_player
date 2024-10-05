const music = document.getElementById('music');
const playBtn = document.querySelector('.play-btn');
const currTime = document.querySelector('.current-time');
const ttlTime = document.querySelector('.total-time');
const progressBar = document.querySelector('.progress-bar');
const musicImg = document.querySelector('img');
const progressArea = document.querySelector('.progress-area');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const musicName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');

let musicIndex = 1;

window.addEventListener('load', () => {
  loadMusic();
});

let loadMusic = () => {
  musicName.innerHTML = `${allmusic[musicIndex - 1].name}`;
  artistName.innerHTML = `${allmusic[musicIndex - 1].artist}`;
  music.src = `Mini Music Player/${allmusic[musicIndex - 1].src}.mp3`;
  musicImg.src = `Mini Music Player/${allmusic[musicIndex - 1].img}.jpg`;
  music.load();
};

playBtn.addEventListener('click', () => {
  if (playBtn.classList.contains('stop')) {
    music.pause();
    playBtn.classList.remove('stop');
    playBtn.firstElementChild.innerHTML = 'play_arrow';
    musicImg.style.animationPlayState = 'paused';
  } else {
    music.play();
    playBtn.classList.add('stop');
    playBtn.firstElementChild.innerHTML = 'pause';
    musicImg.style.animationPlayState = 'running'
  }
});

music.addEventListener('loadeddata', () => {
  console.log('loaded')
  let audioDuration = music.duration;
  let totalMin = Math.floor(audioDuration / 60);
  let totalSec = Math.floor(audioDuration % 60);
  if (totalSec < 10) {
    totalSec = `0${totalSec}`;
  }
  ttlTime.innerHTML = `${totalMin}:${totalSec}`;
})

music.addEventListener('timeupdate', (e) => {
  let currentTime = e.target.currentTime;
  let audioDuration = e.target.duration;
  let currMin = Math.floor(currentTime / 60);
  let currSec = Math.floor(currentTime % 60);
  if (currSec < 10) {
    currSec = `0${currSec}`;
  }
  currTime.innerHTML = `${currMin}:${currSec}`;
  let progressWidth = (currentTime / audioDuration) * 100;
  progressBar.style.width = `${progressWidth}%`;
});

progressArea.addEventListener('click', (e) => {
  let progressWidth = progressArea.clientWidth;  // timeline width
  let clickedOffsetX = e.offsetX;                // Coordinate of the width
  let songDuration = music.duration;             // Music total time
  music.currentTime =
      (clickedOffsetX / progressWidth) * songDuration;  // Updating Current Time
})

nextBtn.addEventListener('click', () => {
  musicIndex++;
  if (musicIndex > allmusic.length) {
    musicIndex = 1;
  }
  console.log(musicIndex);
  loadMusic();
  if (playBtn.classList.contains('stop')) {
    playBtn.classList.remove('stop');
  }
  playBtn.click();
});

prevBtn.addEventListener('click', () => {
  musicIndex--;
  if (musicIndex < 1) {
    musicIndex = allmusic.length;
  }
  console.log(musicIndex);
  loadMusic();
  if (playBtn.classList.contains('stop')) {
    playBtn.classList.remove('stop');
  }
  playBtn.click();
});

music.addEventListener('ended', () => {
  nextBtn.click();
});