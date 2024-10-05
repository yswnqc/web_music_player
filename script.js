const music = document.getElementById('music');
const playBtn = document.querySelector('.play-btn');
const currTime = document.querySelector('.current-time');
const ttlTime = document.querySelector('.total-time');
const progressBar = document.querySelector('.progress-bar');
const musicImg = document.querySelector('img');
const progressArea = document.querySelector('.progress-area');

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

progressArea.addEventListener("click", (e)=>{
    let progressWidth = progressArea.clientWidth; //timeline width
    let clickedOffsetX = e.offsetX; //Coordinate of the width
    let songDuration = music.duration; //Music total time
    music.currentTime = (clickedOffsetX / progressWidth) * songDuration; //Updating Current Time
})