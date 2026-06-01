// ============================================================
// ProjectPage — Ruang Newton
// 3 Produk dengan modal popup email
// ============================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, Package } from 'lucide-react';
import imgWilda from '../assets/lampiran 8.png';
import imgZahra from '../assets/lampiran 9.png';
import imgZia from '../assets/lampiran 10.png';

const products = [
  {
    id: 'p1',
    name: 'Papan Diagram Gaya',
    image: imgWilda,
    email: 'salsabilawilda535@gmail.com',
    description:
      'Media pembelajaran visual berupa papan diagram yang memudahkan siswa memahami konsep diagram gaya pada berbagai situasi Hukum Newton.',
  },
  {
    id: 'p2',
    name: 'Smart Box',
    image: imgZahra,
    email: 'amelyazahraaaa@gmail.com',
    description:
      'Kotak pintar interaktif yang dilengkapi sensor dan modul percobaan untuk eksplorasi konsep-konsep Hukum Newton secara menyenangkan.',
  },
  {
    id: 'p3',
    name: 'Hoot Owl Hoot "Petualangan Newton"',
    image: imgZia,
    email: 'ziaauliaazzahraa@gmail.com',
    description:
      'Permainan edukatif bertema petualangan yang mengajak siswa menjelajahi konsep Hukum Newton sambil bermain bersama teman.',
  },
];

export default function ProjectPage() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-full px-5 py-2 mb-5 text-sm text-teal-600 font-bold shadow-sm">
          <Package size={16} />
          Produk Kami
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 font-heading mb-4">
          Produk Pembelajaran Fisika
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Inovasi alat peraga dan permainan edukatif untuk memperdalam pemahaman Hukum Newton secara interaktif dan menyenangkan.
        </p>
      </motion.div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((prod, i) => (
          <motion.div
            key={prod.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col bg-white/80 backdrop-blur-xl border border-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300"
          >
            {/* Image */}
            <div className="w-full h-[240px] overflow-hidden bg-slate-100">
              <img
                src={prod.image}
                alt={prod.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6 md:p-8">
              <h3 className="text-xl font-extrabold text-slate-800 mb-3 font-heading leading-snug">
                {prod.name}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-6">
                {prod.description}
              </p>

              <button
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-teal-400 hover:bg-teal-300 text-slate-900 font-bold rounded-xl shadow-lg shadow-teal-400/20 transition-all text-base cursor-pointer"
                onClick={() => setSelectedProduct(prod)}
              >
                TERTARIK
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Popup Email */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 20 }}
              className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <h3 className="font-extrabold text-xl text-slate-800 font-heading">Info Kontak</h3>
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer border-none"
                  onClick={() => setSelectedProduct(null)}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 flex flex-col items-center text-center gap-4">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-extrabold text-lg text-slate-800 font-heading mb-1">{selectedProduct.name}</h4>
                  <p className="text-slate-500 text-sm">Hubungi kami untuk informasi lebih lanjut</p>
                </div>

                <a
                  href={`mailto:${selectedProduct.email}`}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-teal-50 border-2 border-teal-300 text-teal-700 font-bold rounded-2xl hover:bg-teal-100 transition-colors text-base"
                >
                  <Mail size={20} />
                  {selectedProduct.email}
                </a>

                <p className="text-xs text-slate-400">Klik email di atas untuk menghubungi kami</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
