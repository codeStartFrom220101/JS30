const player = document.querySelector('.player')
const video = document.querySelector('.viewer')
const progress = document.querySelector('.progress')
const progressBar = document.querySelector('.progress__filled')
const toggle = document.querySelector('.toggle')
const ranges = document.querySelectorAll('.player__slider')
const skips = document.querySelectorAll('.skip')


function togglePlay() {
  const method = video.paused ? 'play' : 'pause'
  video[method]()
}

function updateBtn() {
  const icon = this.paused ? '►' : '❚ ❚'
  toggle.textContent = icon
}

function rangeHandler() {
  video[this.name] = this.value
}

function skipHandler() {
  video.currentTime += parseFloat(this.dataset.skip)
}

function progressHandler() {
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}

video.addEventListener('click', togglePlay)
toggle.addEventListener('click', togglePlay)

video.addEventListener('play', updateBtn)
video.addEventListener('pause', updateBtn)
video.addEventListener('timeupdate', progressHandler)

ranges.forEach(range => range.addEventListener('change', rangeHandler))
ranges.forEach(range => range.addEventListener('mousemove', rangeHandler))

skips.forEach(skip => skip.addEventListener('click', skipHandler))

let mousedown = false;
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)