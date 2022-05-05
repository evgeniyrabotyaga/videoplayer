const playBtn = document.getElementById('play-btn');
const player = document.querySelector('.player');
const video = document.querySelector('.video');
const progressBar = document.querySelector('.progress-bar');
const durationElement = document.querySelector('.time-duration');
const currenTimetElement = document.querySelector('.time-elapsed');
const progressRange = document.querySelector('.progress-range');
const volumeBarElement = document.querySelector('.volume-bar');
const volumeRangeElement = document.querySelector('.volume-range');
const volumeIcon = document.getElementById('volume-icon');
const playbackRate = document.querySelector('.player-speed');
const fullscreenBtn = document.querySelector('.fa-expand');
const videoSources = [
  'https://pixabay.com/videos/download/video-31377_tiny.mp4?attachment',
  'https://pixabay.com/videos/download/video-28745_source.mp4?attachment',
  'https://pixabay.com/videos/download/video-41758_source.mp4?attachment',
];
let videoIsPlaying = false;
let videoIsMuted = false;

//Random Video
let activeVideo = Math.floor(Math.random() * videoSources.length);
video.src = videoSources[activeVideo];

// Play & Pause ----------------------------------- //
const playVideo = function () {
  video.play();
  videoIsPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
};

const pauseVideo = function () {
  video.pause();
  videoIsPlaying = false;
  videoIsPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
};

const endVideoEvent = function () {
  videoIsPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  video.src = videoSources[++activeVideo];
  if (activeVideo > videoSources.length - 1) {
    activeVideo = 0;
    video.src = videoSources[activeVideo];
  }
};

playBtn.addEventListener('click', () =>
  videoIsPlaying ? pauseVideo() : playVideo()
);

video.addEventListener('ended', endVideoEvent);
video.addEventListener('click', () =>
  videoIsPlaying ? pauseVideo() : playVideo()
);

// Progress Bar ---------------------------------- //
const updateTime = function (time) {
  const minutes = Math.trunc(time / 60);
  let seconds = Math.trunc(time % 60);
  seconds = seconds < 10 ? (seconds = `0${seconds}`) : seconds;
  return `${minutes}:${seconds}`;
};

const updateProgressBar = function () {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  durationElement.textContent = `${updateTime(video.duration)}`;
  currenTimetElement.textContent = `${updateTime(video.currentTime)} / `;
};

const setProgressBar = function (e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
};

video.addEventListener('timeupdate', updateProgressBar);
video.addEventListener('canplay', updateProgressBar);
progressRange.addEventListener('click', setProgressBar);

// Volume Controls --------------------------- //
const setVolume = function (e) {
  let newVolume = e.offsetX / volumeRangeElement.offsetWidth;
  if (newVolume < 0.1) newVolume = 0;
  if (newVolume > 0.9) newVolume = 1;
  video.volume = newVolume;
  volumeBarElement.style.width = `${newVolume * 100}%`;
  volumeIcon.className = '';
  if (newVolume > 0.7) volumeIcon.classList.add('fas', 'fa-volume-up');
  if (newVolume < 0.7 && newVolume > 0)
    volumeIcon.classList.add('fas', 'fa-volume-down');
  if (newVolume === 0) {
    videoIsMuted = true;
    volumeIcon.setAttribute('title', 'Volume up');
    volumeIcon.classList.add('fas', 'fa-volume-mute');
  }
};

const muteVolume = function () {
  if (!videoIsMuted) {
    videoIsMuted = true;
    video.volume = 0;
    volumeIcon.className = '';
    volumeIcon.setAttribute('title', 'Volume up');
    volumeIcon.classList.add('fas', 'fa-volume-mute');
    volumeBarElement.style.width = `0%`;
  } else {
    videoIsMuted = false;
    video.volume = 1;
    volumeIcon.className = '';
    volumeIcon.setAttribute('title', 'Mute');
    volumeIcon.classList.add('fas', 'fa-volume-up');
    volumeBarElement.style.width = `100%`;
  }
};

volumeRangeElement.addEventListener('click', setVolume);
volumeIcon.addEventListener('click', muteVolume);
// Change Playback Speed -------------------- //
const changeSpeed = function () {
  video.playbackRate = playbackRate.value;
};

playbackRate.addEventListener('change', changeSpeed);
// Fullscreen ------------------------------- //
/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}
/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}

const toggleFullscreen = function () {
  !fullscreen ? openFullscreen(player) : closeFullscreen(player);
  fullscreen = !fullscreen;
};

let fullscreen = false;

fullscreenBtn.addEventListener('click', toggleFullscreen);
