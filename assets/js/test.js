// 1. Create Audio Context
const audioCtx = new AudioContext();

// 2. Create Oscillator Nodes
const carrier = audioCtx.createOscillator();
const modulator = audioCtx.createOscillator();
const modGain = audioCtx.createGain();

// 3. Configure Nodes
carrier.frequency.value = 220; // Base pitch (A3)
modulator.frequency.value = 2;  // Slow modulation (vibrato)
modGain.gain.value = 30;       // Modulation depth (±30Hz)

// 4. Connect Modulator to Carrier Frequency
modulator.connect(modGain);
modGain.connect(carrier.frequency);

// 5. Connect Carrier to Output
carrier.connect(audioCtx.destination);

// 6. Start
modulator.start();
carrier.start();