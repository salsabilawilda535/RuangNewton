// ============================================================
// HomePage — Ruang Newton
// Halaman depan (Dashboard)
// ============================================================
import { motion } from 'framer-motion';
import { BookOpen, Award, TrendingUp, PlayCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function HomePage() {
  const { state, navigate } = useApp();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative bg-gradient-to-br from-teal-400 to-green-400 rounded-3xl p-8 md:p-12 mb-12 overflow-hidden shadow-2xl shadow-teal-500/20"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 font-heading tracking-tight leading-tight">
              Selamat Datang,<br />
              <span className="text-white drop-shadow-md">{state.user?.username || 'Pelajar Hebat'}!</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-800/90 mb-8 max-w-2xl leading-relaxed font-medium">
              Platform pembelajaran interaktif Fisika Hukum Newton. Mari mulai petualangan belajarmu hari ini!
            </p>
            <button
              onClick={() => navigate('modul')}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              <PlayCircle size={24} className="group-hover:text-teal-400 transition-colors" />
              Mulai Belajar
            </button>
          </div>
          
          <div className="hidden md:flex justify-center items-center">
            {/* Dekorasi Visual Abstrak untuk Hero */}
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 bg-white/20 rounded-full animate-[spin_10s_linear_infinite] border-4 border-dashed border-white/40"></div>
              <div className="absolute inset-4 bg-white/30 rounded-full animate-[spin_15s_linear_infinite_reverse] border-4 border-dotted border-white/50"></div>
              <div className="absolute inset-8 bg-slate-900 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-green-400">N</span>
              </div>
            </div>
          </div>
        </div>

        {/* Aksesori background SVG ringan */}
        <svg className="absolute bottom-0 right-0 opacity-10 pointer-events-none w-full h-full object-cover" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,100 C30,60 70,60 100,100 L100,0 L0,0 Z" fill="#ffffff" />
        </svg>
      </motion.div>

      {/* Quick Stats/Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform group"
        >
          <div className="w-14 h-14 rounded-xl bg-teal-400/20 flex items-center justify-center mb-6 group-hover:bg-teal-400/30 transition-colors">
            <BookOpen size={28} className="text-teal-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2 font-heading">5 Modul Interaktif</h3>
          <p className="text-slate-500">Pelajari hukum inersia, gaya, hingga aksi-reaksi dengan simulasi visual PhET.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform group"
        >
          <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center mb-6 group-hover:bg-green-500/30 transition-colors">
            <Award size={28} className="text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2 font-heading">Kuis Bertingkat</h3>
          <p className="text-slate-500">Uji kemampuan Anda dari tingkat AF1 hingga AF5. Buktikan Anda bisa!</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform group"
        >
          <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors">
            <TrendingUp size={28} className="text-purple-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2 font-heading">Pantau Progres</h3>
          <p className="text-slate-500">Catat setiap nilai kuis Anda secara otomatis dengan sistem database aman.</p>
        </motion.div>
      </div>

    </div>
  );
}
