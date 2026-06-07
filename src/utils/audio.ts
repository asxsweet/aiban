// Dynamic Web Audio API synthesizer for adorable game sounds and feedback chime effects!
// Guaranteed to work on modern browsers without requiring any external static audio.

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play a sweet retro chime (rising major chord)
export function playChime() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5 (Major chord)

  notes.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sine";
    osc.frequency.value = freq;

    gainNode.gain.setValueAtTime(0, now + index * 0.08);
    gainNode.gain.linearRampToValueAtTime(0.15, now + index * 0.08 + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 0.4);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now + index * 0.08);
    osc.stop(now + index * 0.08 + 0.5);
  });
}

// Play a cute soft "pop" bubble sound
export function playPop() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(150, now);
  osc.frequency.exponentialRampToValueAtTime(800, now + 0.12);

  gainNode.gain.setValueAtTime(0.2, now);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.15);
}

// Play a game "success" chime (triumphant fanfare)
export function playSuccessFanfare() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [
    { freq: 523.25, duration: 0.1 },  // C5
    { freq: 587.33, duration: 0.1 },  // D5
    { freq: 659.25, duration: 0.1 },  // E5
    { freq: 783.99, duration: 0.25 }, // G5
    { freq: 659.25, duration: 0.1 },  // E5
    { freq: 783.99, duration: 0.4 },  // G5
  ];

  let accumTime = 0;
  notes.forEach(({ freq, duration }) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.value = freq;

    gainNode.gain.setValueAtTime(0, now + accumTime);
    gainNode.gain.linearRampToValueAtTime(0.12, now + accumTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + accumTime + duration - 0.02);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now + accumTime);
    osc.stop(now + accumTime + duration);
    accumTime += duration;
  });
}

// Play an "angry/fail" funny double buzz sound
export function playBuzz() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  [0, 0.12].forEach((offset) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(120, now + offset);
    osc.frequency.linearRampToValueAtTime(80, now + offset + 0.1);

    gainNode.gain.setValueAtTime(0.15, now + offset);
    gainNode.gain.linearRampToValueAtTime(0.0001, now + offset + 0.1);

    // Apply lowpass filter to make it warmer/cartoonish
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 500;

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now + offset);
    osc.stop(now + offset + 0.12);
  });
}
