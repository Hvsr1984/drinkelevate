const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

export function playBubbleSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Create 3-4 rapid bubble pops
  for (let i = 0; i < 4; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = 'bandpass';
    filter.frequency.value = 800 + Math.random() * 1200;
    filter.Q.value = 8;

    osc.type = 'sine';
    const startFreq = 300 + Math.random() * 400;
    const t = now + i * 0.06;
    osc.frequency.setValueAtTime(startFreq, t);
    osc.frequency.exponentialRampToValueAtTime(startFreq * 2.5, t + 0.04);
    osc.frequency.exponentialRampToValueAtTime(startFreq * 0.5, t + 0.08);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.15, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

    osc.connect(filter).connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.12);
  }

  // Soft water swoosh
  const noise = ctx.createBufferSource();
  const bufferSize = ctx.sampleRate * 0.3;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
  noise.buffer = buffer;

  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.value = 2000;
  noiseFilter.Q.value = 1.5;

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0, now);
  noiseGain.gain.linearRampToValueAtTime(0.06, now + 0.05);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

  noise.connect(noiseFilter).connect(noiseGain).connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 0.3);
}

export function playWaterDropSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Single clean water drop
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1200, now);
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.15);
  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.25);

  // Tiny ripple
  const ripple = ctx.createOscillator();
  const rippleGain = ctx.createGain();
  ripple.type = 'sine';
  ripple.frequency.setValueAtTime(800, now + 0.1);
  ripple.frequency.exponentialRampToValueAtTime(300, now + 0.25);
  rippleGain.gain.setValueAtTime(0.08, now + 0.1);
  rippleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
  ripple.connect(rippleGain).connect(ctx.destination);
  ripple.start(now + 0.1);
  ripple.stop(now + 0.35);
}

export function playBottleOpenSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Pop sound
  const pop = ctx.createOscillator();
  const popGain = ctx.createGain();
  pop.type = 'sine';
  pop.frequency.setValueAtTime(600, now);
  pop.frequency.exponentialRampToValueAtTime(150, now + 0.08);
  popGain.gain.setValueAtTime(0.25, now);
  popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
  pop.connect(popGain).connect(ctx.destination);
  pop.start(now);
  pop.stop(now + 0.12);

  // Fizz / hiss after the pop
  const fizz = ctx.createBufferSource();
  const fizzLen = ctx.sampleRate * 0.5;
  const fizzBuf = ctx.createBuffer(1, fizzLen, ctx.sampleRate);
  const fizzData = fizzBuf.getChannelData(0);
  for (let i = 0; i < fizzLen; i++) fizzData[i] = (Math.random() * 2 - 1);
  fizz.buffer = fizzBuf;

  const fizzFilter = ctx.createBiquadFilter();
  fizzFilter.type = 'highpass';
  fizzFilter.frequency.value = 4000;

  const fizzGain = ctx.createGain();
  fizzGain.gain.setValueAtTime(0, now + 0.05);
  fizzGain.gain.linearRampToValueAtTime(0.08, now + 0.1);
  fizzGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

  fizz.connect(fizzFilter).connect(fizzGain).connect(ctx.destination);
  fizz.start(now + 0.05);
  fizz.stop(now + 0.55);
}
  pop.type = 'sine';
  pop.frequency.setValueAtTime(600, now);
  pop.frequency.exponentialRampToValueAtTime(150, now + 0.08);
  popGain.gain.setValueAtTime(0.25, now);
  popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
  pop.connect(popGain).connect(ctx.destination);
  pop.start(now);
  pop.stop(now + 0.12);

  // Fizz / hiss after the pop
  const fizz = ctx.createBufferSource();
  const fizzLen = ctx.sampleRate * 0.5;
  const fizzBuf = ctx.createBuffer(1, fizzLen, ctx.sampleRate);
  const fizzData = fizzBuf.getChannelData(0);
  for (let i = 0; i < fizzLen; i++) fizzData[i] = (Math.random() * 2 - 1);
  fizz.buffer = fizzBuf;

  const fizzFilter = ctx.createBiquadFilter();
  fizzFilter.type = 'highpass';
  fizzFilter.frequency.value = 4000;

  const fizzGain = ctx.createGain();
  fizzGain.gain.setValueAtTime(0, now + 0.05);
  fizzGain.gain.linearRampToValueAtTime(0.08, now + 0.1);
  fizzGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

  fizz.connect(fizzFilter).connect(fizzGain).connect(ctx.destination);
  fizz.start(now + 0.05);
  fizz.stop(now + 0.55);
}
