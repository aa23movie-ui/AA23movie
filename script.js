const shell = document.querySelector('.site-shell');
const enterButton = document.getElementById('enterButton');
const video = document.getElementById('movieVideo');
const soundButton = document.getElementById('soundButton');
const videoError = document.getElementById('videoError');
const content = document.getElementById('movieContent');

enterButton.addEventListener('click', async () => {
  shell.classList.add('entered');
  content.setAttribute('aria-hidden', 'false');
  videoError.hidden = true;
  video.muted = false;
  soundButton.textContent = 'SOUND ON';
  soundButton.setAttribute('aria-label', 'Mute video');
  try {
    await video.play();
  } catch (error) {
    // Some browsers block audio autoplay. Start muted so the video still plays.
    video.muted = true;
    soundButton.textContent = 'SOUND OFF';
    soundButton.setAttribute('aria-label', 'Turn sound on');
    try { await video.play(); } catch (playError) { videoError.hidden = false; }
  }
});

soundButton.addEventListener('click', () => {
  video.muted = !video.muted;
  soundButton.textContent = video.muted ? 'SOUND OFF' : 'SOUND ON';
  soundButton.setAttribute('aria-label', video.muted ? 'Turn sound on' : 'Mute video');
  if (!video.muted) video.play().catch(() => {});
});

video.addEventListener('error', () => {
  if (shell.classList.contains('entered')) videoError.hidden = false;
});
