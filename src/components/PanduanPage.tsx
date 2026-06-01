// ============================================================
// PanduanPage — Ruang Newton
// Panduan penggunaan web dengan deskripsi lengkap
// ============================================================
import { motion } from 'framer-motion';
import { HelpCircle, Navigation, BookOpen, FileQuestion, ShoppingBag, Atom } from 'lucide-react';

const guides = [
  {
    icon: BookOpen,
    step: 1,
    title: 'Konsep Dasar',
    colorClass: 'text-teal-600',
    bgClass: 'bg-teal-50',
    borderClass: 'border-teal-200',
    desc: 'Menjelaskan hukum-hukum Newton, karakteristik gaya, dan diagram gaya pada berbagai bidang.',
  },
  {
    icon: Navigation,
    step: 2,
    title: 'Navigasi Web',
    colorClass: 'text-blue-600',
    bgClass: 'bg-blue-50',
    borderClass: 'border-blue-200',
    desc: 'Navigasi utama digunakan untuk berpindah antar menu.',
  },
  {
    icon: Atom,
    step: 3,
    title: 'Simulasi',
    colorClass: 'text-purple-600',
    bgClass: 'bg-purple-50',
    borderClass: 'border-purple-200',
    desc: 'Simulasi berupa PhET untuk memperkuat pemahaman konsep melalui visualisasi.',
  },
  {
    icon: FileQuestion,
    step: 4,
    title: 'Test',
    colorClass: 'text-green-600',
    bgClass: 'bg-green-50',
    borderClass: 'border-green-200',
    desc: 'Berupa quiz-quiz yang terkait dengan materi yang tersedia.',
  },
  {
    icon: ShoppingBag,
    step: 5,
    title: 'Product',
    colorClass: 'text-orange-600',
    bgClass: 'bg-orange-50',
    borderClass: 'border-orange-200',
    desc: 'Berisi informasi mengenai produk pembelajaran fisika yang dikembangkan oleh tim.',
  },
];

export default function PanduanPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-full px-5 py-2 mb-5 text-sm text-teal-600 font-bold shadow-sm">
          <HelpCircle size={16} />
          Panduan Web
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 font-heading mb-4">
          Panduan Penggunaan Web
        </h1>
      </motion.div>

      {/* Tentang Web */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-teal-400/10 to-green-400/10 border border-teal-200 rounded-3xl p-8 md:p-10 mb-12 shadow-sm"
      >
        <h2 className="text-2xl font-extrabold text-slate-800 font-heading mb-4">Tentang Web</h2>
        <p className="text-slate-700 text-lg leading-relaxed">
          "Ruang Newton adalah media pembelajaran digital yang dirancang untuk membantu siswa SMA memahami materi fisika khususnya Hukum Newton secara menyenangkan. Materi disajikan secara runtut agar siswa dapat memahami dengan jelas setiap materi. Melalui Ruang Newton diharapkan pembelajaran menjadi lebih menarik dan menyenangkan."
        </p>
      </motion.div>

      {/* Panduan Steps */}
      <h2 className="text-2xl font-extrabold text-slate-800 font-heading mb-6">Panduan Penggunaan</h2>
      <div className="flex flex-col gap-5 mb-12">
        {guides.map((guide, i) => {
          const Icon = guide.icon;
          return (
            <motion.div
              key={guide.step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="flex items-start gap-6 bg-white/80 backdrop-blur-xl border border-white rounded-2xl p-6 shadow-md hover:-translate-y-0.5 transition-transform"
            >
              {/* Step Number + Icon */}
              <div className="flex flex-col items-center gap-2 shrink-0">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner border ${guide.bgClass} ${guide.borderClass}`}>
                  <Icon size={28} className={guide.colorClass} />
                </div>
                <span className={`text-xs font-black ${guide.colorClass}`}>STEP {guide.step}</span>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <h3 className="text-xl font-extrabold text-slate-800 font-heading mb-2">{guide.title}</h3>
                <p className="text-slate-600 leading-relaxed text-base">{guide.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center text-slate-400 text-sm"
      >
        <p>Selamat belajar dan semoga sukses bersama Ruang Newton!</p>
      </motion.div>
    </div>
  );
}
