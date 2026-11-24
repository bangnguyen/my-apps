(() => {
  'use strict';

  /**
   * Studio-Grade Procedural Gym Music Engine (Web Audio API)
   * - 100% Offline, Zero Copyright Issues, Instant Load (<25KB)
   * - Sample-accurate lookahead scheduler (no JS timer jitter)
   * - Sidechain pump, TR-808 Phonk Cowbell, 909 Kick/Clap/Hats, Stereo Detuned Supersaws
   * - Smooth Auto-Ducking when the Vietnamese Voice Coach speaks
   */

  function midiToFreq(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  // Curated 6-Track Gym Playlist (16th-note step patterns, 64 steps = 4 bars per A/B section)
  const GYM_TRACKS = [
    {
      id: 'iron-phonk',
      name: 'Iron Drift Phonk',
      genre: 'Gym Phonk • 130 BPM',
      bpm: 130,
      badge: '🔥 TOP GYM',
      kick: [
        1,0,0,0, 0,0,1,0, 0,0,1,0, 0,0,0,0,
        1,0,0,1, 0,0,1,0, 0,0,1,0, 0,1,0,0
      ],
      clap: [
        0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0,
        0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,1
      ],
      hat: [
        1,1,1,1, 1,1,2,1, 1,1,1,1, 1,1,2,1,
        1,1,1,1, 1,1,2,1, 1,1,1,1, 2,1,1,1
      ],
      // F# minor Phonk 808 sub-bass
      bass: [
        42,0,0,42, 0,0,42,0, 45,0,42,0, 0,0,40,0,
        42,0,0,42, 0,0,45,0, 47,0,45,0, 42,0,40,0
      ],
      leadInstrument: 'cowbell',
      // Iconic Drift Phonk cowbell hook (Section A & Section B)
      leadA: [
        66,0,66,0, 69,0,71,0, 73,0,71,69, 0,66,0,64,
        66,0,66,0, 69,0,73,0, 74,0,73,71, 0,69,66,0
      ],
      leadB: [
        73,0,73,71, 69,0,66,0, 69,0,71,0, 73,74,73,69,
        66,0,69,0, 71,0,73,0, 76,0,74,73, 71,0,69,0
      ],
      chords: null
    },
    {
      id: 'titanium-edm',
      name: 'Titanium Cardio EDM',
      genre: 'Festival Big Room • 128 BPM',
      bpm: 128,
      badge: '⚡ CARDIO',
      kick: [
        1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0,
        1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,1,0
      ],
      clap: [
        0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0,
        0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0
      ],
      hat: [
        0,0,2,0, 0,0,2,0, 0,0,2,0, 0,0,2,0,
        0,0,2,0, 0,0,2,0, 0,0,2,0, 0,1,2,1
      ],
      // Driving off-beat festival bass (Am - F - C - G)
      bass: [
        0,45,45,45, 0,45,45,45, 0,41,41,41, 0,41,41,41,
        0,48,48,48, 0,48,48,48, 0,43,43,43, 0,43,43,47
      ],
      leadInstrument: 'supersaw',
      // Uplifting mainstage anthem hook
      leadA: [
        69,0,72,0, 76,0,76,74, 72,0,69,0, 65,0,69,72,
        72,0,76,0, 79,0,79,76, 74,0,71,0, 67,0,71,74
      ],
      leadB: [
        81,0,79,76, 72,0,76,0, 77,0,76,72, 69,0,72,76,
        79,0,76,72, 76,0,79,0, 83,0,81,79, 76,0,74,0
      ],
      chords: [
        [57, 60, 64], null, [53, 57, 60], null,
        [60, 64, 67], null, [55, 59, 62], null
      ]
    },
    {
      id: 'eye-tiger-drive',
      name: 'Tiger Montage Drive',
      genre: '80s Power Synth • 122 BPM',
      bpm: 122,
      badge: '🥊 ROCKY VIBE',
      kick: [
        1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0,
        1,0,0,0, 1,0,1,0, 1,0,0,0, 1,0,1,0
      ],
      clap: [
        0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0,
        0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0
      ],
      hat: [
        1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1,
        1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,2,1
      ],
      // Iconic pulsing 16th C-minor montage bass chug!
      bass: [
        36,36,48,36, 36,36,48,36, 36,36,46,36, 34,34,46,34,
        32,32,44,32, 32,32,44,32, 34,34,46,34, 36,36,48,36
      ],
      leadInstrument: 'brass',
      // Syncopated heroic power stabs & montage lead
      leadA: [
        72,0,0,72, 0,70,0,72, 0,0,72,0, 70,0,68,0,
        68,0,0,68, 0,70,0,72, 0,75,0,74, 72,0,0,0
      ],
      leadB: [
        75,0,75,74, 72,0,70,0, 72,0,75,0, 79,0,77,75,
        74,0,72,70, 68,0,70,72, 74,0,75,77, 72,0,0,0
      ],
      chords: [
        [60, 63, 67], null, [58, 62, 65], null,
        [56, 60, 63], null, [58, 62, 65], [60, 63, 67]
      ]
    },
    {
      id: 'beast-tech-house',
      name: 'Beast Mode Club',
      genre: 'Bass & Tech House • 126 BPM',
      bpm: 126,
      badge: '💪 BODYPUMP',
      kick: [
        1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0,
        1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,1
      ],
      clap: [
        0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0,
        0,0,0,0, 1,0,0,1, 0,0,0,0, 1,0,0,0
      ],
      hat: [
        1,0,2,0, 1,0,2,1, 1,0,2,0, 1,0,2,1,
        1,0,2,0, 1,0,2,1, 1,0,2,0, 2,1,2,1
      ],
      // Bouncy G-minor club bassline (Fisher / Meduza groove)
      bass: [
        43,0,43,46, 0,43,41,0, 43,0,43,48, 46,0,41,42,
        43,0,43,46, 0,43,41,0, 39,0,39,41, 43,0,46,0
      ],
      leadInstrument: 'pluck',
      leadA: [
        67,0,0,70, 0,67,0,0, 67,0,72,70, 0,65,0,0,
        67,0,0,70, 0,74,0,72, 70,0,67,65, 67,0,0,0
      ],
      leadB: [
        79,0,74,0, 70,0,74,79, 77,0,74,0, 70,0,72,74,
        75,0,72,0, 67,0,70,72, 74,0,70,67, 70,0,0,0
      ],
      chords: null
    },
    {
      id: 'peak-hardstyle',
      name: '40KG Peak Hardstyle',
      genre: 'PR Power Hard-EDM • 142 BPM',
      bpm: 142,
      badge: '🚀 ĐỈNH TẠ',
      kick: [
        1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0,
        1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,1,0
      ],
      clap: [
        0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0,
        0,0,0,0, 1,0,0,0, 0,0,1,0, 1,0,1,0
      ],
      hat: [
        0,0,2,0, 0,0,2,0, 0,0,2,0, 0,0,2,0,
        0,0,2,0, 0,0,2,0, 2,0,2,0, 2,2,2,2
      ],
      // Reverse-bass off-beat punch (Dm - Bb - F - C)
      bass: [
        0,0,38,38, 0,0,38,38, 0,0,34,34, 0,0,34,34,
        0,0,41,41, 0,0,41,41, 0,0,36,36, 0,0,36,40
      ],
      leadInstrument: 'supersaw',
      // Euphoric PR power anthem in D minor
      leadA: [
        74,0,74,76, 77,0,76,74, 70,0,70,72, 74,0,72,70,
        77,0,77,79, 81,0,79,77, 76,0,79,0, 76,74,72,0
      ],
      leadB: [
        86,0,84,81, 77,0,81,84, 82,0,81,77, 74,0,77,81,
        84,0,81,77, 81,0,84,86, 88,0,86,84, 81,0,0,0
      ],
      chords: [
        [62, 65, 69], null, [58, 62, 65], null,
        [65, 69, 72], null, [60, 64, 67], null
      ]
    },
    {
      id: 'cyber-runner',
      name: 'Night Runner Groove',
      genre: 'Melodic Synthwave • 118 BPM',
      bpm: 118,
      badge: '🌊 BỀN BỈ',
      kick: [
        1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0,
        1,0,0,0, 1,0,0,0, 1,0,0,1, 0,0,1,0
      ],
      clap: [
        0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0,
        0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0
      ],
      hat: [
        1,0,1,0, 1,0,2,0, 1,0,1,0, 1,0,2,0,
        1,0,1,0, 1,0,2,0, 1,0,1,1, 1,0,2,0
      ],
      // Rolling E-minor synthwave bass
      bass: [
        40,40,52,40, 40,40,52,40, 36,36,48,36, 36,36,48,36,
        38,38,50,38, 38,38,50,38, 35,35,47,35, 38,38,50,38
      ],
      leadInstrument: 'pluck',
      leadA: [
        64,0,67,71, 76,0,74,71, 72,0,67,72, 74,0,71,67,
        69,0,66,69, 74,0,71,69, 67,0,71,74, 71,0,67,0
      ],
      leadB: [
        76,0,79,76, 74,0,71,67, 72,0,76,72, 71,0,67,64,
        69,0,74,69, 71,0,74,76, 79,0,78,76, 74,0,71,0
      ],
      chords: [
        [52, 55, 59], null, [48, 52, 55], null,
        [50, 54, 57], null, [47, 50, 54], null
      ]
    }
  ];

  class GymMusicEngine {
    constructor(getAudioContextFn, onChangeCallback) {
      this.getAudioContext = getAudioContextFn;
      this.onChange = onChangeCallback;

      this.tracks = GYM_TRACKS;
      this.trackIndex = 0;
      this.isPlaying = false;
      this.volume = 0.55; // Balanced underneath voice & metronome by default
      this.isDucked = false;

      // Audio graph nodes
      this.ctx = null;
      this.masterGain = null;
      this.duckGain = null;
      this.compressor = null;
      this.melodicBus = null;
      this.drumBus = null;
      this.delayNode = null;
      this.delayFeedback = null;
      this.noiseBuffer = null;
      this.saturationCurve = this._createSaturationCurve(2.2);

      // Lookahead scheduler state
      this.currentStep = 0; // 0..127 (8-bar cycle: 4 bars Section A + 4 bars Section B)
      this.nextNoteTime = 0;
      this.schedulerTimer = null;
      this.lookaheadMs = 30;
      this.scheduleAheadSec = 0.14;
    }

    _createSaturationCurve(amount = 2.0) {
      const n = 512;
      const curve = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const x = (i * 2) / n - 1;
        curve[i] = Math.tanh(x * amount);
      }
      return curve;
    }

    _initGraph() {
      const ctx = this.getAudioContext();
      if (!ctx) return null;
      if (this.ctx === ctx && this.masterGain) return ctx;

      this.ctx = ctx;

      // Club Glue Compressor
      this.compressor = ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-14, ctx.currentTime);
      this.compressor.knee.setValueAtTime(12, ctx.currentTime);
      this.compressor.ratio.setValueAtTime(4, ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.004, ctx.currentTime);
      this.compressor.release.setValueAtTime(0.16, ctx.currentTime);

      // Coach Voice Auto-Ducking Node
      this.duckGain = ctx.createGain();
      this.duckGain.gain.setValueAtTime(this.isDucked ? 0.2 : 1.0, ctx.currentTime);

      // User Music Volume Node
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, ctx.currentTime);

      // Drum Bus & Sidechained Melodic Bus
      this.drumBus = ctx.createGain();
      this.drumBus.gain.setValueAtTime(0.95, ctx.currentTime);

      this.melodicBus = ctx.createGain();
      this.melodicBus.gain.setValueAtTime(0.85, ctx.currentTime);

      // Stereo Tempo-Synced Delay for Leads
      this.delayNode = ctx.createDelay(1.0);
      this.delayNode.delayTime.setValueAtTime(0.28, ctx.currentTime);
      this.delayFeedback = ctx.createGain();
      this.delayFeedback.gain.setValueAtTime(0.24, ctx.currentTime);
      const delayFilter = ctx.createBiquadFilter();
      delayFilter.type = 'lowpass';
      delayFilter.frequency.setValueAtTime(2100, ctx.currentTime);

      this.delayNode.connect(delayFilter);
      delayFilter.connect(this.delayFeedback);
      this.delayFeedback.connect(this.delayNode);
      this.delayNode.connect(this.melodicBus);

      this.drumBus.connect(this.compressor);
      this.melodicBus.connect(this.compressor);
      this.compressor.connect(this.duckGain);
      this.duckGain.connect(this.masterGain);
      this.masterGain.connect(ctx.destination);

      // Pre-build 1s white noise buffer for realistic percussion
      const sampleRate = ctx.sampleRate;
      this.noiseBuffer = ctx.createBuffer(1, sampleRate, sampleRate);
      const data = this.noiseBuffer.getChannelData(0);
      for (let i = 0; i < sampleRate; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      this._syncDelayToBpm();
      return ctx;
    }

    _syncDelayToBpm() {
      if (!this.ctx || !this.delayNode) return;
      const track = this.getCurrentTrack();
      // Dotted 8th echo (3 sixteenth notes)
      const dottedEighth = (60 / track.bpm / 4) * 3;
      this.delayNode.delayTime.setTargetAtTime(
        Math.min(0.8, dottedEighth),
        this.ctx.currentTime,
        0.03
      );
    }

    getCurrentTrack() {
      return this.tracks[this.trackIndex] || this.tracks[0];
    }

    setVolume(val) {
      this.volume = Math.max(0.05, Math.min(1.0, Number(val) || 0.55));
      if (this.ctx && this.masterGain) {
        this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.04);
      }
      this._emit();
    }

    /**
     * Smoothly ducks background music to 20% while Coach speaks, then restores
     */
    setDucked(ducked) {
      this.isDucked = Boolean(ducked);
      if (!this.ctx || !this.duckGain) return;
      const now = this.ctx.currentTime;
      this.duckGain.gain.cancelScheduledValues(now);
      this.duckGain.gain.setValueAtTime(this.duckGain.gain.value, now);
      if (this.isDucked) {
        this.duckGain.gain.linearRampToValueAtTime(0.18, now + 0.12);
      } else {
        this.duckGain.gain.linearRampToValueAtTime(1.0, now + 0.45);
      }
    }

    start() {
      const ctx = this._initGraph();
      if (!ctx) return;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      if (this.isPlaying) return;

      this.isPlaying = true;
      this._syncDelayToBpm();
      this.nextNoteTime = ctx.currentTime + 0.05;
      this.schedulerTimer = window.setInterval(() => this._schedulerTick(), this.lookaheadMs);
      this._emit();
    }

    stop() {
      if (this.schedulerTimer !== null) {
        clearInterval(this.schedulerTimer);
        this.schedulerTimer = null;
      }
      this.isPlaying = false;
      this._emit();
    }

    toggle() {
      if (this.isPlaying) {
        this.stop();
      } else {
        this.start();
      }
      return this.isPlaying;
    }

    selectTrack(idx, autoPlay = null) {
      const count = this.tracks.length;
      this.trackIndex = ((idx % count) + count) % count;
      this.currentStep = 0;
      this._syncDelayToBpm();
      if (autoPlay === true && !this.isPlaying) {
        this.start();
      } else {
        this._emit();
      }
    }

    nextTrack() {
      this.selectTrack(this.trackIndex + 1, this.isPlaying);
    }

    prevTrack() {
      this.selectTrack(this.trackIndex - 1, this.isPlaying);
    }

    _emit() {
      if (typeof this.onChange === 'function') {
        this.onChange({
          isPlaying: this.isPlaying,
          trackIndex: this.trackIndex,
          track: this.getCurrentTrack(),
          totalTracks: this.tracks.length,
          volume: this.volume
        });
      }
    }

    // =======================================================================
    // SAMPLE-ACCURATE SEQUENCER & INSTRUMENTS
    // =======================================================================
    _schedulerTick() {
      if (!this.isPlaying || !this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }

      const track = this.getCurrentTrack();
      const stepDur = 60 / track.bpm / 4; // 16th note duration

      // Guard against long background tab sleep jumping thousands of steps
      if (this.nextNoteTime < this.ctx.currentTime - 0.3) {
        this.nextNoteTime = this.ctx.currentTime + 0.04;
      }

      while (this.nextNoteTime < this.ctx.currentTime + this.scheduleAheadSec) {
        this._scheduleStep(track, this.currentStep, this.nextNoteTime, stepDur);
        this.nextNoteTime += stepDur;
        this.currentStep = (this.currentStep + 1) % 128; // 8-bar full phrase
      }
    }

    _scheduleStep(track, step128, time, stepDur) {
      const idx32 = step128 % 32;
      const isSectionB = step128 >= 64;

      // 1. Kick + Sidechain Pump
      if (track.kick[idx32]) {
        this._triggerKick(time, track.id === 'peak-hardstyle');
        // Sidechain pump on melodic bus!
        this.melodicBus.gain.cancelScheduledValues(time);
        this.melodicBus.gain.setValueAtTime(0.28, time);
        this.melodicBus.gain.exponentialRampToValueAtTime(0.88, time + stepDur * 2.6);
      }

      // 2. Club Clap / Snare
      if (track.clap[idx32]) {
        this._triggerClapSnare(time);
      }

      // 3. Closed / Open 909 Hi-Hat
      const hatVal = track.hat[idx32];
      if (hatVal === 1) {
        this._triggerHat(time, false);
      } else if (hatVal === 2) {
        this._triggerHat(time, true);
      }

      // 4. Bassline
      const bassMidi = track.bass[idx32];
      if (bassMidi > 0) {
        this._triggerBass(time, midiToFreq(bassMidi), stepDur * 1.65, track.id === 'iron-phonk');
      }

      // 5. Pad / Power Chord Stabs (every half-bar = 8 sixteenth steps)
      if (track.chords && step128 % 8 === 0) {
        const chordIdx = Math.floor((step128 % 64) / 8);
        const chordNotes = track.chords[chordIdx];
        if (chordNotes) {
          this._triggerChordPad(time, chordNotes, stepDur * 7.5);
        }
      }

      // 6. Lead Hook (A-Section first 4 bars, B-Section high-energy second 4 bars)
      const leadArr = isSectionB && track.leadB ? track.leadB : track.leadA;
      const leadMidi = leadArr ? leadArr[idx32] : 0;
      if (leadMidi > 0) {
        const freq = midiToFreq(leadMidi);
        if (track.leadInstrument === 'cowbell') {
          this._triggerPhonkCowbell(time, freq, stepDur * 1.4);
        } else if (track.leadInstrument === 'supersaw') {
          this._triggerSupersawLead(time, freq, stepDur * 1.8);
        } else if (track.leadInstrument === 'brass') {
          this._triggerRetroBrass(time, freq, stepDur * 1.9);
        } else {
          this._triggerHousePluck(time, freq, stepDur * 1.5);
        }
      }
    }

    _triggerKick(time, hardstyle = false) {
      const ctx = this.ctx;
      const osc = ctx.createOscillator();
      const shaper = ctx.createWaveShaper();
      const gain = ctx.createGain();

      osc.type = hardstyle ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(hardstyle ? 185 : 156, time);
      osc.frequency.exponentialRampToValueAtTime(46, time + 0.052);
      osc.frequency.exponentialRampToValueAtTime(36, time + 0.24);

      shaper.curve = this.saturationCurve;

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.88, time + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);

      osc.connect(shaper);
      shaper.connect(gain);
      gain.connect(this.drumBus);

      osc.start(time);
      osc.stop(time + 0.26);
    }

    _triggerClapSnare(time) {
      const ctx = this.ctx;
      // Filtered noise clap
      const noise = ctx.createBufferSource();
      noise.buffer = this.noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1450, time);
      filter.Q.setValueAtTime(1.1, time);

      const nGain = ctx.createGain();
      nGain.gain.setValueAtTime(0.001, time);
      nGain.gain.linearRampToValueAtTime(0.42, time + 0.005);
      nGain.gain.exponentialRampToValueAtTime(0.001, time + 0.16);

      noise.connect(filter);
      filter.connect(nGain);
      nGain.connect(this.drumBus);
      noise.start(time);
      noise.stop(time + 0.17);

      // Punchy snare body
      const body = ctx.createOscillator();
      const bGain = ctx.createGain();
      body.type = 'triangle';
      body.frequency.setValueAtTime(210, time);
      body.frequency.exponentialRampToValueAtTime(115, time + 0.07);
      bGain.gain.setValueAtTime(0.28, time);
      bGain.gain.exponentialRampToValueAtTime(0.001, time + 0.085);
      body.connect(bGain);
      bGain.connect(this.drumBus);
      body.start(time);
      body.stop(time + 0.09);
    }

    _triggerHat(time, isOpen = false) {
      const ctx = this.ctx;
      const src = ctx.createBufferSource();
      src.buffer = this.noiseBuffer;

      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.setValueAtTime(7600, time);

      const gain = ctx.createGain();
      const dur = isOpen ? 0.165 : 0.042;
      const peak = isOpen ? 0.22 : 0.12;

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(peak, time + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

      src.connect(hp);
      hp.connect(gain);
      gain.connect(this.drumBus);
      src.start(time);
      src.stop(time + dur + 0.01);
    }

    _triggerBass(time, freq, dur, distorted808 = false) {
      const ctx = this.ctx;
      const osc = ctx.createOscillator();
      const sub = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, time);

      sub.type = 'sine';
      sub.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(distorted808 ? 920 : 680, time);
      filter.frequency.exponentialRampToValueAtTime(160, time + dur);
      filter.Q.setValueAtTime(distorted808 ? 3.2 : 2.2, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.42, time + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

      osc.connect(filter);
      sub.connect(filter);
      if (distorted808) {
        const shaper = ctx.createWaveShaper();
        shaper.curve = this.saturationCurve;
        filter.connect(shaper);
        shaper.connect(gain);
      } else {
        filter.connect(gain);
      }
      gain.connect(this.melodicBus);

      osc.start(time);
      sub.start(time);
      osc.stop(time + dur + 0.02);
      sub.stop(time + dur + 0.02);
    }

    _triggerPhonkCowbell(time, freq, dur) {
      const ctx = this.ctx;
      // Classic TR-808 dual-oscillator cowbell ratio (1 : 1.481) with Phonk saturation
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const bp = ctx.createBiquadFilter();
      const shaper = ctx.createWaveShaper();
      const gain = ctx.createGain();

      osc1.type = 'square';
      osc2.type = 'square';
      osc1.frequency.setValueAtTime(freq, time);
      osc2.frequency.setValueAtTime(freq * 1.481, time);

      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(freq * 1.25, time);
      bp.Q.setValueAtTime(2.6, time);

      shaper.curve = this.saturationCurve;

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.28, time + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

      osc1.connect(bp);
      osc2.connect(bp);
      bp.connect(shaper);
      shaper.connect(gain);
      gain.connect(this.melodicBus);
      gain.connect(this.delayNode);

      osc1.start(time);
      osc2.start(time);
      osc1.stop(time + dur + 0.02);
      osc2.stop(time + dur + 0.02);
    }

    _triggerSupersawLead(time, freq, dur) {
      const ctx = this.ctx;
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3600, time);
      filter.frequency.exponentialRampToValueAtTime(1400, time + dur);
      filter.Q.setValueAtTime(1.4, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.22, time + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

      [-10, 0, 10].forEach((detuneCents) => {
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, time);
        osc.detune.setValueAtTime(detuneCents, time);
        osc.connect(filter);
        osc.start(time);
        osc.stop(time + dur + 0.02);
      });

      filter.connect(gain);
      gain.connect(this.melodicBus);
      gain.connect(this.delayNode);
    }

    _triggerRetroBrass(time, freq, dur) {
      const ctx = this.ctx;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';
      osc1.frequency.setValueAtTime(freq, time);
      osc2.frequency.setValueAtTime(freq, time);
      osc2.detune.setValueAtTime(7, time);

      // Classic 80s brass filter swell
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(500, time);
      filter.frequency.linearRampToValueAtTime(2800, time + 0.045);
      filter.frequency.exponentialRampToValueAtTime(900, time + dur);
      filter.Q.setValueAtTime(2.0, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.26, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.melodicBus);
      gain.connect(this.delayNode);

      osc1.start(time);
      osc2.start(time);
      osc1.stop(time + dur + 0.02);
      osc2.stop(time + dur + 0.02);
    }

    _triggerHousePluck(time, freq, dur) {
      const ctx = this.ctx;
      const osc = ctx.createOscillator();
      const oscSub = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      oscSub.type = 'square';
      osc.frequency.setValueAtTime(freq, time);
      oscSub.frequency.setValueAtTime(freq * 0.5, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2900, time);
      filter.frequency.exponentialRampToValueAtTime(340, time + dur * 0.85);
      filter.Q.setValueAtTime(3.0, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.25, time + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

      osc.connect(filter);
      oscSub.connect(filter);
      filter.connect(gain);
      gain.connect(this.melodicBus);
      gain.connect(this.delayNode);

      osc.start(time);
      oscSub.start(time);
      osc.stop(time + dur + 0.02);
      oscSub.stop(time + dur + 0.02);
    }

    _triggerChordPad(time, midiNotes, dur) {
      const ctx = this.ctx;
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1350, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.11, time + 0.05);
      gain.gain.setValueAtTime(0.09, time + dur * 0.75);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

      midiNotes.forEach((m) => {
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(midiToFreq(m), time);
        osc.connect(filter);
        osc.start(time);
        osc.stop(time + dur + 0.03);
      });

      filter.connect(gain);
      gain.connect(this.melodicBus);
    }
  }

  window.GymMusicEngine = GymMusicEngine;
})();
