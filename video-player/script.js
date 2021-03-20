const video = document.getElementById('vhs');

const playButton = document.getElementById('play');
const stopButton = document.getElementById('stop');
const progressBar = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

/* Play & Pause Video */
function toggleVideoStatus () {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

/* Update Play/Pause Icon */
function updateVideoStatus () {
  if (video.paused) {
    play.innerHTML = `<i class="fa fa-play fa-2x"></i>`;
  } else {
    play.innerHTML = `<i class="fa fa-pause fa-2x"></i>`;
  }
}

/* Update progressBar & timestamp */
function updateVideoProgress () {
  progressBar.value = (video.currentTime/video.duration) * 100;

  let minutes = Math.floor(video.currentTime / 60);
  if (minutes < 10) {
    minutes = '0' + String(minutes);
  }
  let seconds = Math.floor(video.currentTime % 60);
  if (seconds < 10) {
    seconds = '0' + String(seconds);
  }

  timestamp.innerHTML = `${minutes}:${seconds}`;
}

function setVideoProgress() {
  video.currentTime = (+progressBar.value * video.duration) / 100;
}

function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updateVideoStatus);
video.addEventListener('play', updateVideoStatus);
video.addEventListener('timeupdate', updateVideoProgress);

playButton.addEventListener('click', toggleVideoStatus);
stopButton.addEventListener('click', stopVideo);
progressBar.addEventListener('change', setVideoProgress);