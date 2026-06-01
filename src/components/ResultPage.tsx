// ============================================================
// ResultPage — Ruang Newton
// Menampilkan 1 card rata-rata + 5 card per AF
// ============================================================
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy, Target, TrendingUp, RefreshCw,
  CheckCircle2, XCircle, DatabaseBackup,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTestResults } from '../lib/supabase';
import type { TestResult } from '../types';

const PASS_SCORE = 70;

const AF_LABELS: Record<string, string> = {
  AF1: 'Inersia',
  AF2: 'Konsep Gaya',
  AF3: 'Jenis Gaya',
  AF4: 'Bidang Miring',
  AF5: 'Aksi Reaksi',
};

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-3 mt-2">
      <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full ${
            score >= PASS_SCORE
              ? 'bg-gradient-to-r from-green-400 to-teal-400'
              : 'bg-gradient-to-r from-red-400 to-rose-400'
          }`}
        />
      </div>
      <span className={`text-sm font-black min-w-[36px] text-right ${score >= PASS_SCORE ? 'text-green-600' : 'text-red-500'}`}>
        {score}
      </span>
    </div>
  );
}

export default function ResultPage() {
  const { state, dispatch, navigate } = useApp();
  const [loading, setLoading] = useState(false);
  const results = state.testResults;

  // Refresh dari Supabase
  const refreshResults = async () => {
    if (!state.user?.id) return;
    setLoading(true);
    try {
      const { data } = await getTestResults(state.user.id);
      if (data) {
        const mapped: TestResult[] = data.map((r: Record<string, unknown>) => ({
          id: r.id as string,
          user_id: r.user_id as string,
          af_level: r.af_level as string,
          score: r.score as number,
          passed: r.passed as boolean,
          created_at: r.created_at as string,
        }));
        dispatch({ type: 'SET_RESULTS', payload: mapped });
      }
    } finally {
      setLoading(false);
    }
  };

  // Selalu load data terbaru saat halaman Result dibuka
  useEffect(() => {
    refreshResults();
  }, []);

  // Hitung statistik per AF (ambil nilai terbaru per AF)
  const latestPerAF: Record<string, TestResult> = {};
  for (const r of results) {
    if (!latestPerAF[r.af_level] || (r.created_at && r.created_at > (latestPerAF[r.af_level].created_at ?? ''))) {
      latestPerAF[r.af_level] = r;
    }
  }

  const afKeys = ['AF1', 'AF2', 'AF3', 'AF4', 'AF5'];
  const afResults = afKeys.map(k => ({ key: k, label: AF_LABELS[k], data: latestPerAF[k] ?? null }));

  const doneAFs = afResults.filter(a => a.data !== null);
  const avgScore = doneAFs.length > 0
    ? Math.round(doneAFs.reduce((sum, a) => sum + (a.data?.score ?? 0), 0) / doneAFs.length)
    : 0;
  const totalPassed = doneAFs.filter(a => a.data?.passed).length;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 font-heading mb-2">Hasil Kuis</h1>
          <p className="text-slate-500">Rekap nilai dan progres belajar kamu</p>
        </div>
        <button
          onClick={refreshResults}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 hover:border-teal-400 hover:text-teal-500 transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin text-teal-500' : ''} />
          Refresh Data
        </button>
      </motion.div>

      {results.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/60 backdrop-blur-xl border border-dashed border-slate-300 rounded-3xl p-12 text-center shadow-sm"
        >
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <DatabaseBackup size={48} className="text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2 font-heading">Belum ada riwayat kuis</h3>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            Selesaikan kuis untuk melihat perkembangan belajar Anda di sini!
          </p>
          <button
            className="inline-flex items-center gap-2 px-8 py-3 bg-teal-400 hover:bg-teal-300 text-slate-900 font-bold rounded-xl shadow-lg shadow-teal-400/30 transition-all cursor-pointer"
            onClick={() => navigate('test')}
          >
            Mulai Kuis Sekarang
          </button>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-8">

          {/* Card Utama: Rata-rata */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-teal-400 to-green-400 rounded-3xl p-8 md:p-10 shadow-2xl shadow-teal-400/30 text-slate-900"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-slate-800 font-semibold text-sm uppercase tracking-widest mb-2">Rata-Rata Semua AF</p>
                <div className="text-7xl font-black font-serif">{avgScore}</div>
                <div className="flex gap-4 mt-4 text-sm">
                  <span className="bg-white/30 px-3 py-1.5 rounded-full font-semibold">{doneAFs.length}/5 AF Dikerjakan</span>
                  <span className="bg-white/30 px-3 py-1.5 rounded-full font-semibold">{totalPassed} Lulus</span>
                </div>
              </div>
              <div className="w-32 h-32 bg-slate-900/20 rounded-full flex items-center justify-center">
                <TrendingUp size={64} className="text-white" />
              </div>
            </div>
          </motion.div>

          {/* 5 Card AF */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {afResults.map(({ key, label, data }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className={`bg-white/80 backdrop-blur-xl border rounded-2xl p-6 shadow-md hover:-translate-y-1 transition-transform ${
                  data?.passed ? 'border-green-300' : data ? 'border-red-300' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{key}</div>
                    <div className="text-lg font-extrabold text-slate-800 font-heading">{label}</div>
                  </div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    data?.passed ? 'bg-green-100' : data ? 'bg-red-100' : 'bg-slate-100'
                  }`}>
                    {data?.passed
                      ? <CheckCircle2 size={22} className="text-green-600" />
                      : data
                      ? <XCircle size={22} className="text-red-500" />
                      : <Target size={22} className="text-slate-400" />
                    }
                  </div>
                </div>

                {data ? (
                  <>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-500">Nilai</span>
                      <span className={`text-sm font-bold px-2.5 py-0.5 rounded-full ${
                        data.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                      }`}>
                        {data.passed ? 'LULUS' : 'GAGAL'}
                      </span>
                    </div>
                    <ScoreBar score={data.score} />
                    {data.created_at && (
                      <p className="text-xs text-slate-400 mt-3">
                        {new Date(data.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric', month: 'long', year: 'numeric'
                        })}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="text-sm text-slate-400 mt-2">Belum dikerjakan</div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Riwayat Semua Percobaan */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 font-heading">Riwayat Semua Percobaan</h3>
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200">
                      <th className="p-4 font-bold text-slate-600">Tanggal</th>
                      <th className="p-4 font-bold text-slate-600">Level AF</th>
                      <th className="p-4 font-bold text-slate-600">Skor</th>
                      <th className="p-4 font-bold text-slate-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...results].sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()).map(r => (
                      <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 text-sm text-slate-600">
                          {r.created_at ? new Date(r.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : '-'}
                        </td>
                        <td className="p-4 font-bold text-slate-800">
                          {r.af_level} <span className="font-normal text-slate-500 hidden sm:inline">- {AF_LABELS[r.af_level] || 'Unknown'}</span>
                        </td>
                        <td className="p-4">
                          <span className={`font-black ${r.score >= PASS_SCORE ? 'text-green-600' : 'text-red-500'}`}>
                            {r.score}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
                            r.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                          }`}>
                            {r.passed ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                            {r.passed ? 'LULUS' : 'GAGAL'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Tombol ke Test */}
          <div className="text-center pt-8">
            <button
              onClick={() => navigate('test')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-teal-400 to-green-400 hover:from-teal-500 hover:to-green-500 text-white font-bold rounded-xl shadow-lg shadow-teal-400/30 transition-transform active:scale-95 cursor-pointer"
            >
              <Trophy size={20} /> Lanjutkan Kuis
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
