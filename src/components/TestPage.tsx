// ============================================================
// TestPage — Ruang Newton
// Kuis bertingkat AF1–AF5 dengan timer, progress, dan localStorage
// ============================================================
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, CheckCircle2, XCircle, AlertTriangle,
  RotateCcw, BookOpen, Trophy, Lock, CheckCheck, Clock, LogOut,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { questions, STAGES } from '../data/questions';
import { saveTestResult } from '../lib/supabase';
import type { TestResult } from '../types';

// ── Durasi per stage (detik) ───────────────────────────────
const STAGE_DURATION: Record<number, number> = {
  1: 15 * 60, // AF1: 15 menit
  2: 20 * 60, // AF2: 20 menit
  3: 20 * 60, // AF3: 20 menit
  4: 20 * 60, // AF4: 20 menit
  5: 20 * 60, // AF5: 20 menit
};

const PASS_SCORE = 70;

// ── localStorage helpers ───────────────────────────────────
const LS_KEY = 'ruang_newton_progress';

interface ProgressData {
  passedStages: number[]; // stage levels yg sudah lulus
  currentStageIndex: number; // index stage yg sedang dikerjakan
}

function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw) as ProgressData;
  } catch { /* ignore */ }
  return { passedStages: [], currentStageIndex: 0 };
}

function saveProgress(data: ProgressData) {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

// ── Format waktu ───────────────────────────────────────────
function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// ── Komponen Score Bar ─────────────────────────────────────
function ScoreBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-3 mt-1">
      <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full ${score >= PASS_SCORE ? 'bg-gradient-to-r from-green-400 to-teal-400' : 'bg-gradient-to-r from-red-400 to-rose-400'}`}
        />
      </div>
      <span className={`text-sm font-bold min-w-[40px] text-right ${score >= PASS_SCORE ? 'text-green-600' : 'text-red-500'}`}>
        {score}
      </span>
    </div>
  );
}

export default function TestPage() {
  const { state, navigate, dispatch } = useApp();

  // Progress dari localStorage
  const [progress, setProgress] = useState<ProgressData>(loadProgress);
  const [currentStageIndex, setCurrentStageIndex] = useState(progress.currentStageIndex);

  // Quiz state
  const [quizStatus, setQuizStatus] = useState<'intro' | 'playing' | 'result' | 'saving'>('intro');
  const [stageQuestions, setStageQuestions] = useState<typeof questions>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [lastResult, setLastResult] = useState<{ score: number; passed: boolean } | null>(null);

  const currentStage = STAGES[currentStageIndex];

  // Init questions saat stage/status berubah
  useEffect(() => {
    if (quizStatus === 'intro' && currentStage) {
      const qs = questions.filter(q => q.stage === currentStage.level);
      setStageQuestions(qs);
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedOption(null);
      setIsAnswerCorrect(null);
      setTimeLeft(STAGE_DURATION[currentStage.level] ?? 20 * 60);
    }
  }, [currentStage, quizStatus]);

  // Fungsi selesai stage
  const handleFinishStage = useCallback(async (finalScore: number) => {
    setQuizStatus('saving');
    const passed = finalScore >= PASS_SCORE;
    setLastResult({ score: finalScore, passed });

    // Simpan progress ke localStorage
    const newProgress: ProgressData = {
      passedStages: passed
        ? [...new Set([...progress.passedStages, currentStage.level])]
        : progress.passedStages,
      currentStageIndex: passed
        ? Math.min(currentStageIndex + 1, STAGES.length - 1)
        : currentStageIndex,
    };
    setProgress(newProgress);
    saveProgress(newProgress);

    // Simpan ke Supabase dengan timeout 20 detik
    if (state.user?.id) {
      try {
        const resultData = {
          user_id: state.user!.id,
          af_level: `AF${currentStage.level}`,
          score: finalScore,
          passed: finalScore >= PASS_SCORE,
        };

        const savePromise = saveTestResult(resultData);
        const timeoutPromise = new Promise<{data: any, error: any}>((_, reject) =>
          setTimeout(() => reject(new Error('Timeout saving result')), 20000)
        );
        
        const { data, error } = await Promise.race([savePromise, timeoutPromise]);
        
        if (error) {
          console.error('Supabase save error:', error);
          alert('Gagal menyimpan hasil kuis ke database: ' + (error.message || 'Unknown error'));
        } else if (data && data.length > 0) {
          dispatch({ type: 'ADD_RESULT', payload: data[0] as TestResult });
        }
      } catch (err: any) {
        console.error('Failed to save test result or timeout:', err);
        alert('Gagal menyimpan hasil kuis (Timeout/Network): ' + (err?.message || ''));
      }
    }

    setQuizStatus('result');
  }, [progress, currentStage, currentStageIndex, state.user, dispatch]);

  // ── Auto-save on Unmount ───────────────────────────────
  const stateRef = useRef({ quizStatus, currentStage, score, user: state.user });
  useEffect(() => {
    stateRef.current = { quizStatus, currentStage, score, user: state.user };
  }, [quizStatus, currentStage, score, state.user]);

  useEffect(() => {
    return () => {
      const { quizStatus: status, currentStage: stage, score: currentScore, user: currentUser } = stateRef.current;
      if (status === 'playing' && currentUser?.id) {
        saveTestResult({
          user_id: currentUser.id,
          af_level: `AF${stage.level}`,
          score: Math.round(currentScore),
          passed: Math.round(currentScore) >= PASS_SCORE
        });
      }
    };
  }, []);

  // Timer
  useEffect(() => {
    let timer: number;
    if (quizStatus === 'playing' && timeLeft > 0) {
      timer = window.setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && quizStatus === 'playing') {
      handleFinishStage(Math.round(score));
    }
    return () => clearInterval(timer);
  }, [quizStatus, timeLeft, score, handleFinishStage]);

  const handleStart = () => setQuizStatus('playing');

  const handleAnswer = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    const correct = index === stageQuestions[currentQuestionIndex].correctIndex;
    setIsAnswerCorrect(correct);

    const pointsPerQuestion = 100 / stageQuestions.length;
    const newScore = correct ? score + pointsPerQuestion : score;
    if (correct) setScore(newScore);

    setTimeout(() => {
      if (currentQuestionIndex < stageQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsAnswerCorrect(null);
      } else {
        handleFinishStage(Math.round(correct ? newScore : score));
      }
    }, 2000);
  };

  // ── Stage Selector (Intro) ──────────────────────────────
  if (quizStatus === 'intro') {
    const savedProgress = loadProgress();

    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 font-heading mb-3">Kuis Hukum Newton</h1>
          <p className="text-slate-500 text-lg">Pilih tahap yang ingin kamu kerjakan. Nilai lulus minimal <strong className="text-teal-600">70</strong>.</p>
        </motion.div>

        {/* Stage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
          {STAGES.map((stage, i) => {
            const isPassed = savedProgress.passedStages.includes(stage.level);
            const isLocked = !isPassed && i > 0 && !savedProgress.passedStages.includes(STAGES[i - 1].level);
            const isActive = currentStageIndex === i;

            return (
              <motion.button
                key={stage.level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => {
                  if (!isLocked) setCurrentStageIndex(i);
                }}
                disabled={isLocked}
                className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 font-heading cursor-pointer ${
                  isLocked
                    ? 'border-slate-200 bg-slate-50 text-slate-300 cursor-not-allowed'
                    : isPassed
                    ? 'border-green-400 bg-green-50 text-green-700'
                    : isActive
                    ? 'border-teal-400 bg-teal-50 text-teal-700 shadow-lg shadow-teal-400/20'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-teal-400 hover:shadow-md'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-black ${
                  isLocked ? 'bg-slate-200' : isPassed ? 'bg-green-500/20' : 'bg-teal-400/20'
                }`}>
                  {isLocked ? <Lock size={20} /> : isPassed ? <CheckCheck size={22} className="text-green-600" /> : <span>{stage.level}</span>}
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold uppercase tracking-wider">AF{stage.level}</div>
                  <div className="text-[11px] mt-0.5 font-medium">{stage.label}</div>
                  <div className="text-[10px] mt-1 opacity-70">{STAGE_DURATION[stage.level] / 60} mnt</div>
                </div>
                {isPassed && (
                  <span className="text-[10px] bg-green-500 text-white rounded-full px-2 py-0.5 font-bold">LULUS</span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Info card stage terpilih */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 md:p-10 shadow-xl text-center">
          <div className="inline-flex p-4 bg-teal-400/10 text-teal-500 rounded-full mb-6">
            <AlertTriangle size={44} />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-3 font-heading">
            AF{currentStage.level}: {currentStage.label}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
            <span className="bg-teal-50 text-teal-600 border border-teal-200 px-4 py-2 rounded-full font-semibold">10 Soal</span>
            <span className="bg-blue-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-full font-semibold">
              Waktu: {STAGE_DURATION[currentStage.level] / 60} menit
            </span>
            <span className="bg-green-50 text-green-600 border border-green-200 px-4 py-2 rounded-full font-semibold">Lulus jika ≥ {PASS_SCORE}</span>
          </div>
          <button
            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-teal-400 hover:bg-teal-300 text-slate-900 font-bold rounded-xl shadow-lg shadow-teal-400/30 transition-all text-lg"
            onClick={handleStart}
          >
            <Trophy size={22} />
            Mulai Kuis
          </button>
        </motion.div>
      </div>
    );
  }

  // ── Saving ─────────────────────────────────────────────
  if (quizStatus === 'saving') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="text-teal-500 animate-spin"><RotateCcw size={48} /></div>
        <p className="text-slate-500 font-medium text-lg">Menyimpan hasil...</p>
      </div>
    );
  }

  // ── Result ─────────────────────────────────────────────
  if (quizStatus === 'result' && lastResult) {
    const { score: finalScore, passed: isPassed } = lastResult;

    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-12 md:py-20 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xl">
          <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-8 ${
            isPassed ? 'bg-green-500/10 text-green-500 shadow-[0_0_40px_rgba(34,197,94,0.2)]'
                     : 'bg-red-500/10 text-red-500 shadow-[0_0_40px_rgba(239,68,68,0.2)]'
          }`}>
            {isPassed ? <CheckCircle2 size={72} /> : <XCircle size={72} />}
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-2 font-heading">
            Skor Anda: {finalScore}
          </h2>
          <ScoreBar score={finalScore} />

          {isPassed ? (
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-green-500 mb-3">LULUS!</h3>
              <p className="text-slate-500 mb-8 text-lg">
                Luar biasa! Anda telah menguasai materi <strong>{currentStage.label}</strong>. Status lulus tersimpan otomatis.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                {currentStageIndex < STAGES.length - 1 ? (
                  <button
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-400 hover:bg-teal-300 text-slate-900 font-bold rounded-xl shadow-lg shadow-teal-400/30 transition-all"
                    onClick={() => {
                      setCurrentStageIndex(prev => prev + 1);
                      setQuizStatus('intro');
                      setLastResult(null);
                    }}
                  >
                    Lanjut ke AF{currentStage.level + 1} <ArrowRight size={20} />
                  </button>
                ) : (
                  <button
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-400 hover:bg-teal-300 text-slate-900 font-bold rounded-xl shadow-lg shadow-teal-400/30 transition-all"
                    onClick={() => navigate('result')}
                  >
                    Lihat Semua Hasil <Trophy size={20} />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-red-500 mb-3">BELUM LULUS</h3>
              <p className="text-slate-500 mb-8 text-lg">
                Nilai minimum {PASS_SCORE}. Pelajari kembali materi <strong>{currentStage.label}</strong> lalu coba lagi.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-all"
                  onClick={() => { setQuizStatus('intro'); setLastResult(null); }}
                >
                  <RotateCcw size={18} /> Coba Lagi
                </button>
                <button
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-400 hover:bg-teal-300 text-slate-900 font-bold rounded-xl shadow-lg shadow-teal-400/30 transition-all"
                  onClick={() => navigate('modul')}
                >
                  <BookOpen size={18} /> Kembali ke Materi
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  // ── Playing State ───────────────────────────────────────
  const q = stageQuestions[currentQuestionIndex];
  const totalQ = stageQuestions.length;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <span className="bg-teal-50 text-teal-700 px-4 py-2 rounded-xl font-bold font-heading">
          Soal {currentQuestionIndex + 1}/{totalQ}
        </span>
        <div className="flex gap-3">
          <button
            onClick={() => handleFinishStage(Math.round(score))}
            className="px-4 py-2 rounded-xl font-bold font-medium flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
            title="Keluar dan Simpan"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Keluar</span>
          </button>
          <span className={`px-4 py-2 rounded-xl font-bold font-mono flex items-center gap-2 ${
            timeLeft <= 60 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-700'
          }`}>
            <Clock size={18} />
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-slate-200 rounded-full mb-8 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestionIndex) / totalQ) * 100}%` }}
          className="h-full bg-teal-400 rounded-full"
        />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 md:p-10 shadow-xl"
        >
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 leading-relaxed font-heading whitespace-pre-line">
            {q.text}
          </h2>

          <div className="flex flex-col gap-4">
            {q.options.map((opt, idx) => {
              let cls = 'flex justify-between items-center p-4 md:p-5 rounded-2xl border text-left transition-all duration-200 font-medium w-full cursor-pointer ';
              if (selectedOption === null) {
                cls += 'border-slate-200 bg-slate-50 text-slate-700 hover:border-teal-400 hover:shadow-md hover:-translate-y-0.5';
              } else {
                cls += 'cursor-default ';
                if (idx === q.correctIndex) cls += 'bg-green-500/10 border-green-500 text-green-700';
                else if (idx === selectedOption) cls += 'bg-red-500/10 border-red-500 text-red-600';
                else cls += 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
              }

              return (
                <motion.button
                  key={idx}
                  whileTap={selectedOption === null ? { scale: 0.98 } : {}}
                  className={cls}
                  onClick={() => handleAnswer(idx)}
                  disabled={selectedOption !== null}
                >
                  <span className="text-base md:text-lg text-left">{opt}</span>
                  {selectedOption !== null && idx === q.correctIndex && <CheckCircle2 size={22} className="text-green-500 shrink-0" />}
                  {selectedOption === idx && idx !== q.correctIndex && <XCircle size={22} className="text-red-500 shrink-0" />}
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {selectedOption !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: '1.5rem' }}
                className={`p-5 rounded-2xl border overflow-hidden ${
                  isAnswerCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
                }`}
              >
                <strong className={`block mb-2 text-lg ${isAnswerCorrect ? 'text-green-700' : 'text-red-600'}`}>
                  {isAnswerCorrect ? 'Jawaban Benar!' : 'Jawaban Salah!'}
                </strong>
                <p className="text-slate-600 leading-relaxed">{q.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
