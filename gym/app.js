(() => {
  'use strict';

  const STORAGE_PLAN_KEY = 'gym_coach_custom_plan_v1';
  const STORAGE_PREFS_KEY = 'gym_coach_audio_prefs_v1';

  // Embedded fallback identical to ./workout-plan.json so offline/file boot is instantaneous
  const DEFAULT_PLAN = {
    id: 'pha-cardio-40m-v1',
    title: 'Gym Cardio Coach • 40 Phút PHA',
    goal: 'Đốt năng lượng tối đa 8 vòng liên hoàn & hỗ trợ ngủ sâu giấc buổi tối',
    warmup: {
      title: 'Khởi động làm nóng',
      enTitle: 'Dynamic Warm-up',
      durationSec: 180,
      segments: [
        { fromSec: 0, toSec: 60, cue: 'Xoay kỹ khớp cổ tay, khuỷu tay, vai, hông và khớp gối' },
        { fromSec: 60, toSec: 120, cue: 'Nâng cao đùi tại chỗ đều nhịp để làm nóng tim mạch' },
        { fromSec: 120, toSec: 180, cue: 'Mở rộng khớp ngực - vai & kiểm tra chốt tạ Vòng 1 (20 kg)' }
      ]
    },
    cooldown: {
      title: 'Hạ nhiệt & Giãn cơ',
      enTitle: 'Cool-down & Stretch',
      durationSec: 180,
      segments: [
        { fromSec: 0, toSec: 60, cue: 'Đi lại nhẹ nhàng, hít sâu bằng mũi 4 giây — thở chậm 6 giây' },
        { fromSec: 60, toSec: 120, cue: 'Giãn cơ ngực hai bên và treo thả lỏng giãn cơ xô lưng' },
        { fromSec: 120, toSec: 180, cue: 'Giãn cơ đùi trước & thả lỏng thắt lưng giúp ngủ sâu giấc' }
      ]
    },
    exercises: {
      bench_press: {
        id: 'bench_press',
        name: 'Đẩy ngực nằm',
        shortVoice: 'đẩy ngực',
        enName: 'Bench Press',
        equipment: 'Ghế tạ đẩy nằm',
        availableWeights: [20, 30, 40],
        reps: 12,
        secPerRep: 3,
        restAfterSec: 30,
        tempoLabels: ['Hạ tạ', 'Chạm ngực', 'Đẩy lên'],
        formTip: 'Hạ thanh đòn có kiểm soát, thở ra khi đẩy lên'
      },
      lat_pulldown: {
        id: 'lat_pulldown',
        name: 'Kéo xô',
        shortVoice: 'kéo xô',
        enName: 'Lat Pulldown',
        equipment: 'Giàn kéo xô',
        availableWeights: [20, 30],
        reps: 12,
        secPerRep: 3,
        restAfterSec: 30,
        tempoLabels: ['Kéo xuống', 'Siết xô', 'Thả chậm'],
        formTip: 'Ưỡn ngực mở vai, kéo thanh đòn về sát xương đòn'
      },
      leg_extension: {
        id: 'leg_extension',
        name: 'Đá đùi trước',
        shortVoice: 'đá đùi trước',
        enName: 'Leg Extension',
        equipment: 'Ghế đa năng',
        availableWeights: [20],
        reps: 12,
        secPerRep: 3,
        restAfterSec: 30,
        tempoLabels: ['Đá lên', 'Siết đùi', 'Hạ chậm'],
        formTip: 'Duỗi thẳng gối siết cơ đùi trước, không thả rơi tạ'
      },
      crunch: {
        id: 'crunch',
        name: 'Gập bụng liên tục',
        shortVoice: 'gập bụng',
        enName: 'Ab Crunch',
        equipment: 'Ghế tập bụng',
        availableWeights: [0],
        reps: 15,
        secPerRep: 2,
        restAfterSec: 35,
        tempoLabels: ['Gập lên', 'Hạ xuống'],
        formTip: 'Thở ra cuộn cơ bụng liên tục, giữ cằm thoáng không kéo cổ'
      }
    },
    exerciseOrder: ['bench_press', 'lat_pulldown', 'leg_extension', 'crunch'],
    rounds: [
      { round: 1, phaseLabel: 'Làm nóng', enPhaseLabel: 'Warm Build', weights: { bench_press: 20, lat_pulldown: 20, leg_extension: 20, crunch: 0 }, endRoundRestSec: 35 },
      { round: 2, phaseLabel: 'Làm nóng', enPhaseLabel: 'Warm Build', weights: { bench_press: 20, lat_pulldown: 20, leg_extension: 20, crunch: 0 }, endRoundRestSec: 35 },
      { round: 3, phaseLabel: 'Tăng tải', enPhaseLabel: 'Load Up', weights: { bench_press: 30, lat_pulldown: 20, leg_extension: 20, crunch: 0 }, endRoundRestSec: 35 },
      { round: 4, phaseLabel: 'Tăng tải', enPhaseLabel: 'Load Up', weights: { bench_press: 30, lat_pulldown: 20, leg_extension: 20, crunch: 0 }, endRoundRestSec: 35 },
      { round: 5, phaseLabel: 'Đẩy nhịp', enPhaseLabel: 'Tempo Push', weights: { bench_press: 30, lat_pulldown: 30, leg_extension: 20, crunch: 0 }, endRoundRestSec: 35 },
      { round: 6, phaseLabel: 'Đỉnh sức mạnh', enPhaseLabel: 'Peak Power', weights: { bench_press: 40, lat_pulldown: 30, leg_extension: 20, crunch: 0 }, endRoundRestSec: 35 },
      { round: 7, phaseLabel: 'Duy trì bền bỉ', enPhaseLabel: 'Endurance Hold', weights: { bench_press: 30, lat_pulldown: 30, leg_extension: 20, crunch: 0 }, endRoundRestSec: 35 },
      { round: 8, phaseLabel: 'Xả cơ về đích', enPhaseLabel: 'Finish Flush', weights: { bench_press: 20, lat_pulldown: 20, leg_extension: 20, crunch: 0 }, endRoundRestSec: 0 }
    ]
  };

  // =========================================================================
  // 1. WEB AUDIO SYNTHESIZER: Warm Woodblock Metronome & Station Chimes
  // =========================================================================
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.tickEnabled = true;
    }

    ensureContext() {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    }

    unlock() {
      const ctx = this.ensureContext();
      if (!ctx) return;
      // Play 1-sample silent buffer to unlock iOS Safari WebAudio pipeline
      const buffer = ctx.createBuffer(1, 1, 22050);
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.connect(ctx.destination);
      try {
        src.start(0);
      } catch (_) {}
    }

    /**
     * Warm Woodblock Resonator (~330Hz - 420Hz)
     * Non-fatiguing natural hardwood acoustic envelope
     * @param {'rep_accent' | 'rep_sub' | 'rest_tick'} mode
     */
    playWoodblock(mode = 'rep_accent') {
      if (!this.tickEnabled) return;
      const ctx = this.ensureContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      let startFreq = 418;
      let endFreq = 362;
      let peakGain = 0.42;
      let decaySec = 0.095;

      if (mode === 'rep_sub') {
        // Secondary beat inside 2s/3s rep ("Tắc" trầm ấm)
        startFreq = 344;
        endFreq = 312;
        peakGain = 0.21;
        decaySec = 0.08;
      } else if (mode === 'rest_tick') {
        // Gentle low-volume ambient tick during 30s rest / warmup / cooldown
        startFreq = 352;
        endFreq = 328;
        peakGain = 0.085;
        decaySec = 0.07;
      }

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.045);

      // Warm resonant wood body filter (cuts harsh upper harmonics)
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(startFreq * 1.45, now);
      filter.Q.setValueAtTime(2.1, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(peakGain, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decaySec);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decaySec + 0.015);
    }

    /**
     * 3 - 2 - 1 Countdown Beep
     */
    playCountdownBeep(secondsLeft) {
      const ctx = this.ensureContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freq = secondsLeft === 1 ? 587.33 : 523.25; // D5 on 1, C5 on 3 & 2
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.26, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    }

    /**
     * 0s Station Transition Bell / Chime
     * @param {'work' | 'rest' | 'finish'} targetType
     */
    playTransitionChime(targetType = 'work') {
      const ctx = this.ensureContext();
      if (!ctx) return;

      const notes =
        targetType === 'finish'
          ? [523.25, 659.25, 783.99, 1046.5] // Celebratory C major arpeggio
          : targetType === 'work'
          ? [440.0, 587.33] // Crisp ascending A4 -> D5 ("Action!")
          : [587.33, 440.0]; // Relaxing descending D5 -> A4 ("Rest!")

      const now = ctx.currentTime;
      notes.forEach((freq, idx) => {
        const start = now + idx * 0.11;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.linearRampToValueAtTime(0.34, start + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.34);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.36);
      });
    }
  }

  // =========================================================================
  // 2. WEB SPEECH COACH (vi-VN Primary -> en-US Fallback -> Chime Fallback)
  // =========================================================================
  class VoiceCoach {
    constructor(soundEngine, statusCallback) {
      this.soundEngine = soundEngine;
      this.statusCallback = statusCallback;
      this.enabled = true;
      this.supported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
      this.viVoice = null;
      this.enVoice = null;
      this.mode = 'checking'; // 'vi' | 'en' | 'chime'

      if (this.supported) {
        this.refreshVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = () => this.refreshVoices();
        }
        // Retry once after 600ms for iOS Safari lazy voice enumeration
        setTimeout(() => this.refreshVoices(), 600);
      } else {
        this.mode = 'chime';
        this.notifyStatus();
      }
    }

    refreshVoices() {
      if (!this.supported) return;
      const voices = window.speechSynthesis.getVoices() || [];
      if (voices.length === 0) {
        // Before voices populate on Android/iOS, default optimistically to vi-VN
        if (this.mode === 'checking') {
          this.mode = 'vi';
          this.notifyStatus();
        }
        return;
      }

      const viCandidates = voices.filter((v) =>
        (v.lang || '').toLowerCase().startsWith('vi')
      );
      // Prefer local / enhanced voice (e.g. iOS "Linh" or Google Tiếng Việt)
      this.viVoice =
        viCandidates.find((v) => v.localService) || viCandidates[0] || null;

      const enCandidates = voices.filter((v) =>
        (v.lang || '').toLowerCase().startsWith('en')
      );
      this.enVoice =
        enCandidates.find((v) => v.localService) || enCandidates[0] || null;

      if (this.viVoice) {
        this.mode = 'vi';
      } else if (this.enVoice) {
        this.mode = 'en';
      } else {
        this.mode = 'vi'; // Let OS TTS attempt lang='vi-VN'
      }
      this.notifyStatus();
    }

    notifyStatus() {
      if (typeof this.statusCallback === 'function') {
        this.statusCallback(this.mode, this.viVoice);
      }
    }

    speak(viText, enText) {
      if (!this.enabled) return;

      if (!this.supported || this.mode === 'chime') {
        return;
      }

      try {
        window.speechSynthesis.cancel();
        const useVi = this.mode === 'vi';
        const text = useVi ? viText : enText || viText;
        const utter = new SpeechSynthesisUtterance(text);

        if (useVi) {
          utter.lang = 'vi-VN';
          if (this.viVoice) utter.voice = this.viVoice;
          utter.rate = 1.05;
        } else {
          utter.lang = 'en-US';
          if (this.enVoice) utter.voice = this.enVoice;
          utter.rate = 1.02;
        }

        utter.pitch = 1.0;
        utter.volume = 1.0;

        // Auto-duck background gym music while Coach speaks!
        if (typeof this.onSpeakState === 'function') {
          this.onSpeakState(true, text.length);
        }

        utter.onend = () => {
          if (typeof this.onSpeakState === 'function') {
            this.onSpeakState(false, 0);
          }
        };

        utter.onerror = () => {
          if (typeof this.onSpeakState === 'function') {
            this.onSpeakState(false, 0);
          }
          // Graceful chime fallback if OS TTS fails mid-session
          this.soundEngine.playTransitionChime('work');
        };

        window.speechSynthesis.speak(utter);
      } catch (_) {
        if (typeof this.onSpeakState === 'function') {
          this.onSpeakState(false, 0);
        }
        this.soundEngine.playTransitionChime('work');
      }
    }

    stop() {
      if (this.supported) {
        try {
          window.speechSynthesis.cancel();
        } catch (_) {}
      }
    }
  }

  // =========================================================================
  // 3. TIMELINE COMPILER (Transforms JSON Plan into Linear Steps)
  // =========================================================================
  function compileTimeline(plan) {
    const steps = [];
    const rounds = Array.isArray(plan.rounds) ? plan.rounds : [];
    const order = Array.isArray(plan.exerciseOrder)
      ? plan.exerciseOrder
      : ['bench_press', 'lat_pulldown', 'leg_extension', 'crunch'];

    const firstRound = rounds[0];
    const firstExId = order[0];
    const firstEx = plan.exercises[firstExId];
    const firstWeight = firstRound ? (firstRound.weights[firstExId] ?? 0) : 0;

    // Phase 1: Warm-up
    if ((plan.warmup?.durationSec || 0) > 0) {
      steps.push({
        index: steps.length,
        type: 'warmup',
        title: plan.warmup.title || 'Khởi động làm nóng',
        enTitle: plan.warmup.enTitle || 'Dynamic Warm-up',
        durationSec: Number(plan.warmup.durationSec),
        segments: plan.warmup.segments || [],
        round: 0,
        totalRounds: rounds.length,
        nextExerciseName: firstEx ? `Vòng 1 • ${firstEx.name}` : 'Vòng 1',
        nextExerciseMeta: firstEx
          ? `${firstEx.reps} nhịp × ${firstEx.secPerRep}s • ${firstEx.equipment}`
          : '',
        nextWeightKg: firstWeight,
        weightDelta: firstWeight > 0 ? { kind: 'init', text: `🔧 Lắp sẵn mức ${firstWeight} kg` } : null,
        viVoice: `Bắt đầu ${Math.round(plan.warmup.durationSec / 60)} phút khởi động làm nóng khớp và nâng cao đùi.`,
        enVoice: `Start ${Math.round(plan.warmup.durationSec / 60)} minutes warm up.`
      });
    }

    // Track previous weight on each machine to generate smart plate-change alerts
    const lastMachineWeight = {};

    // Phase 2: Rounds (PHA Circuit)
    rounds.forEach((rObj, rIdx) => {
      const roundNum = rIdx + 1;
      const isLastRound = rIdx === rounds.length - 1;

      order.forEach((exId, exIdx) => {
        const ex = plan.exercises[exId];
        if (!ex) return;

        const isLastExInRound = exIdx === order.length - 1;
        const weightKg = Number(rObj.weights?.[exId] ?? 0);
        const reps = Number(ex.reps || 12);
        const secPerRep = Number(ex.secPerRep || 3);
        const workDuration = reps * secPerRep;

        // Determine next step info for preview during work & rest
        let nextRoundObj = rObj;
        let nextExId = order[exIdx + 1];
        if (isLastExInRound) {
          nextRoundObj = !isLastRound ? rounds[rIdx + 1] : null;
          nextExId = nextRoundObj ? order[0] : null;
        }
        const nextEx = nextExId ? plan.exercises[nextExId] : null;
        const nextWeightKg =
          nextRoundObj && nextExId ? Number(nextRoundObj.weights?.[nextExId] ?? 0) : 0;

        // Compute weight delta on the NEXT machine compared to its previous round!
        let nextDelta = null;
        if (nextEx && nextWeightKg > 0) {
          const prevW =
            nextExId === exId ? weightKg : lastMachineWeight[nextExId];
          if (prevW === undefined) {
            nextDelta = { kind: 'init', text: `🔧 Mức tạ: ${nextWeightKg} kg` };
          } else if (nextWeightKg > prevW) {
            nextDelta = {
              kind: 'up',
              text: `⚡ TĂNG TẠ: ${prevW} ➔ ${nextWeightKg} kg (+${nextWeightKg - prevW} kg)`
            };
          } else if (nextWeightKg < prevW) {
            nextDelta = {
              kind: 'down',
              text: `⬇ HẠ TẠ: ${prevW} ➔ ${nextWeightKg} kg (${nextWeightKg - prevW} kg)`
            };
          } else {
            nextDelta = {
              kind: 'same',
              text: `✓ Giữ nguyên ${nextWeightKg} kg`
            };
          }
        }

        // Voice announcement for WORK step
        const weightViPhrase = weightKg > 0 ? ` ${weightKg} cân` : '';
        const weightEnPhrase = weightKg > 0 ? `, ${weightKg} kilos` : '';
        const roundIntroVi =
          exIdx === 0 ? `Vòng ${roundNum}, ${rObj.phaseLabel}. ` : '';
        const roundIntroEn =
          exIdx === 0 ? `Round ${roundNum}. ` : '';

        steps.push({
          index: steps.length,
          type: 'work',
          exerciseId: exId,
          title: ex.name,
          enTitle: ex.enName,
          equipment: ex.equipment,
          weightKg,
          reps,
          secPerRep,
          durationSec: workDuration,
          tempoLabels: ex.tempoLabels || [],
          formTip: ex.formTip || '',
          round: roundNum,
          totalRounds: rounds.length,
          phaseLabel: rObj.phaseLabel || '',
          nextExerciseName: nextEx
            ? `${isLastExInRound ? `Vòng ${roundNum + 1} • ` : ''}${nextEx.name}`
            : plan.cooldown?.title || 'Hạ nhiệt & Giãn cơ',
          nextExerciseMeta: nextEx
            ? `${nextEx.reps} nhịp × ${nextEx.secPerRep}s • ${nextEx.equipment}`
            : 'Thở sâu & giãn cơ toàn thân',
          nextWeightKg: nextEx ? nextWeightKg : null,
          weightDelta: nextDelta,
          viVoice: `${roundIntroVi}Bắt đầu ${ex.shortVoice || ex.name}${weightViPhrase}, ${reps} nhịp.`,
          enVoice: `${roundIntroEn}Start ${ex.enName}${weightEnPhrase}, ${reps} reps.`
        });

        lastMachineWeight[exId] = weightKg;

        // Rest step after exercise (Round 8 last exercise skips rest & enters Cool-down directly!)
        const restDuration = isLastExInRound
          ? isLastRound
            ? 0
            : Number(rObj.endRoundRestSec ?? ex.restAfterSec ?? 35)
          : Number(ex.restAfterSec ?? 30);

        if (restDuration > 0 && nextEx) {
          const nextWVi = nextWeightKg > 0 ? ` ${nextWeightKg} cân` : '';
          const nextWEn = nextWeightKg > 0 ? `, ${nextWeightKg} kilos` : '';

          let restVi = `Nghỉ ${restDuration} giây, chuẩn bị ${nextEx.shortVoice || nextEx.name}${nextWVi}.`;
          if (isLastExInRound) {
            const changeHint =
              nextDelta && (nextDelta.kind === 'up' || nextDelta.kind === 'down')
                ? ` đổi mức tạ ${nextWeightKg} cân.`
                : `${nextWVi}.`;
            restVi = `Hết vòng ${roundNum}. Nghỉ ${restDuration} giây, chuẩn bị vòng ${roundNum + 1}, ${nextEx.shortVoice || nextEx.name}${changeHint}`;
          }

          const restEn = isLastExInRound
            ? `End of round ${roundNum}. Rest ${restDuration} seconds. Next round: ${nextEx.enName}${nextWEn}.`
            : `Rest ${restDuration} seconds. Next up: ${nextEx.enName}${nextWEn}.`;

          steps.push({
            index: steps.length,
            type: 'rest',
            isEndRoundRest: isLastExInRound,
            title: isLastExInRound
              ? `Nghỉ chuyển sang Vòng ${roundNum + 1}`
              : 'Nghỉ & Đổi trạm tạ',
            enTitle: 'Rest & Plate Setup',
            durationSec: restDuration,
            round: roundNum,
            totalRounds: rounds.length,
            phaseLabel: rObj.phaseLabel || '',
            nextExerciseName: `${isLastExInRound ? `Vòng ${roundNum + 1} • ` : ''}${nextEx.name}`,
            nextExerciseMeta: `${nextEx.reps} nhịp × ${nextEx.secPerRep} giây • ${nextEx.equipment}`,
            nextWeightKg,
            weightDelta: nextDelta,
            formTip:
              nextDelta && (nextDelta.kind === 'up' || nextDelta.kind === 'down')
                ? `Hãy chỉnh chốt/bánh tạ trên ${nextEx.equipment} sang mức ${nextWeightKg} kg và hít thở sâu.`
                : `Di chuyển sang ${nextEx.equipment}, thả lỏng vai và hít sâu bằng mũi.`,
            viVoice: restVi,
            enVoice: restEn
          });
        }
      });
    });

    // Phase 3: Cool-down
    if ((plan.cooldown?.durationSec || 0) > 0) {
      steps.push({
        index: steps.length,
        type: 'cooldown',
        title: plan.cooldown.title || 'Hạ nhiệt & Giãn cơ',
        enTitle: plan.cooldown.enTitle || 'Cool-down & Stretch',
        durationSec: Number(plan.cooldown.durationSec),
        segments: plan.cooldown.segments || [],
        round: rounds.length,
        totalRounds: rounds.length,
        nextExerciseName: 'Hoàn thành buổi tập 40 phút',
        nextExerciseMeta: 'Tắm nước ấm & nghỉ ngơi phục hồi',
        nextWeightKg: null,
        weightDelta: null,
        viVoice: `Hoàn thành ${rounds.length} vòng chính! Bắt đầu ${Math.round(plan.cooldown.durationSec / 60)} phút hạ nhiệt và giãn cơ.`,
        enVoice: `All ${rounds.length} rounds complete! Start ${Math.round(plan.cooldown.durationSec / 60)} minutes cool down and stretch.`
      });
    }

    // Annotate cumulative start offsets for total remaining clock
    let accSec = 0;
    steps.forEach((s) => {
      s.startOffsetSec = accSec;
      accSec += s.durationSec;
    });

    return { steps, totalDurationSec: accSec };
  }

  function computeWorkoutTotals(plan) {
    let totalReps = 0;
    let totalVolumeKg = 0;
    const order = plan.exerciseOrder || ['bench_press', 'lat_pulldown', 'leg_extension', 'crunch'];
    (plan.rounds || []).forEach((r) => {
      order.forEach((exId) => {
        const ex = plan.exercises?.[exId];
        if (!ex) return;
        const reps = Number(ex.reps || 0);
        const w = Number(r.weights?.[exId] || 0);
        totalReps += reps;
        totalVolumeKg += reps * w;
      });
    });
    return { totalReps, totalVolumeKg };
  }

  // =========================================================================
  // 4. SCREEN WAKE LOCK MANAGER
  // =========================================================================
  class WakeLockManager {
    constructor(onChange) {
      this.sentinel = null;
      this.wantLock = false;
      this.onChange = onChange;

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && this.wantLock) {
          this.acquire();
        }
      });
    }

    async acquire() {
      this.wantLock = true;
      if (!('wakeLock' in navigator)) {
        this.onChange(false, 'unsupported');
        return;
      }
      try {
        if (this.sentinel && !this.sentinel.released) {
          this.onChange(true, 'active');
          return;
        }
        this.sentinel = await navigator.wakeLock.request('screen');
        this.onChange(true, 'active');
        this.sentinel.addEventListener('release', () => {
          this.onChange(false, 'released');
        });
      } catch (_) {
        this.onChange(false, 'blocked');
      }
    }

    async release() {
      this.wantLock = false;
      if (this.sentinel) {
        try {
          await this.sentinel.release();
        } catch (_) {}
        this.sentinel = null;
      }
      this.onChange(false, 'idle');
    }
  }

  // =========================================================================
  // 5. APPLICATION CONTROLLER & DRIFT-FREE WORKOUT ENGINE
  // =========================================================================
  const sound = new SoundEngine();
  let plan = structuredClone(DEFAULT_PLAN);
  let compiled = compileTimeline(plan);

  // Runtime state
  let currentStepIdx = 0;
  let isRunning = false;
  let hasStartedSession = false;
  let isFinished = false;
  let stepElapsedMs = 0;
  let lastTickPerfNow = 0;
  let lastProcessedWholeSec = -1;
  let rafOrTimerId = null;

  // DOM Elements
  const dom = {
    body: document.body,
    metaTheme: document.getElementById('metaThemeColor'),
    sessionProgressFill: document.getElementById('sessionProgressFill'),
    wakeBadge: document.getElementById('wakeBadge'),
    wakeText: document.getElementById('wakeText'),
    totalRemainingClock: document.getElementById('totalRemainingClock'),
    roundStrip: document.getElementById('roundStrip'),
    phasePill: document.getElementById('phasePill'),
    roundSublabel: document.getElementById('roundSublabel'),
    audioCheckPanel: document.getElementById('audioCheckPanel'),
    testAudioBtn: document.getElementById('testAudioBtn'),
    voiceEngineTag: document.getElementById('voiceEngineTag'),
    focalCard: document.getElementById('focalCard'),
    stationKicker: document.getElementById('stationKicker'),
    stationName: document.getElementById('stationName'),
    weightCallout: document.getElementById('weightCallout'),
    weightNum: document.getElementById('weightNum'),
    weightUnit: document.getElementById('weightUnit'),
    telemetryHero: document.getElementById('telemetryHero'),
    repBlock: document.getElementById('repBlock'),
    repCurrent: document.getElementById('repCurrent'),
    repTotal: document.getElementById('repTotal'),
    tempoDots: document.getElementById('tempoDots'),
    timerLabel: document.getElementById('timerLabel'),
    countdownDigits: document.getElementById('countdownDigits'),
    stepProgressFill: document.getElementById('stepProgressFill'),
    nextSetupBox: document.getElementById('nextSetupBox'),
    nextKicker: document.getElementById('nextKicker'),
    weightDeltaBadge: document.getElementById('weightDeltaBadge'),
    nextExName: document.getElementById('nextExName'),
    nextExMeta: document.getElementById('nextExMeta'),
    nextWeightGiant: document.getElementById('nextWeightGiant'),
    coachCue: document.getElementById('coachCue'),
    summaryCard: document.getElementById('summaryCard'),
    sumDuration: document.getElementById('sumDuration'),
    sumReps: document.getElementById('sumReps'),
    sumVolume: document.getElementById('sumVolume'),
    restartAfterFinishBtn: document.getElementById('restartAfterFinishBtn'),
    toggleVoiceBtn: document.getElementById('toggleVoiceBtn'),
    voiceStateTxt: document.getElementById('voiceStateTxt'),
    toggleTickBtn: document.getElementById('toggleTickBtn'),
    tickStateTxt: document.getElementById('tickStateTxt'),
    resetBtn: document.getElementById('resetBtn'),
    prevBtn: document.getElementById('prevBtn'),
    playPauseBtn: document.getElementById('playPauseBtn'),
    playPauseIco: document.getElementById('playPauseIco'),
    playPauseTxt: document.getElementById('playPauseTxt'),
    skipBtn: document.getElementById('skipBtn'),
    // Drawer & Modals
    openPlanDrawerBtn: document.getElementById('openPlanDrawerBtn'),
    closePlanDrawerBtn: document.getElementById('closePlanDrawerBtn'),
    planDrawer: document.getElementById('planDrawer'),
    timelineList: document.getElementById('timelineList'),
    cfgWarmupSec: document.getElementById('cfgWarmupSec'),
    cfgCooldownSec: document.getElementById('cfgCooldownSec'),
    exerciseConfigList: document.getElementById('exerciseConfigList'),
    roundsConfigList: document.getElementById('roundsConfigList'),
    cfgRoundCountLabel: document.getElementById('cfgRoundCountLabel'),
    addRoundBtn: document.getElementById('addRoundBtn'),
    removeRoundBtn: document.getElementById('removeRoundBtn'),
    saveCustomPlanBtn: document.getElementById('saveCustomPlanBtn'),
    resetDefaultPlanBtn: document.getElementById('resetDefaultPlanBtn'),
    rawJsonTextarea: document.getElementById('rawJsonTextarea'),
    jsonErrorMsg: document.getElementById('jsonErrorMsg'),
    applyRawJsonBtn: document.getElementById('applyRawJsonBtn'),
    resetJsonDefaultBtn: document.getElementById('resetJsonDefaultBtn'),
    resetConfirmModal: document.getElementById('resetConfirmModal'),
    cancelResetBtn: document.getElementById('cancelResetBtn'),
    confirmResetBtn: document.getElementById('confirmResetBtn'),
    // Gym Background Music Elements
    bgmBar: document.getElementById('bgmBar'),
    bgmToggleBtn: document.getElementById('bgmToggleBtn'),
    bgmToggleTxt: document.getElementById('bgmToggleTxt'),
    bgmOpenListBtn: document.getElementById('bgmOpenListBtn'),
    bgmTrackTitle: document.getElementById('bgmTrackTitle'),
    bgmTrackSub: document.getElementById('bgmTrackSub'),
    bgmPrevBtn: document.getElementById('bgmPrevBtn'),
    bgmNextBtn: document.getElementById('bgmNextBtn'),
    bgmPlaylistModal: document.getElementById('bgmPlaylistModal'),
    closeBgmModalBtn: document.getElementById('closeBgmModalBtn'),
    bgmVolSlider: document.getElementById('bgmVolSlider'),
    bgmVolLabel: document.getElementById('bgmVolLabel'),
    bgmTrackList: document.getElementById('bgmTrackList')
  };

  let bgmResumeOnContinue = false;
  let duckSafetyTimer = null;

  const bgm = window.GymMusicEngine
    ? new window.GymMusicEngine(
        () => sound.ensureContext(),
        (state) => {
          dom.bgmBar.classList.toggle('playing', state.isPlaying);
          dom.bgmToggleBtn.classList.toggle('active', state.isPlaying);
          dom.bgmToggleBtn.setAttribute('aria-pressed', String(state.isPlaying));
          dom.bgmToggleTxt.textContent = state.isPlaying ? 'Tắt nhạc' : 'Bật nhạc';
          dom.bgmTrackTitle.textContent = `${state.trackIndex + 1}/${state.totalTracks} • ${state.track.name}`;
          dom.bgmTrackSub.textContent = `${state.track.genre} ▾`;
          const pct = Math.round(state.volume * 100);
          dom.bgmVolSlider.value = String(pct);
          dom.bgmVolLabel.textContent = `${pct}%`;
          renderBgmPlaylistItems();
        }
      )
    : null;

  function renderBgmPlaylistItems() {
    if (!bgm || !dom.bgmTrackList) return;
    dom.bgmTrackList.innerHTML = bgm.tracks
      .map(
        (tr, idx) => `
        <button type="button" class="bgm-track-item ${idx === bgm.trackIndex ? 'selected' : ''}" data-bgm-idx="${idx}">
          <div>
            <div class="bgm-item-name">${idx + 1}. ${tr.name}</div>
            <div class="bgm-item-genre">${tr.genre}</div>
          </div>
          <span class="bgm-item-badge">${idx === bgm.trackIndex && bgm.isPlaying ? '▶ ĐANG PHÁT' : tr.badge}</span>
        </button>`
      )
      .join('');

    dom.bgmTrackList.querySelectorAll('[data-bgm-idx]').forEach((btn) => {
      btn.addEventListener('click', () => {
        sound.unlock();
        const idx = Number(btn.dataset.bgmIdx);
        bgm.selectTrack(idx, true);
        bgmResumeOnContinue = true;
        saveAudioPrefs();
      });
    });
  }

  const voice = new VoiceCoach(sound, (mode, viVoice) => {
    if (mode === 'vi') {
      const vName = viVoice ? ` (${viVoice.name})` : '';
      dom.voiceEngineTag.textContent = `Giọng HLV: Tiếng Việt vi-VN${vName}`;
    } else if (mode === 'en') {
      dom.voiceEngineTag.textContent = 'Fallback: Giọng HLV Tiếng Anh (chưa cài vi-VN)';
    } else {
      dom.voiceEngineTag.textContent = 'Fallback: Chuông báo chuyển trạm';
    }
  });

  voice.onSpeakState = (speaking, charLen) => {
    if (!bgm) return;
    if (duckSafetyTimer) {
      clearTimeout(duckSafetyTimer);
      duckSafetyTimer = null;
    }
    if (speaking) {
      bgm.setDucked(true);
      // Safety restore in case mobile browser drops utter.onend
      const estMs = Math.min(7000, Math.max(2400, charLen * 85));
      duckSafetyTimer = setTimeout(() => bgm.setDucked(false), estMs);
    } else {
      bgm.setDucked(false);
    }
  };

  const wakeLock = new WakeLockManager((locked, status) => {
    dom.wakeBadge.classList.toggle('locked', locked);
    if (locked) {
      dom.wakeText.textContent = 'Đang giữ sáng màn hình';
    } else if (status === 'unsupported') {
      dom.wakeText.textContent = 'Hãy đặt tự tắt MH > 5p';
    } else {
      dom.wakeText.textContent = 'Màn hình tự giữ sáng';
    }
  });

  function formatMMSS(totalSec) {
    const s = Math.max(0, Math.ceil(totalSec));
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${String(m).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  }

  function formatWeightBadge(kg) {
    if (kg === null || kg === undefined) return '';
    return kg > 0 ? `${kg} KG` : 'KHÔNG TẠ';
  }

  function triggerVisualBeat(isPrimaryRepBeat) {
    dom.focalCard.classList.remove('beat-flash');
    dom.repBlock.classList.remove('rep-pulse');
    void dom.focalCard.offsetWidth;
    if (isPrimaryRepBeat) {
      dom.focalCard.classList.add('beat-flash');
      dom.repBlock.classList.add('rep-pulse');
      setTimeout(() => {
        dom.focalCard.classList.remove('beat-flash');
        dom.repBlock.classList.remove('rep-pulse');
      }, 220);
    }
  }

  function renderRoundStrip() {
    const rounds = plan.rounds || [];
    const activeStep = compiled.steps[currentStepIdx];
    const currentRound = activeStep ? activeStep.round : 0;

    dom.roundStrip.innerHTML = rounds
      .map((r) => {
        let cls = 'round-chip';
        if (isFinished || (currentRound > r.round && activeStep?.type !== 'warmup')) {
          cls += ' done';
        } else if (currentRound === r.round && activeStep?.type !== 'warmup' && activeStep?.type !== 'cooldown') {
          cls += ' current';
        }
        return `<button type="button" class="${cls}" data-jump-round="${r.round}" title="Vòng ${r.round}: ${r.phaseLabel}">V${r.round}</button>`;
      })
      .join('');

    dom.roundStrip.querySelectorAll('[data-jump-round]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetRound = Number(btn.dataset.jumpRound);
        const idx = compiled.steps.findIndex(
          (s) => s.type === 'work' && s.round === targetRound
        );
        if (idx >= 0) jumpToStep(idx, isRunning);
      });
    });
  }

  function renderCurrentState() {
    if (isFinished) {
      dom.body.dataset.phase = 'done';
      dom.focalCard.hidden = true;
      dom.audioCheckPanel.hidden = true;
      dom.summaryCard.hidden = false;
      dom.phasePill.textContent = 'HOÀN THÀNH • 100%';
      dom.roundSublabel.textContent = 'Chúc bạn buổi tối thư thái & ngủ ngon giấc';
      dom.sessionProgressFill.style.width = '100%';
      dom.totalRemainingClock.textContent = '00:00';
      dom.playPauseIco.textContent = '↺';
      dom.playPauseTxt.textContent = 'TẬP LẠI';

      const totals = computeWorkoutTotals(plan);
      dom.sumDuration.textContent = formatMMSS(compiled.totalDurationSec);
      dom.sumReps.textContent = String(totals.totalReps);
      dom.sumVolume.textContent = `${totals.totalVolumeKg.toLocaleString('vi-VN')} kg`;
      renderRoundStrip();
      return;
    }

    dom.focalCard.hidden = false;
    dom.summaryCard.hidden = true;
    dom.audioCheckPanel.hidden = hasStartedSession;

    const step = compiled.steps[currentStepIdx];
    if (!step) return;

    // Theme phase attribute
    const activePhase = !hasStartedSession ? 'ready' : step.type;
    dom.body.dataset.phase = activePhase;
    if (dom.metaTheme) {
      const themeHex =
        activePhase === 'work'
          ? '#160A07'
          : activePhase === 'rest'
          ? '#06170F'
          : '#07090E';
      dom.metaTheme.setAttribute('content', themeHex);
    }

    const elapsedSecFloat = Math.min(step.durationSec, stepElapsedMs / 1000);
    const elapsedWhole = Math.floor(elapsedSecFloat);
    const remainingSec = Math.max(0, Math.ceil(step.durationSec - elapsedSecFloat));

    // Overall progress & remaining clock
    const globalElapsed = step.startOffsetSec + elapsedSecFloat;
    const globalPct =
      compiled.totalDurationSec > 0
        ? Math.min(100, (globalElapsed / compiled.totalDurationSec) * 100)
        : 0;
    dom.sessionProgressFill.style.width = `${globalPct.toFixed(2)}%`;
    dom.totalRemainingClock.textContent = formatMMSS(
      compiled.totalDurationSec - globalElapsed
    );

    // Step progress bar (drains smoothly from 100% -> 0%)
    const stepRemainPct =
      step.durationSec > 0
        ? Math.max(0, ((step.durationSec - elapsedSecFloat) / step.durationSec) * 100)
        : 0;
    dom.stepProgressFill.style.width = `${stepRemainPct.toFixed(1)}%`;

    // Play/Pause button text
    if (isRunning) {
      dom.playPauseIco.textContent = '⏸';
      dom.playPauseTxt.textContent = 'TẠM DỪNG';
    } else {
      dom.playPauseIco.textContent = '▶';
      dom.playPauseTxt.textContent = hasStartedSession ? 'TIẾP TỤC' : 'BẮT ĐẦU';
    }

    // Highlight last 3 seconds
    dom.countdownDigits.classList.toggle(
      'final-three',
      isRunning && remainingSec <= 3 && remainingSec >= 1
    );

    // Render per-type telemetry
    if (step.type === 'work') {
      dom.phasePill.textContent = `VÒNG ${step.round}/${step.totalRounds} • ${step.phaseLabel || 'ĐANG TẬP'}`;
      dom.roundSublabel.textContent = step.equipment || '';
      dom.stationKicker.textContent = `TRẠM TẬP CHÍNH • ${step.secPerRep} GIÂY / NHỊP`;
      dom.stationName.textContent = step.title;

      dom.weightCallout.hidden = false;
      if (step.weightKg > 0) {
        dom.weightNum.textContent = String(step.weightKg);
        dom.weightUnit.textContent = 'KG';
      } else {
        dom.weightNum.textContent = 'BODY';
        dom.weightUnit.textContent = '';
      }

      // Rep Counter & Intra-rep Tempo Dots
      dom.telemetryHero.classList.add('dual-mode');
      dom.repBlock.hidden = false;
      const currentRep = Math.min(
        step.reps,
        Math.floor(elapsedWhole / step.secPerRep) + 1
      );
      const beatInRep = elapsedWhole % step.secPerRep;

      dom.repCurrent.textContent = String(currentRep).padStart(2, '0');
      dom.repTotal.textContent = String(step.reps).padStart(2, '0');

      const labels =
        step.tempoLabels && step.tempoLabels.length === step.secPerRep
          ? step.tempoLabels
          : Array.from({ length: step.secPerRep }, (_, i) => `Nhịp ${i + 1}s`);

      dom.tempoDots.innerHTML = labels
        .map(
          (lbl, idx) =>
            `<span class="tempo-dot ${isRunning && idx === beatInRep ? 'active' : ''}">${lbl}</span>`
        )
        .join('');

      dom.timerLabel.textContent = 'CÒN LẠI (GIÂY)';
      dom.countdownDigits.textContent = `${String(remainingSec).padStart(2, '0')}s`;

      dom.nextKicker.textContent = 'TIẾP THEO SAU HIỆP NÀY';
      dom.nextExName.textContent = step.nextExerciseName;
      dom.nextExMeta.textContent = step.nextExerciseMeta;
      dom.nextWeightGiant.hidden = step.nextWeightKg === null;
      dom.nextWeightGiant.textContent = formatWeightBadge(step.nextWeightKg);
      dom.weightDeltaBadge.hidden = true;
      dom.coachCue.textContent = step.formTip;
    } else if (step.type === 'rest') {
      dom.phasePill.textContent = step.isEndRoundRest
        ? `NGHỈ HẾT VÒNG ${step.round} • LẮP TẠ VÒNG ${step.round + 1}`
        : `NGHỈ GIỮA HIỆP • VÒNG ${step.round}/${step.totalRounds}`;
      dom.roundSublabel.textContent = 'Thả lỏng nhịp thở & chuẩn bị trạm kế tiếp';
      dom.stationKicker.textContent = 'PHA NGHỈ & ĐỔI TẠ';
      dom.stationName.textContent = step.title;
      dom.weightCallout.hidden = true;

      dom.telemetryHero.classList.remove('dual-mode');
      dom.repBlock.hidden = true;
      dom.timerLabel.textContent = 'THỜI GIAN NGHỈ';
      dom.countdownDigits.textContent = `${String(remainingSec).padStart(2, '0')}s`;

      dom.nextKicker.textContent = 'LẮP TẠ & VÀO VỊ TRÍ BÀI TIẾP THEO';
      dom.nextExName.textContent = step.nextExerciseName;
      dom.nextExMeta.textContent = step.nextExerciseMeta;
      dom.nextWeightGiant.hidden = false;
      dom.nextWeightGiant.textContent = formatWeightBadge(step.nextWeightKg);

      if (step.weightDelta) {
        dom.weightDeltaBadge.hidden = false;
        dom.weightDeltaBadge.textContent = step.weightDelta.text;
        dom.weightDeltaBadge.classList.toggle('same', step.weightDelta.kind === 'same');
      } else {
        dom.weightDeltaBadge.hidden = true;
      }

      dom.coachCue.textContent = step.formTip;
    } else {
      // Warm-up or Cool-down
      const isWarm = step.type === 'warmup';
      dom.phasePill.textContent = isWarm
        ? 'GIAI ĐOẠN 1/3 • KHỞI ĐỘNG LÀM NÓNG'
        : 'GIAI ĐOẠN 3/3 • HẠ NHIỆT & GIÃN CƠ';
      dom.roundSublabel.textContent = isWarm
        ? `Chuẩn bị vào ${step.totalRounds} vòng PHA liên hoàn`
        : 'Hạ nhịp tim & thư giãn cơ bắp';
      dom.stationKicker.textContent = isWarm ? 'KHỞI ĐỘNG KHỚP & TIM MẠCH' : 'PHỤC HỒI SAU TẬP';
      dom.stationName.textContent = step.title;
      dom.weightCallout.hidden = true;

      dom.telemetryHero.classList.remove('dual-mode');
      dom.repBlock.hidden = true;
      dom.timerLabel.textContent = 'ĐẾM NGƯỢC';
      dom.countdownDigits.textContent = formatMMSS(remainingSec);

      dom.nextKicker.textContent = isWarm ? 'MỨC TẠ MỞ ĐẦU VÒNG 1' : 'ĐÍCH ĐẾN';
      dom.nextExName.textContent = step.nextExerciseName;
      dom.nextExMeta.textContent = step.nextExerciseMeta;
      if (step.nextWeightKg !== null && step.nextWeightKg !== undefined) {
        dom.nextWeightGiant.hidden = false;
        dom.nextWeightGiant.textContent = formatWeightBadge(step.nextWeightKg);
      } else {
        dom.nextWeightGiant.hidden = true;
      }
      dom.weightDeltaBadge.hidden = !step.weightDelta;
      if (step.weightDelta) {
        dom.weightDeltaBadge.textContent = step.weightDelta.text;
        dom.weightDeltaBadge.classList.remove('same');
      }

      // Pick active 60s mobility/stretch cue
      const seg =
        (step.segments || []).find(
          (sg) => elapsedWhole >= sg.fromSec && elapsedWhole < sg.toSec
        ) || (step.segments || [])[0];
      dom.coachCue.textContent = seg ? seg.cue : '';
    }

    renderRoundStrip();
  }

  /**
   * Fired exactly once at each integer second `sec = 0, 1, 2, ..., durationSec - 1`
   */
  function handleWholeSecondCues(step, elapsedSec) {
    const remaining = step.durationSec - elapsedSec;

    // 3 - 2 - 1 Countdown Beeps
    if (remaining <= 3 && remaining >= 1) {
      sound.playCountdownBeep(remaining);
      return;
    }

    if (step.type === 'work') {
      const isNewRep = elapsedSec % step.secPerRep === 0;
      if (isNewRep) {
        sound.playWoodblock('rep_accent');
        triggerVisualBeat(true);
      } else {
        sound.playWoodblock('rep_sub');
      }
    } else if (step.type === 'rest') {
      sound.playWoodblock('rest_tick');
    } else if (step.type === 'warmup' || step.type === 'cooldown') {
      sound.playWoodblock('rest_tick');
      // Helpful sub-segment voice cue at 60s and 120s into Warm-up / Cool-down
      if (elapsedSec > 0) {
        const newSeg = (step.segments || []).find((sg) => sg.fromSec === elapsedSec);
        if (newSeg) {
          voice.speak(newSeg.cue, step.enTitle);
        }
      }
    }
  }

  function enterStep(idx, shouldAnnounce = true) {
    if (idx >= compiled.steps.length) {
      // Workout Complete!
      isRunning = false;
      isFinished = true;
      stopLoop();
      if (bgm && bgm.isPlaying) {
        bgm.stop();
      }
      sound.playTransitionChime('finish');
      setTimeout(() => {
        voice.speak(
          'Chúc mừng bạn đã hoàn thành trọn vẹn 40 phút tập luyện! Hãy uống nước ấm và nghỉ ngơi.',
          'Workout complete! Great job finishing all rounds.'
        );
      }, 320);
      wakeLock.release();
      renderCurrentState();
      return;
    }

    isFinished = false;
    currentStepIdx = Math.max(0, idx);
    stepElapsedMs = 0;
    lastProcessedWholeSec = -1;
    lastTickPerfNow = performance.now();

    const step = compiled.steps[currentStepIdx];
    if (shouldAnnounce && step) {
      sound.playTransitionChime(step.type === 'work' ? 'work' : 'rest');
      // Delay voice slightly so station chime rings clearly first
      setTimeout(() => {
        if (isRunning && compiled.steps[currentStepIdx] === step) {
          voice.speak(step.viVoice, step.enVoice);
        }
      }, 240);

      // Trigger first second metronome beat right away on work steps
      lastProcessedWholeSec = 0;
      if (step.type === 'work') {
        sound.playWoodblock('rep_accent');
        triggerVisualBeat(true);
      }
    }

    renderCurrentState();
  }

  function tickLoop() {
    if (!isRunning) return;
    const now = performance.now();
    const delta = Math.min(2000, Math.max(0, now - lastTickPerfNow));
    lastTickPerfNow = now;
    stepElapsedMs += delta;

    const step = compiled.steps[currentStepIdx];
    if (!step) return;

    const stepDurationMs = step.durationSec * 1000;
    if (stepElapsedMs >= stepDurationMs) {
      enterStep(currentStepIdx + 1, true);
      return;
    }

    const wholeSec = Math.floor(stepElapsedMs / 1000);
    if (wholeSec > lastProcessedWholeSec) {
      lastProcessedWholeSec = wholeSec;
      handleWholeSecondCues(step, wholeSec);
    }

    renderCurrentState();
  }

  function startLoop() {
    stopLoop();
    lastTickPerfNow = performance.now();
    rafOrTimerId = window.setInterval(tickLoop, 90);
  }

  function stopLoop() {
    if (rafOrTimerId !== null) {
      clearInterval(rafOrTimerId);
      rafOrTimerId = null;
    }
  }

  function togglePlayPause() {
    sound.unlock();

    if (isFinished) {
      resetWorkout();
      return;
    }

    if (!isRunning) {
      const firstBoot = !hasStartedSession && currentStepIdx === 0 && stepElapsedMs === 0;
      hasStartedSession = true;
      isRunning = true;
      wakeLock.acquire();
      if (bgm && bgmResumeOnContinue && !bgm.isPlaying) {
        bgm.start();
      }
      startLoop();

      if (firstBoot) {
        enterStep(0, true);
      } else if (lastProcessedWholeSec === -1) {
        enterStep(currentStepIdx, true);
      } else {
        renderCurrentState();
      }
    } else {
      isRunning = false;
      stopLoop();
      voice.stop();
      if (bgm && bgm.isPlaying) {
        bgmResumeOnContinue = true;
        bgm.stop();
      }
      wakeLock.release();
      renderCurrentState();
    }
  }

  function jumpToStep(targetIdx, keepRunning = isRunning) {
    sound.unlock();
    const bounded = Math.max(0, Math.min(compiled.steps.length - 1, targetIdx));
    isFinished = false;
    if (keepRunning) {
      hasStartedSession = true;
      isRunning = true;
      wakeLock.acquire();
      startLoop();
      enterStep(bounded, true);
    } else {
      currentStepIdx = bounded;
      stepElapsedMs = 0;
      lastProcessedWholeSec = -1;
      voice.stop();
      renderCurrentState();
    }
  }

  function resetWorkout() {
    isRunning = false;
    hasStartedSession = false;
    isFinished = false;
    currentStepIdx = 0;
    stepElapsedMs = 0;
    lastProcessedWholeSec = -1;
    stopLoop();
    voice.stop();
    if (bgm && bgm.isPlaying) {
      bgmResumeOnContinue = false;
      bgm.stop();
    }
    wakeLock.release();
    renderCurrentState();
  }

  // =========================================================================
  // 6. AUDIO CHECK & PREFERENCES
  // =========================================================================
  function loadAudioPrefs() {
    try {
      const raw = localStorage.getItem(STORAGE_PREFS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed.voice === 'boolean') voice.enabled = parsed.voice;
        if (typeof parsed.tick === 'boolean') sound.tickEnabled = parsed.tick;
        if (bgm) {
          if (typeof parsed.bgmTrack === 'number') bgm.selectTrack(parsed.bgmTrack, false);
          if (typeof parsed.bgmVol === 'number') bgm.setVolume(parsed.bgmVol);
        }
      }
    } catch (_) {}
    if (bgm) bgm._emit();
    syncAudioToggleButtons();
  }

  function saveAudioPrefs() {
    try {
      localStorage.setItem(
        STORAGE_PREFS_KEY,
        JSON.stringify({
          voice: voice.enabled,
          tick: sound.tickEnabled,
          bgmTrack: bgm ? bgm.trackIndex : 0,
          bgmVol: bgm ? bgm.volume : 0.55
        })
      );
    } catch (_) {}
  }

  function syncAudioToggleButtons() {
    dom.toggleVoiceBtn.classList.toggle('active', voice.enabled);
    dom.toggleVoiceBtn.setAttribute('aria-pressed', String(voice.enabled));
    dom.voiceStateTxt.textContent = voice.enabled ? 'BẬT' : 'TẮT';

    dom.toggleTickBtn.classList.toggle('active', sound.tickEnabled);
    dom.toggleTickBtn.setAttribute('aria-pressed', String(sound.tickEnabled));
    dom.tickStateTxt.textContent = sound.tickEnabled ? 'BẬT' : 'TẮT';
  }

  function runAudioTestDemo() {
    sound.unlock();
    dom.testAudioBtn.classList.add('playing');

    // Temporarily play woodblock demo even if user toggled off earlier so they can hear test
    const prevTick = sound.tickEnabled;
    const prevVoice = voice.enabled;
    sound.tickEnabled = true;
    voice.enabled = true;

    sound.playWoodblock('rep_accent');
    setTimeout(() => sound.playWoodblock('rep_sub'), 360);
    setTimeout(() => sound.playWoodblock('rep_sub'), 720);
    setTimeout(() => sound.playTransitionChime('work'), 1100);
    setTimeout(() => {
      voice.speak(
        'Âm thanh sẵn sàng! Vòng 3, bắt đầu đẩy ngực 30 cân, 12 nhịp.',
        'Audio ready! Round 3. Start Bench Press, 30 kilos, 12 reps.'
      );
      sound.tickEnabled = prevTick;
      voice.enabled = prevVoice;
      setTimeout(() => dom.testAudioBtn.classList.remove('playing'), 1800);
    }, 1380);
  }

  // =========================================================================
  // 7. PLAN LOADER & VISUAL / JSON CUSTOMIZER DRAWER
  // =========================================================================
  let draftPlan = null;

  async function initPlanData() {
    // 1. Fetch canonical ./workout-plan.json first
    let canonical = structuredClone(DEFAULT_PLAN);
    try {
      const res = await fetch('./workout-plan.json', { cache: 'no-cache' });
      if (res.ok) {
        canonical = await res.json();
      }
    } catch (_) {}

    // 2. Check if user customized plan in localStorage
    let activePlan = canonical;
    try {
      const saved = localStorage.getItem(STORAGE_PLAN_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.rounds) && parsed.exercises) {
          activePlan = parsed;
        }
      }
    } catch (_) {}

    plan = activePlan;
    compiled = compileTimeline(plan);
    renderCurrentState();
  }

  function renderTimelineDrawer() {
    const items = [];
    // Warmup
    const warmIdx = compiled.steps.findIndex((s) => s.type === 'warmup');
    if (warmIdx >= 0) {
      const w = compiled.steps[warmIdx];
      items.push({
        stepIdx: warmIdx,
        title: `1. ${w.title}`,
        sub: `${formatMMSS(w.durationSec)} • Xoay khớp & nâng cao đùi`,
        active: currentStepIdx === warmIdx
      });
    }

    // Rounds
    (plan.rounds || []).forEach((r) => {
      const firstRoundStepIdx = compiled.steps.findIndex(
        (s) => s.type === 'work' && s.round === r.round
      );
      if (firstRoundStepIdx >= 0) {
        const w = r.weights || {};
        const summary = `Ngực ${w.bench_press ?? 20}kg • Xô ${w.lat_pulldown ?? 20}kg • Đùi ${w.leg_extension ?? 20}kg • Bụng`;
        const isCurr =
          compiled.steps[currentStepIdx]?.round === r.round &&
          compiled.steps[currentStepIdx]?.type !== 'warmup' &&
          compiled.steps[currentStepIdx]?.type !== 'cooldown';
        items.push({
          stepIdx: firstRoundStepIdx,
          title: `Vòng ${r.round} — ${r.phaseLabel}`,
          sub: summary,
          active: isCurr
        });
      }
    });

    // Cooldown
    const coolIdx = compiled.steps.findIndex((s) => s.type === 'cooldown');
    if (coolIdx >= 0) {
      const c = compiled.steps[coolIdx];
      items.push({
        stepIdx: coolIdx,
        title: `Hạ nhiệt & Giãn cơ`,
        sub: `${formatMMSS(c.durationSec)} • Hít thở sâu & giãn cơ toàn thân`,
        active: currentStepIdx === coolIdx
      });
    }

    dom.timelineList.innerHTML = items
      .map(
        (it) => `
        <button type="button" class="tl-item ${it.active ? 'active' : ''}" data-step="${it.stepIdx}">
          <div>
            <div class="tl-title">${it.title}</div>
            <div class="tl-sub">${it.sub}</div>
          </div>
          <span class="tl-Jump">Nhảy tới →</span>
        </button>`
      )
      .join('');

    dom.timelineList.querySelectorAll('[data-step]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.step);
        dom.planDrawer.hidden = true;
        jumpToStep(idx, isRunning);
      });
    });
  }

  function populateCustomizerDrawer() {
    draftPlan = structuredClone(plan);
    dom.cfgWarmupSec.value = draftPlan.warmup?.durationSec ?? 180;
    dom.cfgCooldownSec.value = draftPlan.cooldown?.durationSec ?? 180;

    const order = draftPlan.exerciseOrder || ['bench_press', 'lat_pulldown', 'leg_extension', 'crunch'];
    dom.exerciseConfigList.innerHTML = order
      .map((exId) => {
        const ex = draftPlan.exercises[exId];
        return `
          <div class="exercise-cfg-card" data-ex-id="${exId}">
            <strong>${ex.name} (${ex.equipment})</strong>
            <div class="field-grid-3">
              <label class="field-item">
                <span>Số nhịp</span>
                <input type="number" data-field="reps" min="1" max="100" value="${ex.reps}">
              </label>
              <label class="field-item">
                <span>Giây / nhịp</span>
                <input type="number" data-field="secPerRep" min="1" max="15" value="${ex.secPerRep}">
              </label>
              <label class="field-item">
                <span>Nghỉ sau (s)</span>
                <input type="number" data-field="restAfterSec" min="0" max="300" step="5" value="${ex.restAfterSec}">
              </label>
            </div>
          </div>`;
      })
      .join('');

    renderDraftRoundsEditor();
    dom.rawJsonTextarea.value = JSON.stringify(draftPlan, null, 2);
    dom.jsonErrorMsg.hidden = true;
  }

  function syncDraftRoundsFromInputs() {
    dom.roundsConfigList.querySelectorAll('.round-cfg-card').forEach((card) => {
      const idx = Number(card.dataset.ridx);
      const rObj = draftPlan.rounds[idx];
      if (!rObj) return;
      card.querySelectorAll('input[data-wex]').forEach((inp) => {
        rObj.weights[inp.dataset.wex] = Math.max(0, Number(inp.value) || 0);
      });
    });
  }

  function renderDraftRoundsEditor() {
    dom.cfgRoundCountLabel.textContent = `${draftPlan.rounds.length} vòng`;
    dom.roundsConfigList.innerHTML = draftPlan.rounds
      .map(
        (r, idx) => `
        <div class="round-cfg-card" data-ridx="${idx}">
          <strong>Vòng ${r.round} • ${r.phaseLabel}</strong>
          <div class="field-grid-3">
            <label class="field-item">
              <span>Đẩy ngực (kg)</span>
              <input type="number" data-wex="bench_press" step="5" min="0" max="200" value="${r.weights.bench_press ?? 20}">
            </label>
            <label class="field-item">
              <span>Kéo xô (kg)</span>
              <input type="number" data-wex="lat_pulldown" step="5" min="0" max="200" value="${r.weights.lat_pulldown ?? 20}">
            </label>
            <label class="field-item">
              <span>Đá đùi (kg)</span>
              <input type="number" data-wex="leg_extension" step="5" min="0" max="200" value="${r.weights.leg_extension ?? 20}">
            </label>
          </div>
        </div>`
      )
      .join('');
  }

  function saveVisualCustomization() {
    draftPlan.warmup.durationSec = Math.max(0, Number(dom.cfgWarmupSec.value) || 0);
    draftPlan.cooldown.durationSec = Math.max(0, Number(dom.cfgCooldownSec.value) || 0);

    dom.exerciseConfigList.querySelectorAll('.exercise-cfg-card').forEach((card) => {
      const exId = card.dataset.exId;
      const ex = draftPlan.exercises[exId];
      if (!ex) return;
      ex.reps = Math.max(1, Number(card.querySelector('[data-field="reps"]').value) || 12);
      ex.secPerRep = Math.max(1, Number(card.querySelector('[data-field="secPerRep"]').value) || 3);
      ex.restAfterSec = Math.max(0, Number(card.querySelector('[data-field="restAfterSec"]').value) || 30);
    });

    syncDraftRoundsFromInputs();
    // Ensure last round skips endRoundRestSec so it transitions cleanly into cooldown
    draftPlan.rounds.forEach((r, i) => {
      r.round = i + 1;
      r.endRoundRestSec =
        i === draftPlan.rounds.length - 1
          ? 0
          : draftPlan.exercises.crunch?.restAfterSec ?? 35;
    });

    applyAndPersistPlan(draftPlan);
    dom.planDrawer.hidden = true;
  }

  function applyAndPersistPlan(newPlan, clearCustomStorage = false) {
    plan = structuredClone(newPlan);
    compiled = compileTimeline(plan);
    try {
      if (clearCustomStorage) {
        localStorage.removeItem(STORAGE_PLAN_KEY);
      } else {
        localStorage.setItem(STORAGE_PLAN_KEY, JSON.stringify(plan));
      }
    } catch (_) {}
    resetWorkout();
  }

  // =========================================================================
  // 8. EVENT BINDINGS & SERVICE WORKER REGISTRATION
  // =========================================================================
  function bindEvents() {
    dom.playPauseBtn.addEventListener('click', togglePlayPause);

    dom.skipBtn.addEventListener('click', () => {
      if (isFinished) return;
      if (currentStepIdx + 1 >= compiled.steps.length) {
        enterStep(compiled.steps.length, true);
      } else {
        jumpToStep(currentStepIdx + 1, isRunning);
      }
    });

    dom.prevBtn.addEventListener('click', () => {
      if (isFinished) {
        isFinished = false;
        jumpToStep(compiled.steps.length - 1, false);
        return;
      }
      // If more than 3 seconds into current step, restart current step; else step back
      if (stepElapsedMs > 3500) {
        jumpToStep(currentStepIdx, isRunning);
      } else {
        jumpToStep(Math.max(0, currentStepIdx - 1), isRunning);
      }
    });

    dom.resetBtn.addEventListener('click', () => {
      if (!hasStartedSession || (currentStepIdx === 0 && stepElapsedMs === 0)) {
        resetWorkout();
        return;
      }
      dom.resetConfirmModal.hidden = false;
    });

    dom.cancelResetBtn.addEventListener('click', () => {
      dom.resetConfirmModal.hidden = true;
    });

    dom.confirmResetBtn.addEventListener('click', () => {
      dom.resetConfirmModal.hidden = true;
      resetWorkout();
    });

    dom.restartAfterFinishBtn.addEventListener('click', resetWorkout);

    dom.toggleVoiceBtn.addEventListener('click', () => {
      sound.unlock();
      voice.enabled = !voice.enabled;
      if (!voice.enabled) voice.stop();
      syncAudioToggleButtons();
      saveAudioPrefs();
    });

    dom.toggleTickBtn.addEventListener('click', () => {
      sound.unlock();
      sound.tickEnabled = !sound.tickEnabled;
      if (sound.tickEnabled) sound.playWoodblock('rep_accent');
      syncAudioToggleButtons();
      saveAudioPrefs();
    });

    dom.testAudioBtn.addEventListener('click', runAudioTestDemo);

    // Gym Background Music Controls
    if (bgm) {
      dom.bgmToggleBtn.addEventListener('click', () => {
        sound.unlock();
        const nowPlaying = bgm.toggle();
        bgmResumeOnContinue = nowPlaying;
      });

      dom.bgmNextBtn.addEventListener('click', () => {
        sound.unlock();
        bgm.nextTrack();
        if (!bgm.isPlaying) {
          bgm.start();
          bgmResumeOnContinue = true;
        }
        saveAudioPrefs();
      });

      dom.bgmPrevBtn.addEventListener('click', () => {
        sound.unlock();
        bgm.prevTrack();
        if (!bgm.isPlaying) {
          bgm.start();
          bgmResumeOnContinue = true;
        }
        saveAudioPrefs();
      });

      dom.bgmOpenListBtn.addEventListener('click', () => {
        renderBgmPlaylistItems();
        dom.bgmPlaylistModal.hidden = false;
      });

      dom.closeBgmModalBtn.addEventListener('click', () => {
        dom.bgmPlaylistModal.hidden = true;
      });

      dom.bgmPlaylistModal.addEventListener('click', (e) => {
        if (e.target === dom.bgmPlaylistModal) dom.bgmPlaylistModal.hidden = true;
      });

      dom.bgmVolSlider.addEventListener('input', () => {
        const vol = Number(dom.bgmVolSlider.value) / 100;
        bgm.setVolume(vol);
        saveAudioPrefs();
      });
    }

    // Plan Drawer Controls
    dom.openPlanDrawerBtn.addEventListener('click', () => {
      renderTimelineDrawer();
      populateCustomizerDrawer();
      dom.planDrawer.hidden = false;
    });

    dom.closePlanDrawerBtn.addEventListener('click', () => {
      dom.planDrawer.hidden = true;
    });

    dom.planDrawer.addEventListener('click', (e) => {
      if (e.target === dom.planDrawer) dom.planDrawer.hidden = true;
    });

    document.querySelectorAll('.drawer-tab').forEach((tabBtn) => {
      tabBtn.addEventListener('click', () => {
        document.querySelectorAll('.drawer-tab').forEach((b) => b.classList.remove('active'));
        tabBtn.classList.add('active');
        const target = tabBtn.dataset.tab;
        document.getElementById('tabTimeline').hidden = target !== 'timeline';
        document.getElementById('tabCustomize').hidden = target !== 'customize';
        document.getElementById('tabJson').hidden = target !== 'json';
        if (target === 'json' && draftPlan) {
          syncDraftRoundsFromInputs();
          dom.rawJsonTextarea.value = JSON.stringify(draftPlan, null, 2);
        }
      });
    });

    dom.addRoundBtn.addEventListener('click', () => {
      syncDraftRoundsFromInputs();
      const last = draftPlan.rounds[draftPlan.rounds.length - 1] || DEFAULT_PLAN.rounds[0];
      draftPlan.rounds.push({
        round: draftPlan.rounds.length + 1,
        phaseLabel: 'Vòng bổ sung',
        enPhaseLabel: 'Extra Round',
        weights: structuredClone(last.weights),
        endRoundRestSec: 35
      });
      renderDraftRoundsEditor();
    });

    dom.removeRoundBtn.addEventListener('click', () => {
      if (draftPlan.rounds.length <= 1) return;
      syncDraftRoundsFromInputs();
      draftPlan.rounds.pop();
      renderDraftRoundsEditor();
    });

    dom.saveCustomPlanBtn.addEventListener('click', saveVisualCustomization);

    dom.resetDefaultPlanBtn.addEventListener('click', () => {
      applyAndPersistPlan(DEFAULT_PLAN, true);
      dom.planDrawer.hidden = true;
    });

    dom.resetJsonDefaultBtn.addEventListener('click', () => {
      applyAndPersistPlan(DEFAULT_PLAN, true);
      dom.planDrawer.hidden = true;
    });

    dom.applyRawJsonBtn.addEventListener('click', () => {
      try {
        const parsed = JSON.parse(dom.rawJsonTextarea.value);
        if (!parsed.exercises || !Array.isArray(parsed.rounds) || parsed.rounds.length === 0) {
          throw new Error('JSON cần có trường "exercises" và mảng "rounds" ít nhất 1 vòng.');
        }
        dom.jsonErrorMsg.hidden = true;
        applyAndPersistPlan(parsed, false);
        dom.planDrawer.hidden = true;
      } catch (err) {
        dom.jsonErrorMsg.hidden = false;
        dom.jsonErrorMsg.textContent = `Lỗi cú pháp JSON: ${err.message}`;
      }
    });
  }

  function registerGymServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(() => {});
      });
    }
  }

  // Boot!
  loadAudioPrefs();
  bindEvents();
  initPlanData();
  registerGymServiceWorker();
})();
