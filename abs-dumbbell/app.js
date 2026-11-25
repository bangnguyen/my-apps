(() => {
  'use strict';

  const STORAGE_PLAN_KEY = 'abs_dumbbell_10kg_plan_v1';
  const STORAGE_PREFS_KEY = 'abs_dumbbell_10kg_prefs_v1';

  // Embedded fallback identical to ./workout-plan.json for instant offline boot
  const DEFAULT_PLAN = {
    id: 'core-dumbbell-10kg-v1',
    title: 'Core & Dumbbell 10kg Coach',
    goal: 'Luân phiên Tạ tay 10kg đốt calo toàn thân và cô lập cơ bụng giúp giữ nhịp tim cao & ngủ sâu giấc',
    defaultRounds: 5,
    roundPresets: [3, 5],
    endRoundRestSec: 40,
    warmup: {
      title: 'Khởi động & Đánh thức Core',
      enTitle: 'Joint Mobility & Core Wake-up',
      durationSec: 180,
      segments: [
        {
          fromSec: 0,
          toSec: 60,
          cue: 'Xoay eo rộng, xoay khớp vai, hông và cổ tay làm nóng toàn thân',
          voiceCue: 'Xoay eo, xoay khớp vai, hông và cổ tay đều nhịp.'
        },
        {
          fromSec: 60,
          toSec: 150,
          cue: 'Gập người chạm mũi chân luân phiên & nâng gối kích hoạt nhịp tim',
          voiceCue: 'Chuyển sang gập người chạm mũi chân luân phiên để kéo giãn gân kheo và làm ấm lưng.'
        },
        {
          fromSec: 150,
          toSec: 180,
          cue: 'Plank tĩnh 30 giây — gồng chặt cơ bụng, giữ thẳng lưng và hít thở đều',
          voiceCue: '30 giây cuối khởi động: vào tư thế Plank tĩnh, siết chặt cơ bụng đánh thức Core.'
        }
      ]
    },
    cooldown: {
      title: 'Hạ nhiệt & Giãn cơ bụng lưng',
      enTitle: 'Cool-down & Core Stretch',
      durationSec: 180,
      segments: [
        {
          fromSec: 0,
          toSec: 60,
          cue: 'Tư thế rắn hổ mang (Cobra Stretch) — chống tay đẩy ngực kéo giãn sâu cơ bụng',
          voiceCue: 'Vào tư thế rắn hổ mang, đẩy nhẹ ngực lên để giãn toàn bộ cơ bụng và thở chậm.'
        },
        {
          fromSec: 60,
          toSec: 120,
          cue: "Tư thế em bé (Child's Pose) — ngồi lùi về gót chân, thả lỏng hoàn toàn lưng dưới",
          voiceCue: 'Chuyển sang tư thế em bé, vươn dài hai tay phía trước để thả lỏng lưng dưới.'
        },
        {
          fromSec: 120,
          toSec: 180,
          cue: 'Hít sâu bằng mũi 4 giây — thở chậm 6 giây hạ nhịp tim chuẩn bị giấc ngủ sâu',
          voiceCue: 'Phút cuối hạ nhiệt: nằm thả lỏng, hít sâu bằng mũi và thở ra thật chậm.'
        }
      ]
    },
    exercises: {
      goblet_thruster: {
        id: 'goblet_thruster',
        name: 'Goblet Squat & Đẩy vai',
        enName: 'Dumbbell Thruster 10kg',
        shortVoice: 'Goblet Squat đẩy vai với tạ 10 cân',
        equipment: 'Tạ tay 10 kg (2 tay)',
        weightKg: 10,
        reps: 12,
        secPerRep: 3,
        restAfterSec: 25,
        tempoLabels: ['Ngồi xổm', 'Bật đứng', 'Đẩy vai'],
        formTip: 'Ôm tạ 10kg sát ngực, ngồi xổm sâu giữ thẳng lưng rồi bật đứng đẩy thẳng tạ qua đầu, thở mạnh khi đẩy.'
      },
      ab_crunch: {
        id: 'ab_crunch',
        name: 'Gập bụng chuẩn',
        enName: 'Standard Ab Crunch',
        shortVoice: 'gập bụng chuẩn trên dụng cụ tập bụng',
        equipment: 'Dụng cụ tập bụng',
        weightKg: 0,
        reps: 15,
        secPerRep: 2,
        restAfterSec: 20,
        tempoLabels: ['Gập siết', 'Hạ chậm'],
        formTip: 'Siết chặt cơ bụng trên, thở ra mạnh khi nâng vai lên và không dùng tay kéo cổ.'
      },
      russian_twist: {
        id: 'russian_twist',
        name: 'Vặn sườn Nga 10kg',
        enName: 'Dumbbell Russian Twist',
        shortVoice: 'vặn sườn với tạ 10 cân',
        equipment: 'Tạ tay 10 kg • 8 nhịp/bên',
        weightKg: 10,
        reps: 16,
        secPerRep: 2,
        restAfterSec: 25,
        alternatingSides: true,
        tempoLabels: ['Xoay siết', 'Đổi bên'],
        formTip: 'Ngồi ngả lưng 45 độ, ôm tạ 10kg xoay sâu đều sang hai bên trái - phải để siết chặt cơ liên sườn.'
      },
      leg_raise: {
        id: 'leg_raise',
        name: 'Nâng chân bụng dưới',
        enName: 'Controlled Leg Raise',
        shortVoice: 'nâng chân tập bụng dưới',
        equipment: 'Sàn / Ghế tập bụng',
        weightKg: 0,
        reps: 12,
        secPerRep: 3,
        restAfterSec: 20,
        tempoLabels: ['Nâng lên', 'Siết bụng', 'Hạ chậm'],
        formTip: 'Ép sát lưng dưới xuống sàn hoặc ghế, nâng hạ hai chân có kiểm soát không để võng lưng.'
      },
      single_arm_row: {
        id: 'single_arm_row',
        name: 'Chèo tạ 1 tay Plank',
        enName: 'Single-Arm Dumbbell Row',
        shortVoice: 'chèo tạ 1 tay 10 cân',
        equipment: 'Tạ tay 10 kg • Đổi tay nhịp 8',
        weightKg: 10,
        reps: 16,
        secPerRep: 2.5,
        restAfterSec: 25,
        switchSideAtRep: 8,
        tempoLabels: ['Kéo sát hông', 'Hạ kiểm soát'],
        formTip: 'Chống một tay trên ghế hoặc tư thế Plank, kéo tạ 10kg sát hông giữ cứng cơ bụng chống xoay người. Đổi tay tại nhịp 8.'
      },
      weighted_crunch: {
        id: 'weighted_crunch',
        name: 'Gập bụng giữ tạ 10kg',
        enName: 'Weighted Crunch / Toe Reach',
        shortVoice: 'gập bụng giữ tạ 10 cân',
        equipment: 'Tạ tay 10 kg • Sàn',
        weightKg: 10,
        reps: 12,
        secPerRep: 3,
        restAfterSec: 40,
        tempoLabels: ['Đẩy lên trần', 'Siết đỉnh', 'Hạ chậm'],
        formTip: 'Hai tay ôm tạ 10kg đẩy thẳng hướng lên trần nhà theo nhịp gập bụng, giữ vai tách khỏi sàn 1 nhịp rồi hạ chậm.'
      }
    },
    exerciseOrder: [
      'goblet_thruster',
      'ab_crunch',
      'russian_twist',
      'leg_raise',
      'single_arm_row',
      'weighted_crunch'
    ],
    roundLabels: [
      { phaseLabel: 'Khởi tốc Core', enPhaseLabel: 'Core Ignition' },
      { phaseLabel: 'Đẩy nhịp Cardio', enPhaseLabel: 'Cardio Drive' },
      { phaseLabel: 'Siết sâu trung tâm', enPhaseLabel: 'Deep Core Burn' },
      { phaseLabel: 'Đỉnh sức bền', enPhaseLabel: 'Peak Endurance' },
      { phaseLabel: 'Bứt phá về đích', enPhaseLabel: 'Final Burnout' }
    ]
  };

  // =========================================================================
  // 1. WEB AUDIO SYNTHESIZER: Warm Woodblock (330Hz - 420Hz) & Station Chimes
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
      const buffer = ctx.createBuffer(1, 1, 22050);
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.connect(ctx.destination);
      try {
        src.start(0);
      } catch (_) {}
    }

    /**
     * Warm Woodblock Resonator (330Hz - 420Hz)
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

      let startFreq = 416;
      let endFreq = 360;
      let peakGain = 0.42;
      let decaySec = 0.095;

      if (mode === 'rep_sub') {
        startFreq = 345;
        endFreq = 330;
        peakGain = 0.21;
        decaySec = 0.08;
      } else if (mode === 'rest_tick') {
        startFreq = 354;
        endFreq = 332;
        peakGain = 0.08;
        decaySec = 0.07;
      }

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.045);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(startFreq * 1.42, now);
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
     * Distinct warm double-knock for mid-set Switch Hand cue
     */
    playSwitchCue() {
      const ctx = this.ensureContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [440, 554.37].forEach((freq, idx) => {
        const start = now + idx * 0.09;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.linearRampToValueAtTime(0.32, start + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.18);
      });
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

      const freq = secondsLeft === 1 ? 587.33 : 523.25;
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
     * 0s Station Transition Chime
     * @param {'work' | 'rest' | 'finish'} targetType
     */
    playTransitionChime(targetType = 'work') {
      const ctx = this.ensureContext();
      if (!ctx) return;

      const notes =
        targetType === 'finish'
          ? [523.25, 659.25, 783.99, 1046.5]
          : targetType === 'work'
          ? [440.0, 587.33]
          : [587.33, 440.0];

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
      this.mode = 'checking';

      if (this.supported) {
        this.refreshVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = () => this.refreshVoices();
        }
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
        if (this.mode === 'checking') {
          this.mode = 'vi';
          this.notifyStatus();
        }
        return;
      }

      const viCandidates = voices.filter((v) =>
        (v.lang || '').toLowerCase().startsWith('vi')
      );
      this.viVoice = viCandidates.find((v) => v.localService) || viCandidates[0] || null;

      const enCandidates = voices.filter((v) =>
        (v.lang || '').toLowerCase().startsWith('en')
      );
      this.enVoice = enCandidates.find((v) => v.localService) || enCandidates[0] || null;

      if (this.viVoice) {
        this.mode = 'vi';
      } else if (this.enVoice) {
        this.mode = 'en';
      } else {
        this.mode = 'vi';
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
      if (!this.supported || this.mode === 'chime') return;

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
        utter.onerror = () => {
          this.soundEngine.playTransitionChime('work');
        };

        window.speechSynthesis.speak(utter);
      } catch (_) {
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
  // 3. TIMELINE COMPILER (Supports 3 or 5 Rounds & Fractional secPerRep 2.5s)
  // =========================================================================
  function getRoundMeta(plan, roundNum, totalRounds) {
    const labels = Array.isArray(plan.roundLabels) ? plan.roundLabels : [];
    if (roundNum === totalRounds && totalRounds > 1) {
      return { phaseLabel: 'Bứt phá về đích', enPhaseLabel: 'Final Burnout' };
    }
    return (
      labels[roundNum - 1] || {
        phaseLabel: `Vòng ${roundNum}`,
        enPhaseLabel: `Round ${roundNum}`
      }
    );
  }

  function compileTimeline(plan, activeRoundsCount) {
    const steps = [];
    const totalRounds = Math.max(1, Number(activeRoundsCount || plan.defaultRounds || 5));
    const order = Array.isArray(plan.exerciseOrder)
      ? plan.exerciseOrder
      : Object.keys(plan.exercises || {});

    const firstEx = plan.exercises[order[0]];

    // Phase 1: Warm-up (3 min / 180s)
    if ((plan.warmup?.durationSec || 0) > 0) {
      const warmMin = Math.round(plan.warmup.durationSec / 60);
      steps.push({
        index: steps.length,
        type: 'warmup',
        title: plan.warmup.title || 'Khởi động & Đánh thức Core',
        enTitle: plan.warmup.enTitle || 'Joint Mobility & Core Wake-up',
        durationSec: Number(plan.warmup.durationSec),
        segments: plan.warmup.segments || [],
        round: 0,
        totalRounds,
        nextExerciseName: firstEx ? `Vòng 1 • ${firstEx.name}` : 'Vòng 1',
        nextExerciseMeta: firstEx
          ? `${firstEx.reps} nhịp × ${firstEx.secPerRep}s • ${firstEx.equipment}`
          : '',
        nextWeightKg: firstEx ? Number(firstEx.weightKg || 0) : 10,
        nextEquipment: firstEx ? firstEx.equipment : 'Tạ tay 10 kg',
        viVoice: `Bắt đầu ${warmMin} phút khởi động xoay eo, gập chạm mũi chân và Plank tĩnh đánh thức cơ bụng.`,
        enVoice: `Start ${warmMin} minutes warm up and core activation.`
      });
    }

    // Phase 2: Main Circuit (3 or 5 Rounds × 6 Stations)
    for (let rIdx = 0; rIdx < totalRounds; rIdx++) {
      const roundNum = rIdx + 1;
      const isLastRound = roundNum === totalRounds;
      const rMeta = getRoundMeta(plan, roundNum, totalRounds);

      order.forEach((exId, exIdx) => {
        const ex = plan.exercises[exId];
        if (!ex) return;

        const isLastExInRound = exIdx === order.length - 1;
        const weightKg = Number(ex.weightKg || 0);
        const reps = Math.max(1, Number(ex.reps || 12));
        const secPerRep = Math.max(0.5, Number(ex.secPerRep || 2.5));
        const workDuration = Math.round(reps * secPerRep * 10) / 10;

        let nextExId = order[exIdx + 1];
        let nextIsNewRound = false;
        if (isLastExInRound) {
          nextIsNewRound = !isLastRound;
          nextExId = !isLastRound ? order[0] : null;
        }
        const nextEx = nextExId ? plan.exercises[nextExId] : null;
        const nextWeightKg = nextEx ? Number(nextEx.weightKg || 0) : null;

        const roundIntroVi = `Vòng ${roundNum}. `;
        const roundIntroEn = `Round ${roundNum}. `;
        const switchHintVi = ex.switchSideAtRep
          ? ` Đổi tay ở nhịp ${ex.switchSideAtRep}.`
          : '';
        const switchHintEn = ex.switchSideAtRep
          ? ` Switch hand at rep ${ex.switchSideAtRep}.`
          : '';

        steps.push({
          index: steps.length,
          type: 'work',
          exerciseId: exId,
          stationNum: exIdx + 1,
          totalStations: order.length,
          title: ex.name,
          enTitle: ex.enName,
          equipment: ex.equipment,
          weightKg,
          reps,
          secPerRep,
          durationSec: workDuration,
          tempoLabels: ex.tempoLabels || [],
          formTip: ex.formTip || '',
          switchSideAtRep: ex.switchSideAtRep ? Number(ex.switchSideAtRep) : null,
          alternatingSides: Boolean(ex.alternatingSides),
          round: roundNum,
          totalRounds,
          phaseLabel: rMeta.phaseLabel,
          nextExerciseName: nextEx
            ? `${nextIsNewRound ? `Vòng ${roundNum + 1} • ` : ''}${nextEx.name}`
            : plan.cooldown?.title || 'Hạ nhiệt & Giãn cơ',
          nextExerciseMeta: nextEx
            ? `${nextEx.reps} nhịp × ${nextEx.secPerRep}s • ${nextEx.equipment}`
            : 'Rắn hổ mang • Em bé • Thở sâu',
          nextWeightKg,
          nextEquipment: nextEx ? nextEx.equipment : 'Thảm / Sàn giãn cơ',
          viVoice: `${roundIntroVi}Bắt đầu ${ex.shortVoice || ex.name}, ${reps} nhịp.${switchHintVi}`,
          enVoice: `${roundIntroEn}Start ${ex.enName}, ${reps} reps.${switchHintEn}`
        });

        // Rest step (Last exercise of Last Round skips straight into Cool-down!)
        const restDuration = isLastExInRound
          ? isLastRound
            ? 0
            : Number(plan.endRoundRestSec ?? ex.restAfterSec ?? 40)
          : Number(ex.restAfterSec ?? 25);

        if (restDuration > 0 && nextEx) {
          const restVi = isLastExInRound
            ? `Hết vòng ${roundNum}. Nghỉ ${restDuration} giây, chuẩn bị vòng ${roundNum + 1}, ${nextEx.shortVoice || nextEx.name}.`
            : `Nghỉ ${restDuration} giây, chuẩn bị ${nextEx.shortVoice || nextEx.name}.`;

          const restEn = isLastExInRound
            ? `End of round ${roundNum}. Rest ${restDuration} seconds. Next round: ${nextEx.enName}.`
            : `Rest ${restDuration} seconds. Next up: ${nextEx.enName}.`;

          steps.push({
            index: steps.length,
            type: 'rest',
            isEndRoundRest: isLastExInRound,
            title: isLastExInRound
              ? `Nghỉ hết Vòng ${roundNum} → Vòng ${roundNum + 1}`
              : 'Nghỉ & Đổi tư thế',
            enTitle: 'Rest & Transition',
            durationSec: restDuration,
            round: roundNum,
            totalRounds,
            phaseLabel: rMeta.phaseLabel,
            nextExerciseName: `${isLastExInRound ? `Vòng ${roundNum + 1} • ` : ''}${nextEx.name}`,
            nextExerciseMeta: `${nextEx.reps} nhịp × ${nextEx.secPerRep}s • ${nextEx.equipment}`,
            nextWeightKg,
            nextEquipment: nextEx.equipment,
            formTip:
              nextWeightKg > 0
                ? `Hít thở sâu, cầm sẵn tạ tay ${nextWeightKg} kg và vào đúng tư thế cho bài tiếp theo.`
                : `Thả lỏng cơ bụng, vào tư thế trên ${nextEx.equipment} và hít sâu bằng mũi.`,
            viVoice: restVi,
            enVoice: restEn
          });
        }
      });
    }

    // Phase 3: Cool-down (3 min / 180s)
    if ((plan.cooldown?.durationSec || 0) > 0) {
      const coolMin = Math.round(plan.cooldown.durationSec / 60);
      steps.push({
        index: steps.length,
        type: 'cooldown',
        title: plan.cooldown.title || 'Hạ nhiệt & Giãn cơ bụng lưng',
        enTitle: plan.cooldown.enTitle || 'Cool-down & Core Stretch',
        durationSec: Number(plan.cooldown.durationSec),
        segments: plan.cooldown.segments || [],
        round: totalRounds,
        totalRounds,
        nextExerciseName: `Hoàn thành trọn vẹn ${totalRounds} vòng Core`,
        nextExerciseMeta: 'Thư giãn hệ thần kinh & ngủ sâu giấc',
        nextWeightKg: null,
        nextEquipment: 'Giãn cơ trên sàn',
        viVoice: `Tuyệt vời! Hoàn thành ${totalRounds} vòng chính. Bắt đầu ${coolMin} phút hạ nhiệt: vào tư thế rắn hổ mang giãn cơ bụng.`,
        enVoice: `All ${totalRounds} rounds complete! Start ${coolMin} minutes cool down with Cobra Stretch.`
      });
    }

    let accSec = 0;
    steps.forEach((s) => {
      s.startOffsetSec = accSec;
      accSec += s.durationSec;
    });

    return { steps, totalDurationSec: accSec, totalRounds };
  }

  function computeWorkoutTotals(plan, roundsCount) {
    let totalReps = 0;
    let totalVolumeKg = 0;
    const order = plan.exerciseOrder || Object.keys(plan.exercises || {});
    for (let r = 0; r < roundsCount; r++) {
      order.forEach((exId) => {
        const ex = plan.exercises?.[exId];
        if (!ex) return;
        const reps = Number(ex.reps || 0);
        const w = Number(ex.weightKg || 0);
        totalReps += reps;
        totalVolumeKg += reps * w;
      });
    }
    return { totalReps, totalVolumeKg };
  }

  // =========================================================================
  // 4. SCREEN WAKE LOCK MANAGER (iOS Safari 16.4+ & Android Chrome)
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
  // 5. APPLICATION CONTROLLER & SUB-SECOND DRIFT-FREE METRONOME ENGINE
  // =========================================================================
  const sound = new SoundEngine();
  let plan = structuredClone(DEFAULT_PLAN);
  let selectedRounds = plan.defaultRounds || 5;
  let compiled = compileTimeline(plan, selectedRounds);

  let currentStepIdx = 0;
  let isRunning = false;
  let hasStartedSession = false;
  let isFinished = false;
  let stepElapsedMs = 0;
  let lastTickPerfNow = 0;
  let lastProcessedWholeSec = -1;
  let lastProcessedBeatIdx = -1;
  let switchCueAnnounced = false;
  let loopTimerId = null;

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
    setupPanel: document.getElementById('setupPanel'),
    preset3Btn: document.getElementById('preset3Btn'),
    preset5Btn: document.getElementById('preset5Btn'),
    preset3Sub: document.getElementById('preset3Sub'),
    preset5Sub: document.getElementById('preset5Sub'),
    testAudioBtn: document.getElementById('testAudioBtn'),
    voiceEngineTag: document.getElementById('voiceEngineTag'),
    focalCard: document.getElementById('focalCard'),
    stationKicker: document.getElementById('stationKicker'),
    stationName: document.getElementById('stationName'),
    weightCallout: document.getElementById('weightCallout'),
    weightNum: document.getElementById('weightNum'),
    weightUnit: document.getElementById('weightUnit'),
    sideCueBanner: document.getElementById('sideCueBanner'),
    sideCueText: document.getElementById('sideCueText'),
    telemetryHero: document.getElementById('telemetryHero'),
    repBlock: document.getElementById('repBlock'),
    repCurrent: document.getElementById('repCurrent'),
    repTotal: document.getElementById('repTotal'),
    tempoDots: document.getElementById('tempoDots'),
    timerLabel: document.getElementById('timerLabel'),
    countdownDigits: document.getElementById('countdownDigits'),
    stepProgressFill: document.getElementById('stepProgressFill'),
    nextKicker: document.getElementById('nextKicker'),
    nextEquipBadge: document.getElementById('nextEquipBadge'),
    nextExName: document.getElementById('nextExName'),
    nextExMeta: document.getElementById('nextExMeta'),
    nextWeightGiant: document.getElementById('nextWeightGiant'),
    coachCue: document.getElementById('coachCue'),
    summaryCard: document.getElementById('summaryCard'),
    summaryHeadline: document.getElementById('summaryHeadline'),
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
    cfgRoundsCount: document.getElementById('cfgRoundsCount'),
    cfgWarmupSec: document.getElementById('cfgWarmupSec'),
    cfgCooldownSec: document.getElementById('cfgCooldownSec'),
    exerciseConfigList: document.getElementById('exerciseConfigList'),
    saveCustomPlanBtn: document.getElementById('saveCustomPlanBtn'),
    resetDefaultPlanBtn: document.getElementById('resetDefaultPlanBtn'),
    rawJsonTextarea: document.getElementById('rawJsonTextarea'),
    jsonErrorMsg: document.getElementById('jsonErrorMsg'),
    applyRawJsonBtn: document.getElementById('applyRawJsonBtn'),
    resetJsonDefaultBtn: document.getElementById('resetJsonDefaultBtn'),
    resetConfirmModal: document.getElementById('resetConfirmModal'),
    cancelResetBtn: document.getElementById('cancelResetBtn'),
    confirmResetBtn: document.getElementById('confirmResetBtn')
  };

  const voice = new VoiceCoach(sound, (mode, viVoice) => {
    if (mode === 'vi') {
      const vName = viVoice ? ` (${viVoice.name})` : '';
      dom.voiceEngineTag.textContent = `Giọng HLV: vi-VN${vName}`;
    } else if (mode === 'en') {
      dom.voiceEngineTag.textContent = 'Fallback: Giọng HLV EN (chưa cài vi-VN)';
    } else {
      dom.voiceEngineTag.textContent = 'Fallback: Chuông báo chuyển trạm';
    }
  });

  const wakeLock = new WakeLockManager((locked, status) => {
    dom.wakeBadge.classList.toggle('locked', locked);
    if (locked) {
      dom.wakeText.textContent = 'Đang giữ sáng MH';
    } else if (status === 'unsupported') {
      dom.wakeText.textContent = 'Đặt tự tắt MH > 5p';
    } else {
      dom.wakeText.textContent = 'Tự giữ sáng MH';
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
    return kg > 0 ? `${kg} KG` : 'BỤNG / SÀN';
  }

  function getSubBeatsForStep(step) {
    if (!step || step.type !== 'work') return { subBeatsPerRep: 1, beatIntervalMs: 1000 };
    const subBeatsPerRep = Number.isInteger(step.secPerRep)
      ? Math.max(1, step.secPerRep)
      : Math.max(2, step.tempoLabels?.length || 2);
    const beatIntervalMs = (step.secPerRep * 1000) / subBeatsPerRep;
    return { subBeatsPerRep, beatIntervalMs };
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
      }, 210);
    }
  }

  function updatePresetButtonsUI() {
    const c3 = compileTimeline(plan, 3);
    const c5 = compileTimeline(plan, 5);
    const stationCount = (plan.exerciseOrder || []).length;
    dom.preset3Sub.textContent = `${formatMMSS(c3.totalDurationSec)} • ${3 * stationCount} hiệp`;
    dom.preset5Sub.textContent = `${formatMMSS(c5.totalDurationSec)} • ${5 * stationCount} hiệp`;
    dom.preset3Btn.classList.toggle('active', selectedRounds === 3);
    dom.preset5Btn.classList.toggle('active', selectedRounds === 5);
  }

  function selectRoundsPreset(count) {
    selectedRounds = count;
    plan.defaultRounds = count;
    compiled = compileTimeline(plan, selectedRounds);
    saveAudioPrefs();
    resetWorkout();
  }

  function renderRoundStrip() {
    const activeStep = compiled.steps[currentStepIdx];
    const currentRound = activeStep ? activeStep.round : 0;
    const chips = [];

    for (let r = 1; r <= compiled.totalRounds; r++) {
      let cls = 'round-chip';
      if (isFinished || (currentRound > r && activeStep?.type !== 'warmup')) {
        cls += ' done';
      } else if (
        currentRound === r &&
        activeStep?.type !== 'warmup' &&
        activeStep?.type !== 'cooldown'
      ) {
        cls += ' current';
      }
      chips.push(
        `<button type="button" class="${cls}" data-jump-round="${r}" title="Nhảy tới Vòng ${r}">Vòng ${r}</button>`
      );
    }

    dom.roundStrip.innerHTML = chips.join('');
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
    updatePresetButtonsUI();

    if (isFinished) {
      dom.body.dataset.phase = 'done';
      dom.focalCard.hidden = true;
      dom.setupPanel.hidden = true;
      dom.summaryCard.hidden = false;
      dom.phasePill.textContent = 'HOÀN THÀNH • 100%';
      dom.roundSublabel.textContent = 'Chúc bạn buổi tối thư giãn & ngủ sâu giấc';
      dom.sessionProgressFill.style.width = '100%';
      dom.totalRemainingClock.textContent = '00:00';
      dom.playPauseIco.textContent = '↺';
      dom.playPauseTxt.textContent = 'TẬP LẠI';

      const totals = computeWorkoutTotals(plan, compiled.totalRounds);
      dom.summaryHeadline.textContent = `HOÀN THÀNH ${compiled.totalRounds} VÒNG XUẤT SẮC!`;
      dom.sumDuration.textContent = formatMMSS(compiled.totalDurationSec);
      dom.sumReps.textContent = String(totals.totalReps);
      dom.sumVolume.textContent = `${totals.totalVolumeKg.toLocaleString('vi-VN')} kg`;
      renderRoundStrip();
      return;
    }

    dom.focalCard.hidden = false;
    dom.summaryCard.hidden = true;
    dom.setupPanel.hidden = hasStartedSession;

    const step = compiled.steps[currentStepIdx];
    if (!step) return;

    const activePhase = !hasStartedSession ? 'ready' : step.type;
    dom.body.dataset.phase = activePhase;
    if (dom.metaTheme) {
      const themeHex =
        activePhase === 'work'
          ? '#170905'
          : activePhase === 'rest'
          ? '#05160E'
          : '#060A11';
      dom.metaTheme.setAttribute('content', themeHex);
    }

    const elapsedSecFloat = Math.min(step.durationSec, stepElapsedMs / 1000);
    const elapsedWhole = Math.floor(elapsedSecFloat);
    const remainingSec = Math.max(0, Math.ceil(step.durationSec - elapsedSecFloat));

    const globalElapsed = step.startOffsetSec + elapsedSecFloat;
    const globalPct =
      compiled.totalDurationSec > 0
        ? Math.min(100, (globalElapsed / compiled.totalDurationSec) * 100)
        : 0;
    dom.sessionProgressFill.style.width = `${globalPct.toFixed(2)}%`;
    dom.totalRemainingClock.textContent = formatMMSS(
      compiled.totalDurationSec - globalElapsed
    );

    const stepRemainPct =
      step.durationSec > 0
        ? Math.max(0, ((step.durationSec - elapsedSecFloat) / step.durationSec) * 100)
        : 0;
    dom.stepProgressFill.style.width = `${stepRemainPct.toFixed(1)}%`;

    if (isRunning) {
      dom.playPauseIco.textContent = '⏸';
      dom.playPauseTxt.textContent = 'TẠM DỪNG';
    } else {
      dom.playPauseIco.textContent = '▶';
      dom.playPauseTxt.textContent = hasStartedSession ? 'TIẾP TỤC' : 'BẮT ĐẦU';
    }

    dom.countdownDigits.classList.toggle(
      'final-three',
      isRunning && remainingSec <= 3 && remainingSec >= 1
    );

    if (step.type === 'work') {
      dom.phasePill.textContent = `VÒNG ${step.round}/${step.totalRounds} • ${step.phaseLabel}`;
      dom.roundSublabel.textContent = `Trạm ${step.stationNum}/${step.totalStations} • ${step.equipment}`;
      dom.stationKicker.textContent = `ĐANG TẬP • ${step.secPerRep} GIÂY / NHỊP`;
      dom.stationName.textContent = step.title;

      dom.weightCallout.hidden = false;
      if (step.weightKg > 0) {
        dom.weightNum.textContent = String(step.weightKg);
        dom.weightUnit.textContent = 'KG';
      } else {
        dom.weightNum.textContent = 'CORE';
        dom.weightUnit.textContent = '';
      }

      // Compute exact rep & sub-beat (works cleanly for 2s, 2.5s, 3s!)
      const { subBeatsPerRep, beatIntervalMs } = getSubBeatsForStep(step);
      const repDurationMs = step.secPerRep * 1000;
      const currentRep = Math.min(
        step.reps,
        Math.floor(stepElapsedMs / repDurationMs) + 1
      );
      const beatInRep =
        Math.floor(stepElapsedMs / beatIntervalMs) % subBeatsPerRep;

      // Side Cue Banner (Single-Arm Row switch at rep 8 / Russian Twist L-R)
      if (step.switchSideAtRep) {
        dom.sideCueBanner.hidden = false;
        dom.sideCueBanner.classList.remove('switch-alert', 'side-right');
        if (currentRep === step.switchSideAtRep) {
          dom.sideCueBanner.classList.add('switch-alert');
          dom.sideCueText.textContent = `⚡ NHỊP ${step.switchSideAtRep}/${step.reps} • ĐỔI TAY SANG BÊN KIA!`;
        } else if (currentRep > step.switchSideAtRep) {
          dom.sideCueBanner.classList.add('side-right');
          dom.sideCueText.textContent = `💪 TAY PHẢI (NHỊP ${step.switchSideAtRep + 1} – ${step.reps})`;
        } else {
          dom.sideCueText.textContent = `💪 TAY TRÁI (NHỊP 1 – ${step.switchSideAtRep})`;
        }
      } else if (step.alternatingSides) {
        dom.sideCueBanner.hidden = false;
        const isLeft = currentRep % 2 === 1;
        dom.sideCueBanner.classList.remove('switch-alert');
        dom.sideCueBanner.classList.toggle('side-right', !isLeft);
        dom.sideCueText.textContent = isLeft
          ? `⬅ XOAY BÊN TRÁI • 8 NHỊP MỖI BÊN`
          : `XOAY BÊN PHẢI ➡ • 8 NHỊP MỖI BÊN`;
      } else {
        dom.sideCueBanner.hidden = true;
      }

      dom.telemetryHero.classList.add('dual-mode');
      dom.repBlock.hidden = false;
      dom.repCurrent.textContent = String(currentRep).padStart(2, '0');
      dom.repTotal.textContent = String(step.reps).padStart(2, '0');

      const labels =
        step.tempoLabels && step.tempoLabels.length === subBeatsPerRep
          ? step.tempoLabels
          : Array.from({ length: subBeatsPerRep }, (_, i) => `Nhịp ${i + 1}`);

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
      dom.nextEquipBadge.hidden = !step.nextEquipment;
      dom.nextEquipBadge.textContent =
        step.nextWeightKg > 0 ? `🏋️ TẠ ${step.nextWeightKg} KG` : `🧘 ${step.nextEquipment}`;
      dom.nextEquipBadge.classList.toggle('bodyweight', !(step.nextWeightKg > 0));
      dom.coachCue.textContent = step.formTip;
    } else if (step.type === 'rest') {
      dom.phasePill.textContent = step.isEndRoundRest
        ? `NGHỈ HẾT VÒNG ${step.round} • CHUẨN BỊ VÒNG ${step.round + 1}`
        : `NGHỈ GIỮA TRẠM • VÒNG ${step.round}/${step.totalRounds}`;
      dom.roundSublabel.textContent = 'Hít thở sâu & đổi tư thế cho bài kế tiếp';
      dom.stationKicker.textContent = 'PHA NGHỈ & CHUẨN BỊ';
      dom.stationName.textContent = step.title;
      dom.weightCallout.hidden = true;
      dom.sideCueBanner.hidden = true;

      dom.telemetryHero.classList.remove('dual-mode');
      dom.repBlock.hidden = true;
      dom.timerLabel.textContent = 'THỜI GIAN NGHỈ';
      dom.countdownDigits.textContent = `${String(remainingSec).padStart(2, '0')}s`;

      dom.nextKicker.textContent = 'VÀO VỊ TRÍ BÀI TIẾP THEO';
      dom.nextExName.textContent = step.nextExerciseName;
      dom.nextExMeta.textContent = step.nextExerciseMeta;
      dom.nextWeightGiant.hidden = step.nextWeightKg === null;
      dom.nextWeightGiant.textContent = formatWeightBadge(step.nextWeightKg);
      dom.nextEquipBadge.hidden = false;
      dom.nextEquipBadge.textContent =
        step.nextWeightKg > 0 ? `🏋️ CẦM TẠ ${step.nextWeightKg} KG` : `🧘 KHÔNG TẠ • BỤNG`;
      dom.nextEquipBadge.classList.toggle('bodyweight', !(step.nextWeightKg > 0));
      dom.coachCue.textContent = step.formTip;
    } else {
      // Warm-up or Cool-down
      const isWarm = step.type === 'warmup';
      dom.phasePill.textContent = !hasStartedSession
        ? `SẴN SÀNG • ${compiled.totalRounds} VÒNG CORE & TẠ 10KG`
        : isWarm
        ? 'GIAI ĐOẠN 1/3 • KHỞI ĐỘNG CORE'
        : 'GIAI ĐOẠN 3/3 • HẠ NHIỆT & GIÃN CƠ';
      dom.roundSublabel.textContent = !hasStartedSession
        ? `Khởi động 3p • ${compiled.totalRounds} Vòng (6 trạm) • Hạ nhiệt 3p`
        : isWarm
        ? `Chuẩn bị vào ${step.totalRounds} vòng luân phiên Tạ 10kg & Bụng`
        : 'Cobra Stretch • Child’s Pose • Thở sâu ngủ ngon';
      dom.stationKicker.textContent = isWarm
        ? 'KHỞI ĐỘNG KHỚP & PLANK TĨNH 30S'
        : 'GIÃN CƠ BỤNG / LƯNG & PHỤC HỒI';
      dom.stationName.textContent = step.title;
      dom.weightCallout.hidden = true;
      dom.sideCueBanner.hidden = true;

      dom.telemetryHero.classList.remove('dual-mode');
      dom.repBlock.hidden = true;
      dom.timerLabel.textContent = 'ĐẾM NGƯỢC';
      dom.countdownDigits.textContent = formatMMSS(remainingSec);

      dom.nextKicker.textContent = isWarm ? 'TRẠM MỞ ĐẦU VÒNG 1' : 'ĐÍCH ĐẾN';
      dom.nextExName.textContent = step.nextExerciseName;
      dom.nextExMeta.textContent = step.nextExerciseMeta;
      dom.nextWeightGiant.hidden = step.nextWeightKg === null || step.nextWeightKg === undefined;
      if (!dom.nextWeightGiant.hidden) {
        dom.nextWeightGiant.textContent = formatWeightBadge(step.nextWeightKg);
      }
      dom.nextEquipBadge.hidden = !step.nextEquipment;
      dom.nextEquipBadge.textContent =
        step.nextWeightKg > 0 ? `🏋️ TẠ TAY ${step.nextWeightKg} KG` : `🧘 ${step.nextEquipment || 'THƯ GIÃN'}`;
      dom.nextEquipBadge.classList.toggle('bodyweight', !(step.nextWeightKg > 0));

      const seg =
        (step.segments || []).find(
          (sg) => elapsedWhole >= sg.fromSec && elapsedWhole < sg.toSec
        ) || (step.segments || [])[0];
      dom.coachCue.textContent = seg ? seg.cue : '';
    }

    renderRoundStrip();
  }

  /**
   * Sub-second beat processor for WORK steps (exact for 2s, 2.5s, 3s!)
   */
  function handleWorkBeats(step) {
    const remainingSec = step.durationSec - stepElapsedMs / 1000;
    const { subBeatsPerRep, beatIntervalMs } = getSubBeatsForStep(step);
    const beatIdx = Math.floor(stepElapsedMs / beatIntervalMs);

    if (beatIdx > lastProcessedBeatIdx) {
      lastProcessedBeatIdx = beatIdx;

      const repNum = Math.min(step.reps, Math.floor(beatIdx / subBeatsPerRep) + 1);
      const isPrimaryRepBeat = beatIdx % subBeatsPerRep === 0;

      // Switch-hand alert at rep 8/16 on Single-Arm Row
      if (
        step.switchSideAtRep &&
        repNum === step.switchSideAtRep &&
        isPrimaryRepBeat &&
        !switchCueAnnounced
      ) {
        switchCueAnnounced = true;
        sound.playSwitchCue();
        triggerVisualBeat(true);
        voice.speak('Nhịp 8, đổi tay!', 'Rep 8, switch hand!');
        return;
      }

      // Let 3-2-1 countdown beeps own the final 3 seconds cleanly
      if (remainingSec <= 3.05) return;

      if (isPrimaryRepBeat) {
        sound.playWoodblock('rep_accent');
        triggerVisualBeat(true);
      } else {
        sound.playWoodblock('rep_sub');
      }
    }
  }

  /**
   * Integer-second processor for 3-2-1 beeps, Rest/Warmup/Cooldown ticks & segment voice cues
   */
  function handleWholeSecondCues(step, elapsedSec) {
    const remaining = Math.ceil(step.durationSec - elapsedSec);

    if (remaining <= 3 && remaining >= 1) {
      sound.playCountdownBeep(remaining);
      return;
    }

    if (step.type === 'rest') {
      sound.playWoodblock('rest_tick');
    } else if (step.type === 'warmup' || step.type === 'cooldown') {
      sound.playWoodblock('rest_tick');
      if (elapsedSec > 0) {
        const newSeg = (step.segments || []).find((sg) => sg.fromSec === elapsedSec);
        if (newSeg) {
          voice.speak(newSeg.voiceCue || newSeg.cue, step.enTitle);
        }
      }
    }
  }

  function enterStep(idx, shouldAnnounce = true) {
    if (idx >= compiled.steps.length) {
      isRunning = false;
      isFinished = true;
      stopLoop();
      sound.playTransitionChime('finish');
      setTimeout(() => {
        voice.speak(
          `Chúc mừng bạn đã hoàn thành trọn vẹn ${compiled.totalRounds} vòng tập cơ bụng và tạ tay 10 cân! Hãy uống nước ấm và ngủ ngon giấc.`,
          `Workout complete! Great job finishing all ${compiled.totalRounds} rounds.`
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
    lastProcessedBeatIdx = -1;
    switchCueAnnounced = false;
    lastTickPerfNow = performance.now();

    const step = compiled.steps[currentStepIdx];
    if (shouldAnnounce && step) {
      sound.playTransitionChime(step.type === 'work' ? 'work' : 'rest');
      setTimeout(() => {
        if (isRunning && compiled.steps[currentStepIdx] === step) {
          voice.speak(step.viVoice, step.enVoice);
        }
      }, 240);

      lastProcessedWholeSec = 0;
      if (step.type === 'work') {
        lastProcessedBeatIdx = 0;
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

    if (step.type === 'work') {
      handleWorkBeats(step);
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
    loopTimerId = window.setInterval(tickLoop, 60);
  }

  function stopLoop() {
    if (loopTimerId !== null) {
      clearInterval(loopTimerId);
      loopTimerId = null;
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
      startLoop();

      if (firstBoot || lastProcessedWholeSec === -1) {
        enterStep(currentStepIdx, true);
      } else {
        renderCurrentState();
      }
    } else {
      isRunning = false;
      stopLoop();
      voice.stop();
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
      lastProcessedBeatIdx = -1;
      switchCueAnnounced = false;
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
    lastProcessedBeatIdx = -1;
    switchCueAnnounced = false;
    stopLoop();
    voice.stop();
    wakeLock.release();
    renderCurrentState();
  }

  // =========================================================================
  // 6. AUDIO PREFERENCES & DEMO TEST
  // =========================================================================
  function loadAudioPrefs() {
    try {
      const raw = localStorage.getItem(STORAGE_PREFS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed.voice === 'boolean') voice.enabled = parsed.voice;
        if (typeof parsed.tick === 'boolean') sound.tickEnabled = parsed.tick;
        if (typeof parsed.rounds === 'number' && parsed.rounds >= 1 && parsed.rounds <= 10) {
          selectedRounds = parsed.rounds;
        }
      }
    } catch (_) {}
    syncAudioToggleButtons();
  }

  function saveAudioPrefs() {
    try {
      localStorage.setItem(
        STORAGE_PREFS_KEY,
        JSON.stringify({
          voice: voice.enabled,
          tick: sound.tickEnabled,
          rounds: selectedRounds
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
        'Âm thanh sẵn sàng! Vòng 2. Bắt đầu vặn sườn với tạ 10 cân, 16 nhịp.',
        'Audio ready! Round 2. Start Dumbbell Russian Twist, 10 kilos, 16 reps.'
      );
      sound.tickEnabled = prevTick;
      voice.enabled = prevVoice;
      setTimeout(() => dom.testAudioBtn.classList.remove('playing'), 1900);
    }, 1380);
  }

  // =========================================================================
  // 7. PLAN LOADER & VISUAL / JSON CUSTOMIZER DRAWER
  // =========================================================================
  let draftPlan = null;

  async function initPlanData() {
    let canonical = structuredClone(DEFAULT_PLAN);
    try {
      const res = await fetch('./workout-plan.json', { cache: 'no-cache' });
      if (res.ok) {
        canonical = await res.json();
      }
    } catch (_) {}

    let activePlan = canonical;
    try {
      const saved = localStorage.getItem(STORAGE_PLAN_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.exercises && Array.isArray(parsed.exerciseOrder)) {
          activePlan = parsed;
        }
      }
    } catch (_) {}

    plan = activePlan;
    compiled = compileTimeline(plan, selectedRounds);
    renderCurrentState();
  }

  function renderTimelineDrawer() {
    const items = [];

    const warmIdx = compiled.steps.findIndex((s) => s.type === 'warmup');
    if (warmIdx >= 0) {
      const w = compiled.steps[warmIdx];
      items.push({
        stepIdx: warmIdx,
        title: `1. ${w.title}`,
        sub: `${formatMMSS(w.durationSec)} • Xoay eo, chạm mũi chân & Plank 30s`,
        active: currentStepIdx === warmIdx
      });
    }

    for (let r = 1; r <= compiled.totalRounds; r++) {
      const firstRoundStepIdx = compiled.steps.findIndex(
        (s) => s.type === 'work' && s.round === r
      );
      if (firstRoundStepIdx >= 0) {
        const meta = getRoundMeta(plan, r, compiled.totalRounds);
        const isCurr =
          compiled.steps[currentStepIdx]?.round === r &&
          compiled.steps[currentStepIdx]?.type !== 'warmup' &&
          compiled.steps[currentStepIdx]?.type !== 'cooldown';
        items.push({
          stepIdx: firstRoundStepIdx,
          title: `Vòng ${r}/${compiled.totalRounds} — ${meta.phaseLabel}`,
          sub: '6 trạm: Thruster 10kg • Crunch • Twist 10kg • Leg Raise • Row 10kg • Weighted Crunch',
          active: isCurr
        });
      }
    }

    const coolIdx = compiled.steps.findIndex((s) => s.type === 'cooldown');
    if (coolIdx >= 0) {
      const c = compiled.steps[coolIdx];
      items.push({
        stepIdx: coolIdx,
        title: `Hạ nhiệt & Giãn cơ bụng/lưng`,
        sub: `${formatMMSS(c.durationSec)} • Rắn hổ mang • Em bé • Thở sâu`,
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
          <span class="tl-jump">Nhảy tới →</span>
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
    dom.cfgRoundsCount.value = selectedRounds;
    dom.cfgWarmupSec.value = draftPlan.warmup?.durationSec ?? 180;
    dom.cfgCooldownSec.value = draftPlan.cooldown?.durationSec ?? 180;

    const order = draftPlan.exerciseOrder || Object.keys(draftPlan.exercises || {});
    dom.exerciseConfigList.innerHTML = order
      .map((exId, idx) => {
        const ex = draftPlan.exercises[exId];
        if (!ex) return '';
        return `
          <div class="exercise-cfg-card" data-ex-id="${exId}">
            <strong>${idx + 1}. ${ex.name} (${ex.equipment})</strong>
            <div class="field-grid-3">
              <label class="field-item">
                <span>Số nhịp</span>
                <input type="number" data-field="reps" min="1" max="100" step="1" value="${ex.reps}">
              </label>
              <label class="field-item">
                <span>Giây / nhịp</span>
                <input type="number" data-field="secPerRep" min="1" max="15" step="0.5" value="${ex.secPerRep}">
              </label>
              <label class="field-item">
                <span>Nghỉ sau (s)</span>
                <input type="number" data-field="restAfterSec" min="0" max="240" step="5" value="${ex.restAfterSec}">
              </label>
            </div>
          </div>`;
      })
      .join('');

    dom.rawJsonTextarea.value = JSON.stringify(draftPlan, null, 2);
    dom.jsonErrorMsg.hidden = true;
  }

  function syncDraftFromInputs() {
    if (!draftPlan) return;
    draftPlan.defaultRounds = Math.max(1, Math.min(10, Number(dom.cfgRoundsCount.value) || 5));
    draftPlan.warmup.durationSec = Math.max(0, Number(dom.cfgWarmupSec.value) || 0);
    draftPlan.cooldown.durationSec = Math.max(0, Number(dom.cfgCooldownSec.value) || 0);

    dom.exerciseConfigList.querySelectorAll('.exercise-cfg-card').forEach((card) => {
      const exId = card.dataset.exId;
      const ex = draftPlan.exercises[exId];
      if (!ex) return;
      ex.reps = Math.max(1, Number(card.querySelector('[data-field="reps"]').value) || 12);
      ex.secPerRep = Math.max(0.5, Number(card.querySelector('[data-field="secPerRep"]').value) || 2.5);
      ex.restAfterSec = Math.max(0, Number(card.querySelector('[data-field="restAfterSec"]').value) || 20);
    });

    const lastExId = draftPlan.exerciseOrder[draftPlan.exerciseOrder.length - 1];
    if (lastExId && draftPlan.exercises[lastExId]) {
      draftPlan.endRoundRestSec = draftPlan.exercises[lastExId].restAfterSec;
    }
  }

  function applyAndPersistPlan(newPlan, clearCustomStorage = false) {
    plan = structuredClone(newPlan);
    selectedRounds = Math.max(1, Math.min(10, Number(plan.defaultRounds || selectedRounds || 5)));
    compiled = compileTimeline(plan, selectedRounds);
    saveAudioPrefs();
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
    dom.preset3Btn.addEventListener('click', () => {
      sound.unlock();
      selectRoundsPreset(3);
    });

    dom.preset5Btn.addEventListener('click', () => {
      sound.unlock();
      selectRoundsPreset(5);
    });

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

    // Drawer Controls
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
          syncDraftFromInputs();
          dom.rawJsonTextarea.value = JSON.stringify(draftPlan, null, 2);
        }
      });
    });

    dom.saveCustomPlanBtn.addEventListener('click', () => {
      syncDraftFromInputs();
      applyAndPersistPlan(draftPlan, false);
      dom.planDrawer.hidden = true;
    });

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
        if (!parsed.exercises || !Array.isArray(parsed.exerciseOrder) || parsed.exerciseOrder.length === 0) {
          throw new Error('JSON cần có trường "exercises" và mảng "exerciseOrder" ít nhất 1 bài tập.');
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

  function registerAppServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(() => {});
      });
    }
  }

  loadAudioPrefs();
  bindEvents();
  initPlanData();
  registerAppServiceWorker();
})();
