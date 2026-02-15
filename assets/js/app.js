let audioContext;
let oscillator;
let gainNode;
let isPlaying = false;
let mod;


let carrier ;
let modulator;
let modGain;
let audioCtx;


const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');
const frequencySlider = document.getElementById('frequency');
const freqDisplay = document.getElementById('freqDisplay');

const ModFrequencySlider = document.getElementById('modFrequency');
const modFreqDisplay = document.getElementById('modFreqDisplay');

const ModDepthSlider = document.getElementById('modDepth');
const modDepthDisplay = document.getElementById('modDepthDisplay');

const waveTypeSelect = document.getElementById('waveType');

 const fadeDuration = 0.01; // seconds


playBtn.addEventListener('mousedown', startFullSiren);
playBtn.addEventListener('mouseup', stopFullSiren);

playBtn.addEventListener('touchstart', startFullSiren);
playBtn.addEventListener('touchend', stopFullSiren);

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    //startOscillator();
    startFullSiren();
  }});

window.addEventListener('keyup', (e) => {
  if (e.code === 'Space') {
    //stopOscillator();
   stopFullSiren();
  }});




frequencySlider.addEventListener('input', (e) => {
  const freq = parseFloat(e.target.value);
  freqDisplay.textContent = freq;
  if (isPlaying && carrier) {
    //oscillator.frequency.value = freq;
    carrier.frequency.value = freq;
  }
});

ModDepthSlider.addEventListener('input', (e) => {
  const modDepth = parseFloat(e.target.value);
  modDepthDisplay.textContent = modDepth; 
  if (isPlaying && modGain) {
    modGain.gain.value = modDepth;
  }
});


ModFrequencySlider.addEventListener('input', (e) => {
  const modFreq = parseFloat(e.target.value);
  modFreqDisplay.textContent = modFreq; 
  if (isPlaying && modulator) {
   //mod.frequency.value = modFreq;
    modulator.frequency.value = modFreq;
  }
});


waveTypeSelect.addEventListener('change', (e) => {
  if (isPlaying && carrier) {
    carrier.type = e.target.value;
  }
});


function startFullSiren() {
  if (isPlaying) return;
   audioCtx = new AudioContext();

// 2. Create Oscillator Nodes
 carrier = audioCtx.createOscillator();
 modulator = audioCtx.createOscillator();
 modGain = audioCtx.createGain();

// 3. Configure Nodes
carrier.type = waveTypeSelect.value;
carrier.frequency.value = parseFloat(frequencySlider.value); 
modulator.frequency.value = parseFloat(ModFrequencySlider.value); 
modGain.gain.value = parseFloat(ModDepthSlider.value);      

// 4. Connect Modulator to Carrier Frequency
modulator.connect(modGain);
modGain.connect(carrier.frequency);

// 5. Connect Carrier to Output
carrier.connect(audioCtx.destination);

// 6. Start
modulator.start();
carrier.start();
  isPlaying = true;
}

function stopFullSiren() {



  const now = audioCtx.currentTime;

// Ramp gain down to 0 over the duration
modGain.gain.setValueAtTime(modGain.gain.value, now);
modGain.gain.linearRampToValueAtTime(0, now + fadeDuration); 
 


  modulator.stop(now + fadeDuration);
carrier.stop(now + fadeDuration);
  isPlaying = false;
}

