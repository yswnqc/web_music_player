// codewithharsh_
let musicName = document.querySelector(".container .music-details .music-name");
let artistName = document.querySelector(".container .music-details .artist-name");
let img = document.querySelector(".container .music-img-box .music-img img");
let imgBox = document.querySelector(".container .music-img-box .music-img");
let music = document.querySelector(".container #music");
let playPauseBtn = document.querySelector(".container .btns-box .btns .play-pause-btn");
let currTime = document.querySelector(".container .music-details .current-time");
let ttlTime = document.querySelector(".container .music-details .total-time");
let progressArea = document.querySelector(".container .music-details .progress-area");
let progressBar = document.querySelector(".container .music-details .progress-area .progress-bar");
let backBtn = document.querySelector(".container .btns-box .btns .fast-rewind");
let nextBtn = document.querySelector(".container .btns-box .btns .fast-forward");

let musicIndex = 1;

window.addEventListener("load", ()=>{
    loadMusic(); //Calling loadMusic function on page load
})

//loadMusic function
let loadMusic =()=>{
 musicName.innerHTML = `${allmusic[musicIndex - 1].name}`;
 artistName.innerHTML = `${allmusic[musicIndex - 1].artist}`;
 music.src = `${allmusic[musicIndex - 1].src}.mp3`;
 img.src = `${allmusic[musicIndex - 1].img}.jpg`;
}

playPauseBtn.addEventListener("click", ()=>{
    if(playPauseBtn.classList.contains("play")){ //If PlayPauseBtn contains Class Name "Play"
        playPauseBtn.classList.replace("play", "paused"); //then replace class "play" to "paused"
        playPauseBtn.querySelector(".material-icons").innerHTML = "pause";
        imgBox.classList.add("img-rotate");
        music.play();
    }else{
        playPauseBtn.classList.replace("paused", "play"); //else replace class "paused" to "play"
        playPauseBtn.querySelector(".material-icons").innerHTML = "play_arrow";
        imgBox.classList.remove("img-rotate");
        music.pause();
    }
})

music.addEventListener("timeupdate", (e)=>{
    let currentTime = e.target.currentTime; //Music Current Time
    let audioDuration = e.target.duration; //Music Total Time

    //Formatting Music Current Time in Minute and Second
    let currMin = Math.floor(currentTime / 60);
    let currSec = Math.floor(currentTime % 60);
    if(currSec < 10){
        currSec = `0${currSec}`;
    }
    currTime.innerHTML = `${currMin}:${currSec}`;

    //Formatting Music Total Time in Minute and Second
    music.addEventListener("loadeddata", ()=>{
        let audioDuration = music.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10){
            totalSec = `0${totalSec}`;
        }
        ttlTime.innerHTML = `${totalMin}:${totalSec}`;
    })

    //Increasing Progress Bar Width On Time Update
    let progressWidth = (currentTime / audioDuration) * 100; //Getting Percentage
    progressBar.style.width = `${progressWidth}%`; //Passing percentage as progress width

    //Updating ProgressBar Width According To Click On Progress Bar
    progressArea.addEventListener("click", (e)=>{
        let progressWidth = progressArea.clientWidth; //timeline width
        let clickedOffsetX = e.offsetX; //Coordinate of the width
        let songDuration = music.duration; //Music total time
        music.currentTime = (clickedOffsetX / progressWidth) * songDuration; //Updating Current Time
    })
})

//Next music btn event
nextBtn.addEventListener("click", ()=>{
    musicIndex++; //Increment of index by 1
    //If musicIndex greater than array length then music index = 1 else musicIndex = musicIndex
    musicIndex > allmusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    if(playPauseBtn.classList.contains("play")){ //If PlayPauseBtn contains Class Name "Play"
        playPauseBtn.classList.replace("play", "paused"); //then replace class "play" to "paused"
        playPauseBtn.querySelector(".material-icons").innerHTML = "pause";
        imgBox.classList.add("img-rotate");
        music.play();
    }
    setTimeout(()=>{
        music.play();
    }, 700);
    loadMusic(musicIndex);
})

//Previous music btn event
backBtn.addEventListener("click", ()=>{
    musicIndex--; //Decrement of index by 1
    //If musicIndex less than 1 the musicIndex will be equal to array length
    musicIndex < 1 ? musicIndex = allmusic.length : musicIndex = musicIndex;
    if(playPauseBtn.classList.contains("play")){ //If PlayPauseBtn contains Class Name "Play"
        playPauseBtn.classList.replace("play", "paused"); //then replace class "play" to "paused"
        playPauseBtn.querySelector(".material-icons").innerHTML = "pause";
        imgBox.classList.add("img-rotate");
        music.play();
    }
    setTimeout(()=>{
        music.play();
    }, 700);
    loadMusic(musicIndex);
})

music.addEventListener("ended", ()=>{
    nextBtn.click();
})