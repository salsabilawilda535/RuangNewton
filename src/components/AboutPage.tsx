// ============================================================
// AboutPage — Ruang Newton
// Informasi pembuat website
// ============================================================
import { motion } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';
import imgWilda from '../assets/lampiran 8.png';
import imgZahra from '../assets/lampiran 9.png';
import imgZia from '../assets/lampiran 10.png';

const teamMembers = [
  {
    name: 'WILDA FATHANI SALSABILA BATUBARA',
    email: 'salsabilawilda535@gmail.com',
    image: imgWilda,
  },
  {
    name: 'ZAHRA AMELIA CAHYANI',
    email: 'amelyazahraaaa@gmail.com',
    image: imgZahra,
  },
  {
    name: 'ZIA AULIA AZZAHRA',
    email: 'ziaauliaazzahraa@gmail.com',
    image: imgZia,
  },
];

export default function AboutPage() {
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
          <Heart size={16} />
          Tentang Kami
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 font-heading mb-4">
          Tim Ruang Newton
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Berkenalan dengan tim hebat di balik pengembangan platform pembelajaran interaktif Ruang Newton.
        </p>
      </motion.div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {teamMembers.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 * i }}
            whileHover={{ y: -8 }}
            className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center"
          >
            {/* Avatar */}
            <div className="w-36 h-36 rounded-full mb-6 p-1.5 bg-gradient-to-br from-teal-400 to-green-400 shadow-lg shadow-teal-400/30">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full rounded-full object-cover border-4 border-white"
              />
            </div>

            <h3 className="text-base font-bold text-slate-800 mb-5 font-heading leading-snug">
              {member.name}
            </h3>

            <a
              href={`mailto:${member.email}`}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-600 text-sm font-medium hover:bg-teal-100 transition-colors"
            >
              <Mail size={16} />
              {member.email}
            </a>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center text-slate-500 text-sm"
      >
        <p className="flex items-center justify-center gap-2">
          Dibuat dengan <Heart size={16} className="text-red-400 fill-red-400" /> untuk memajukan pendidikan Indonesia
        </p>
      </motion.div>
    </div>
  );
}
