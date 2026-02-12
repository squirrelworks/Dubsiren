let audioContext;
let oscillator;
let gainNode;
let isPlaying = false;

const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');
const frequencySlider = document.getElementById('frequency');
const freqDisplay = document.getElementById('freqDisplay');
const waveTypeSelect = document.getElementById('waveType');

function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
    gainNode.gain.value = 0.3;
  }
}

function startOscillator() {
  if (isPlaying) return;
  
  initAudio();
  oscillator = audioContext.createOscillator();
  oscillator.type = waveTypeSelect.value;
  oscillator.frequency.value = parseFloat(frequencySlider.value);
  oscillator.connect(gainNode);
  oscillator.start();
  isPlaying = true;
  playBtn.disabled = true;
  stopBtn.disabled = false;
}

function stopOscillator() {
  if (!isPlaying) return;
  
  oscillator.stop();
  isPlaying = false;
  playBtn.disabled = false;
  stopBtn.disabled = true;
}

playBtn.addEventListener('click', startOscillator);
stopBtn.addEventListener('click', stopOscillator);

frequencySlider.addEventListener('input', (e) => {
  const freq = parseFloat(e.target.value);
  freqDisplay.textContent = freq;
  if (isPlaying && oscillator) {
    oscillator.frequency.value = freq;
  }
});

waveTypeSelect.addEventListener('change', (e) => {
  if (isPlaying && oscillator) {
    oscillator.type = e.target.value;
  }
});

stopBtn.disabled = true;