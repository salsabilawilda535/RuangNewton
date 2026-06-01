// ============================================================
// ModulPage — Ruang Newton
// Materi Hukum Newton lengkap dengan notasi vektor, rumus, lampiran, video & PhET
// ============================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, Circle, Zap, Target, Triangle, Repeat } from 'lucide-react';
import imgInersia1 from '../assets/lampiran 2.png';
import imgInersia2 from '../assets/lampiran 3.png';
import imgBerat from '../assets/Lampiran 4.png';
import imgNormal from '../assets/Lampiran 5.png';
import imgGesek from '../assets/Lampiran 6.png';
import imgMiring from '../assets/Lampiran 7.png';

// ── Komponen tampilan rumus vektor ─────────────────────────
function FormulaBox({ children, color = 'teal' }: { children: React.ReactNode; color?: string }) {
  const colorMap: Record<string, string> = {
    teal: 'from-teal-50 to-teal-100/50 border-teal-300 text-teal-700',
    green: 'from-green-50 to-green-100/50 border-green-300 text-green-700',
    blue: 'from-blue-50 to-blue-100/50 border-blue-300 text-blue-700',
    red: 'from-red-50 to-red-100/50 border-red-300 text-red-700',
    orange: 'from-orange-50 to-orange-100/50 border-orange-300 text-orange-700',
    purple: 'from-purple-50 to-purple-100/50 border-purple-300 text-purple-700',
  };
  return (
    <div className={`my-6 mx-auto flex items-center justify-center py-10 px-10 rounded-2xl border-2 bg-gradient-to-br ${colorMap[color] || colorMap.teal} shadow-inner`}>
      <div
        className="flex items-baseline justify-center flex-wrap"
        style={{
          fontFamily: '"Cambria Math", Cambria, "Times New Roman", serif',
          fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
          gap: '0.4rem',
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Komponen vektor — panah di atas huruf, baseline tetap sejajar
function Vec({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="relative inline-block"
      style={{
        fontFamily: '"Cambria Math", Cambria, "Times New Roman", serif',
        fontStyle: 'italic',
      }}
    >
      <span
        aria-hidden="true"
        className="absolute w-full text-center"
        style={{
          top: '-0.7em',
          left: 0,
          fontSize: '0.6em',
          fontStyle: 'normal',
          userSelect: 'none',
        }}
      >
        →
      </span>
      {children}
    </span>
  );
}

// Teks operator/konstanta normal (tidak italic) dalam rumus
function Sym({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontStyle: 'normal', fontFamily: '"Cambria Math", Cambria, "Times New Roman", serif', display: 'inline-block' }}>
      {children}
    </span>
  );
}

// Komponen embed video YouTube
function VideoEmbed({ src, title }: { src: string; title: string }) {
  return (
    <div className="mt-4 rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900 aspect-video w-full">
      <iframe
        className="w-full h-full"
        src={src}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

// Komponen embed PhET
function PhetEmbed({ src, title }: { src: string; title: string }) {
  return (
    <div className="mt-4 rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900 w-full h-[350px] sm:h-[450px] md:h-[520px]">
      <iframe className="w-full h-full" src={src} title={title} frameBorder="0" allowFullScreen />
    </div>
  );
}

// Lampiran gambar 1:1
function Lampiran({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex justify-center my-6">
      <img src={src} alt={alt} className="w-full max-w-md aspect-square object-contain rounded-2xl border border-slate-200 bg-white shadow-md p-2" />
    </div>
  );
}

// ── Data konten per subbab ─────────────────────────────────
const modulesData = [
  {
    id: 'inersia',
    title: 'SUBBAB 1 - INERSIA',
    icon: Circle,
    content: () => (
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 font-heading">
          Subbab 1: Inersia
        </h2>

        <blockquote className="border-l-4 border-teal-400 bg-teal-400/10 p-6 rounded-r-2xl italic text-slate-700 text-lg leading-relaxed">
          "Jika resultan gaya yang bekerja pada benda yang bekerja pada benda sama dengan nol, maka benda yang mula-mula diam akan tetap diam, dan benda yang mula-mula bergerak lurus beraturan akan tetap bergerak lurus beraturan dengan kecepatan tetap."
          <br /><br />
          <em className="text-teal-600 font-bold not-italic">— HUKUM I NEWTON</em>
        </blockquote>

        <p className="text-slate-700 text-base leading-relaxed" style={{ fontFamily: 'Cambria, serif' }}>
          Inersia atau kelembaman adalah kecenderungan alami setiap benda untuk menolak perubahan terhadap keadaan geraknya. Benda yang diam cenderung tetap diam, dan benda yang bergerak cenderung tetap bergerak dengan kecepatan dan arah yang sama, kecuali ada gaya luar yang mempengaruhinya.
        </p>

        <p className="text-slate-700 text-base leading-relaxed" style={{ fontFamily: 'Cambria, serif' }}>
          Setiap benda memiliki kecenderungan untuk "malas" berubah keadaan. Benda yang diam tidak mau bergerak tanpa ada yang mendorong atau menariknya. Begitu pula benda yang sedang melaju, ia akan terus melaju tanpa mau berhenti jika tidak ada gaya yang menghentikannya.
        </p>

        <p className="text-slate-700 text-base leading-relaxed" style={{ fontFamily: 'Cambria, serif' }}>
          Besaran yang mengukur inersia suatu benda adalah <em>massa</em>. Semakin besar massa suatu benda, semakin besar pula inersianya — artinya semakin sulit mengubah keadaan geraknya.
        </p>

        <div className="mt-2">
          <h3 className="text-xl font-bold text-slate-800 mb-1 font-heading text-center">Persamaan Hukum I Newton</h3>
          <FormulaBox color="teal">
            <Sym>Σ</Sym><Vec>F</Vec><Sym> = 0</Sym>
          </FormulaBox>
          <p className="text-center text-slate-500 text-sm -mt-2">
            (Resultan seluruh gaya yang bekerja pada benda sama dengan nol)
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-3 font-heading">Ilustrasi Inersia</h3>
          <Lampiran src={imgInersia1} alt="Lampiran 2 - Ilustrasi Inersia" />
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-3 font-heading">Contoh Penerapan di Kehidupan</h3>
          <Lampiran src={imgInersia2} alt="Lampiran 3 - Contoh Penerapan Inersia" />
        </div>

        <div className="bg-teal-50 border border-teal-200 p-6 rounded-2xl">
          <p className="font-semibold text-slate-800 mb-2">Pertanyaan:</p>
          <p className="text-slate-600 mb-4 italic">
            "Mengapa tumpukan ponsel pada gambar tidak ikut terbang atau jatuh berantakan saat kain di bawahnya ditarik dengan sangat cepat?"
          </p>
          <p className="font-semibold text-slate-800 mb-2">Jawaban:</p>
          <p className="text-slate-600 leading-relaxed">
            "Karena adanya sifat Inersia (kelembaman), yaitu kecenderungan benda untuk mempertahankan posisi diamnya. Saat kain ditarik sangat cepat, gaya gesek antara kain dan ponsel tidak cukup kuat dan berlangsung terlalu singkat untuk menggerakkan ponsel. Akibatnya ponsel tetap di posisi semula dan hanya jatuh tegak lurus ke meja karena gravitasi."
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-3 font-heading">Video Pembelajaran</h3>
          <VideoEmbed
            src="https://www.youtube.com/embed/cliJbHYpNic?end=285"
            title="Inersia – Hukum Newton I"
          />
        </div>
      </div>
    ),
  },
  {
    id: 'konsep-gaya',
    title: 'SUBBAB 2 - KONSEP GAYA',
    icon: Zap,
    content: () => (
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 font-heading">
          Subbab 2: Konsep Gaya
        </h2>

        <blockquote className="border-l-4 border-green-400 bg-green-400/10 p-6 rounded-r-2xl italic text-slate-700 text-lg leading-relaxed">
          "Percepatan sebuah benda berbanding lurus dengan resultan gaya yang bekerja padanya dan berbanding terbalik dengan massanya"
          <br /><br />
          <em className="text-green-600 font-bold not-italic">— HUKUM II NEWTON</em>
        </blockquote>

        <p className="text-slate-700 text-base leading-relaxed" style={{ fontFamily: 'Cambria, serif' }}>
          Gaya adalah tarikan atau dorongan yang bekerja pada suatu benda, yang menyebabkan perubahan posisi, kecepatan, arah, atau bentuk benda. Gaya merupakan besaran vektor — memiliki besar dan arah.
        </p>

        <p className="text-slate-700 text-base leading-relaxed" style={{ fontFamily: 'Cambria, serif' }}>
          Hukum II Newton menyatakan bahwa percepatan suatu benda berbanding lurus dengan resultan gaya total yang bekerja padanya dan berbanding terbalik dengan massanya. Semakin besar gaya yang diberikan, semakin besar percepatannya. Sebaliknya, semakin besar massa benda, semakin kecil percepatannya untuk gaya yang sama.
        </p>

        <p className="text-slate-700 text-base leading-relaxed" style={{ fontFamily: 'Cambria, serif' }}>
          Satuan gaya dalam Sistem Internasional (SI) adalah Newton (N), di mana 1 N = 1 kg·m/s².
        </p>

        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-1 font-heading text-center">Persamaan Hukum II Newton</h3>
          <FormulaBox color="green">
            <Sym>Σ</Sym><Vec>F</Vec><Sym> = </Sym><span style={{ fontStyle: 'italic', fontFamily: 'Cambria, serif' }}>m</span><Sym> · </Sym><Vec>a</Vec>
          </FormulaBox>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-1 font-heading text-center">Bentuk Lain (mencari percepatan)</h3>
          <FormulaBox color="teal">
            <Vec>a</Vec><Sym> = Σ</Sym><Vec>F</Vec><Sym> / </Sym><span style={{ fontStyle: 'italic', fontFamily: 'Cambria, serif' }}>m</span>
          </FormulaBox>
        </div>

        <p className="text-slate-500 text-sm text-center" style={{ fontFamily: 'Cambria, serif' }}>
          Di mana: <em>m</em> = massa benda (kg), <Vec>a</Vec> = percepatan (m/s²), Σ<Vec>F</Vec> = resultan gaya (N)
        </p>

        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-3 font-heading">Video Pembelajaran 1</h3>
          <VideoEmbed
            src="https://www.youtube.com/embed/dFybXASirwQ"
            title="Konsep Gaya – Video 1"
          />
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-3 font-heading">Video Pembelajaran 2</h3>
          <VideoEmbed
            src="https://www.youtube.com/embed/_Z7qivqbSBI"
            title="Konsep Gaya – Video 2"
          />
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-3 font-heading">Simulasi Interaktif PhET — Forces & Motion</h3>
          <PhetEmbed
            src="https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_all.html?locale=in"
            title="PhET Forces and Motion Basics"
          />
        </div>
      </div>
    ),
  },
  {
    id: 'jenis-gaya',
    title: 'SUBBAB 3 - JENIS GAYA',
    icon: Target,
    content: () => (
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 font-heading">
          Subbab 3: Jenis-Jenis Gaya
        </h2>

        <p className="text-slate-700 text-base leading-relaxed" style={{ fontFamily: 'Cambria, serif' }}>
          Dalam Hukum Newton, terdapat beberapa jenis gaya yang umum ditemui dalam analisis gerak benda. Masing-masing gaya memiliki karakteristik, arah, dan cara perhitungan yang berbeda.
        </p>

        {/* A. Gaya Berat */}
        <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-800 mb-4 font-heading">A. Gaya Berat (<em style={{ fontFamily: 'Cambria, serif' }}>w</em>)</h3>
          <p className="text-slate-700 leading-relaxed mb-4" style={{ fontFamily: 'Cambria, serif' }}>
            Gaya berat adalah gaya gravitasi yang bekerja pada suatu benda, yang selalu mengarah ke pusat bumi (ke bawah). Penggambaran vektor gaya berat harus dimulai dari titik berat (titik tengah) benda. Besar gaya berat bergantung pada massa benda dan percepatan gravitasi di lokasi tersebut.
          </p>
          <FormulaBox color="teal">
            <Vec>w</Vec><Sym> = </Sym><span style={{ fontStyle: 'italic', fontFamily: 'Cambria, serif' }}>m</span><Sym> · </Sym><Vec>g</Vec>
          </FormulaBox>
          <p className="text-center text-slate-500 text-sm -mt-2">
            Di mana <em style={{ fontFamily: 'Cambria, serif' }}>m</em> = massa (kg), <em style={{ fontFamily: 'Cambria, serif' }}>g</em> = percepatan gravitasi (≈ 10 m/s²)
          </p>
          <Lampiran src={imgBerat} alt="Lampiran 4 - Gaya Berat" />
        </div>

        {/* B. Gaya Normal */}
        <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-800 mb-4 font-heading">B. Gaya Normal (<em style={{ fontFamily: 'Cambria, serif' }}>N</em>)</h3>
          <p className="text-slate-700 leading-relaxed mb-4" style={{ fontFamily: 'Cambria, serif' }}>
            Gaya normal adalah gaya kontak yang diberikan oleh suatu permukaan terhadap benda yang berada di atasnya. Gaya ini timbul sebagai reaksi atas gaya berat atau komponen gaya tegak lurus terhadap bidang. Penggambaran vektor gaya normal harus selalu tegak lurus dengan permukaan bidang tempat benda berada.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4" style={{ fontFamily: 'Cambria, serif' }}>
            Pada bidang datar, gaya normal sama besar dengan gaya berat. Namun pada bidang miring, gaya normal merupakan komponen tegak lurus terhadap permukaan bidang.
          </p>
          <FormulaBox color="green">
            <Vec>N</Vec><Sym> = </Sym><Vec>w</Vec>
          </FormulaBox>
          <FormulaBox color="teal">
            <Vec>N</Vec><Sym> = </Sym><span style={{ fontStyle: 'italic', fontFamily: 'Cambria, serif' }}>m</span><Sym> · </Sym><Vec>g</Vec>
          </FormulaBox>
          <p className="text-center text-slate-500 text-sm -mt-2">(Berlaku untuk benda di bidang datar horizontal)</p>
          <Lampiran src={imgNormal} alt="Lampiran 5 - Gaya Normal" />
        </div>

        {/* C. Gaya Gesek */}
        <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-800 mb-4 font-heading">C. Gaya Gesek</h3>
          <p className="text-slate-700 leading-relaxed mb-4" style={{ fontFamily: 'Cambria, serif' }}>
            Gaya gesek adalah gaya yang timbul akibat kontak antara dua permukaan yang saling bersentuhan pada bidang kasar. Gaya ini bekerja berlawanan arah dengan arah kecenderungan gerak atau arah gerak benda. Gaya gesek dibedakan menjadi dua jenis:
          </p>

          <div className="p-5 bg-blue-50 rounded-xl border border-blue-200 mb-4">
            <h4 className="font-bold text-slate-800 text-lg mb-2">1. Gaya Gesek Statis (<em style={{ fontFamily: 'Cambria, serif' }}>f<sub>s</sub></em>)</h4>
            <p className="text-slate-600 mb-3 leading-relaxed" style={{ fontFamily: 'Cambria, serif' }}>
              Gaya gesek statis bekerja pada benda yang <strong>belum bergerak</strong> atau tepat akan bergerak. Nilainya dapat bervariasi dari nol hingga maksimum.
            </p>
            <FormulaBox color="blue">
              <Vec>f</Vec><span style={{ fontStyle: 'italic', fontFamily: 'Cambria, serif', fontSize: '0.65em', verticalAlign: 'baseline', marginRight: '0.4rem' }}>s,maks</span>
              <Sym> = </Sym>
              <span style={{ fontStyle: 'italic', fontFamily: 'Cambria, serif' }}>μ<sub>s</sub></span>
              <Sym> · </Sym><Vec>N</Vec>
            </FormulaBox>
            <p className="text-center text-slate-500 text-sm -mt-2">
              <em style={{ fontFamily: 'Cambria, serif' }}>μ<sub>s</sub></em> = koefisien gesek statis
            </p>
          </div>

          <div className="p-5 bg-red-50 rounded-xl border border-red-200 mb-4">
            <h4 className="font-bold text-slate-800 text-lg mb-2">2. Gaya Gesek Kinetis (<em style={{ fontFamily: 'Cambria, serif' }}>f<sub>k</sub></em>)</h4>
            <p className="text-slate-600 mb-3 leading-relaxed" style={{ fontFamily: 'Cambria, serif' }}>
              Gaya gesek kinetis bekerja pada benda yang <strong>sedang bergerak</strong>. Nilainya konstan dan selalu lebih kecil dari gaya gesek statis maksimum.
            </p>
            <FormulaBox color="red">
              <Vec>f</Vec><span style={{ fontStyle: 'italic', fontFamily: 'Cambria, serif', fontSize: '0.65em', verticalAlign: 'baseline', marginRight: '0.4rem' }}>k</span>
              <Sym> = </Sym>
              <span style={{ fontStyle: 'italic', fontFamily: 'Cambria, serif' }}>μ<sub>k</sub></span>
              <Sym> · </Sym><Vec>N</Vec>
            </FormulaBox>
            <p className="text-center text-slate-500 text-sm -mt-2">
              <em style={{ fontFamily: 'Cambria, serif' }}>μ<sub>k</sub></em> = koefisien gesek kinetis
            </p>
          </div>

          <Lampiran src={imgGesek} alt="Lampiran 6 - Gaya Gesek" />
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-3 font-heading">Video Pembelajaran</h3>
          <VideoEmbed
            src="https://www.youtube.com/embed/e9ME0j11sFc"
            title="Jenis-Jenis Gaya"
          />
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-3 font-heading">Simulasi Interaktif PhET — Forces & Motion</h3>
          <PhetEmbed
            src="https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_all.html?locale=in"
            title="PhET Forces and Motion Basics"
          />
        </div>
      </div>
    ),
  },
  {
    id: 'bidang-miring',
    title: 'SUBBAB 4 - BIDANG MIRING',
    icon: Triangle,
    content: () => (
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 font-heading">
          Subbab 4: Bidang Miring
        </h2>

        <p className="text-slate-700 text-base leading-relaxed" style={{ fontFamily: 'Cambria, serif' }}>
          Selain pada bidang datar, Hukum Newton juga ditinjau pada bidang miring. Pada bidang miring, gaya berat benda perlu diuraikan menjadi dua komponen: komponen sejajar bidang (yang menyebabkan benda bergerak sepanjang bidang) dan komponen tegak lurus bidang (yang berperan dalam menentukan gaya normal).
        </p>

        <p className="text-slate-700 text-base leading-relaxed" style={{ fontFamily: 'Cambria, serif' }}>
          Jika sudut kemiringan bidang terhadap horizontal adalah <em>θ</em>, maka:
        </p>

        <ul className="list-disc pl-6 text-slate-700 space-y-2" style={{ fontFamily: 'Cambria, serif' }}>
          <li>Komponen gaya berat sejajar bidang: <em>w</em> sin <em>θ</em> (ke bawah bidang)</li>
          <li>Komponen gaya berat tegak lurus bidang: <em>w</em> cos <em>θ</em></li>
          <li>Gaya normal: <em>N</em> = <em>m</em> · <em>g</em> cos <em>θ</em></li>
        </ul>

        <Lampiran src={imgMiring} alt="Lampiran 7 - Diagram Bidang Miring" />

        <div className="bg-teal-50 p-6 rounded-2xl border border-teal-200">
          <h3 className="text-xl font-bold text-teal-800 mb-3 font-heading">Kasus 1: Bidang Miring Licin (tanpa gesek)</h3>
          <p className="text-slate-700 leading-relaxed mb-4" style={{ fontFamily: 'Cambria, serif' }}>
            Apabila permukaan bidang miring dianggap licin sempurna (koefisien gesek = 0), maka satu-satunya gaya yang bekerja sepanjang bidang adalah komponen berat searah bidang (<em>w</em> sin <em>θ</em>). Dengan menerapkan Hukum Newton II didapat:
          </p>
          <FormulaBox color="teal">
            <Vec>a</Vec><Sym> = </Sym><Vec>g</Vec><Sym> sin </Sym><span style={{ fontStyle: 'italic', fontFamily: 'Cambria, serif' }}>θ</span>
          </FormulaBox>
        </div>

        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
          <h3 className="text-xl font-bold text-orange-800 mb-3 font-heading">Kasus 2: Bidang Miring Kasar (ada gesek)</h3>
          <p className="text-slate-700 leading-relaxed mb-4" style={{ fontFamily: 'Cambria, serif' }}>
            Apabila permukaan bidang miring kasar, terdapat gaya gesek kinetis yang bekerja melawan arah gerak benda (ke atas bidang apabila benda meluncur ke bawah). Resultante gaya menghasilkan persamaan:
          </p>
          <FormulaBox color="orange">
            <Vec>a</Vec><Sym> = </Sym><Vec>g</Vec><Sym>(sin </Sym><span style={{ fontStyle: 'italic', fontFamily: 'Cambria, serif' }}>θ</span><Sym> − </Sym><span style={{ fontStyle: 'italic', fontFamily: 'Cambria, serif' }}>μ<sub>k</sub></span><Sym> cos </Sym><span style={{ fontStyle: 'italic', fontFamily: 'Cambria, serif' }}>θ</span><Sym>)</Sym>
          </FormulaBox>
          <p className="text-center text-slate-500 text-sm -mt-2">
            <em style={{ fontFamily: 'Cambria, serif' }}>μ<sub>k</sub></em> = koefisien gesek kinetis, <em style={{ fontFamily: 'Cambria, serif' }}>θ</em> = sudut kemiringan bidang
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-3 font-heading">Video Pembelajaran</h3>
          <VideoEmbed
            src="https://www.youtube.com/embed/EOhBva6v5xE"
            title="Bidang Miring"
          />
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-3 font-heading">Simulasi Interaktif PhET — Ramp: Forces and Motion</h3>
          <PhetEmbed
            src="https://phet.colorado.edu/sims/cheerpj/motion-series/latest/motion-series.html?simulation=ramp-forces-and-motion&locale=in"
            title="PhET Ramp Forces and Motion"
          />
        </div>
      </div>
    ),
  },
  {
    id: 'aksi-reaksi',
    title: 'SUBBAB 5 - AKSI REAKSI',
    icon: Repeat,
    content: () => (
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 font-heading">
          Subbab 5: Aksi Reaksi
        </h2>

        <blockquote className="border-l-4 border-red-400 bg-red-400/10 p-6 rounded-r-2xl italic text-slate-700 text-lg leading-relaxed">
          "Setiap aksi akan menimbulkan reaksi, jika suatu benda memberikan gaya pada benda yang lain maka benda yang terkena gaya akan memberikan gaya yang besarnya sama dengan gaya yang diterima dari benda pertama, tetapi arahnya berlawanan."
          <br /><br />
          <em className="text-red-600 font-bold not-italic">— HUKUM III NEWTON</em>
        </blockquote>

        <p className="text-slate-700 text-base leading-relaxed" style={{ fontFamily: 'Cambria, serif' }}>
          Hukum III Newton menyatakan bahwa untuk setiap gaya aksi, selalu ada gaya reaksi yang sama besar dan berlawanan arah. Pasangan gaya aksi-reaksi ini memiliki ciri khas:
        </p>

        <ul className="list-disc pl-6 text-slate-700 space-y-2" style={{ fontFamily: 'Cambria, serif' }}>
          <li>Besarnya <strong>sama</strong></li>
          <li>Arahnya <strong>berlawanan</strong></li>
          <li>Bekerja pada <strong>dua benda yang berbeda</strong> (bukan pada benda yang sama)</li>
          <li>Terjadi <strong>secara bersamaan</strong> (tidak ada yang lebih dulu)</li>
        </ul>

        <p className="text-slate-700 text-base leading-relaxed" style={{ fontFamily: 'Cambria, serif' }}>
          Penting untuk dipahami bahwa gaya aksi dan reaksi tidak saling meniadakan satu sama lain karena keduanya bekerja pada benda yang berbeda. Berbeda dengan keseimbangan gaya (Hukum I Newton) yang gaya-gayanya bekerja pada benda yang sama.
        </p>

        <p className="text-slate-700 text-base leading-relaxed" style={{ fontFamily: 'Cambria, serif' }}>
          Contoh dalam kehidupan sehari-hari: roket dapat meluncur di ruang hampa udara karena gas yang disemburkan ke belakang (aksi) menghasilkan gaya dorong roket ke depan (reaksi). Saat berjalan kaki, kita mendorong tanah ke belakang (aksi), dan tanah mendorong kita ke depan (reaksi).
        </p>

        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-1 font-heading text-center">Persamaan Hukum III Newton</h3>
          <FormulaBox color="red">
            <Vec>F</Vec><span style={{ fontStyle: 'italic', fontFamily: 'Cambria, serif', fontSize: '0.65em', verticalAlign: 'baseline', marginRight: '0.5rem' }}>aksi</span>
            <Sym> = −</Sym>
            <Vec>F</Vec><span style={{ fontStyle: 'italic', fontFamily: 'Cambria, serif', fontSize: '0.65em', verticalAlign: 'baseline' }}>reaksi</span>
          </FormulaBox>
          <p className="text-center text-slate-500 text-sm -mt-2">
            Tanda negatif (−) menunjukkan arah yang berlawanan
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-3 font-heading">Video Pembelajaran</h3>
          <VideoEmbed
            src="https://www.youtube.com/embed/VR7NfNWuPLk"
            title="Aksi Reaksi – Hukum Newton III"
          />
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-3 font-heading">Simulasi Interaktif PhET — Forces and Motion</h3>
          <PhetEmbed
            src="https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_all.html?locale=in"
            title="PhET Forces and Motion Basics"
          />
        </div>
      </div>
    ),
  },
];

// ── Halaman Utama ──────────────────────────────────────────
export default function ModulPage() {
  const [activeModul, setActiveModul] = useState(modulesData[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeContent = modulesData.find((m) => m.id === activeModul);

  return (
    <div className="flex min-h-[calc(100vh-80px)] max-w-[1400px] mx-auto w-full relative">

      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden fixed bottom-8 right-8 z-50 bg-teal-400 text-slate-900 w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-none cursor-pointer hover:bg-teal-300 transition-colors"
        onClick={() => setSidebarOpen(true)}
      >
        <BookOpen size={24} />
      </button>

      {/* Sidebar Overlay (Mobile) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/50 z-[99] backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div
        className={`fixed md:sticky top-0 md:top-[80px] left-0 h-full md:h-[calc(100vh-80px)] w-[280px] bg-white border-r border-slate-200 z-[100] p-6 overflow-y-auto transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-extrabold text-slate-800 font-heading">Daftar Materi</h2>
          {sidebarOpen && (
            <button onClick={() => setSidebarOpen(false)} className="bg-transparent border-none text-slate-500 hover:text-slate-700 cursor-pointer">
              <X size={24} />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {modulesData.map((mod) => {
            const isActive = activeModul === mod.id;
            const Icon = mod.icon;
            return (
              <button
                key={mod.id}
                onClick={() => { setActiveModul(mod.id); setSidebarOpen(false); }}
                className={`flex items-center gap-3 p-4 rounded-xl text-left font-medium transition-all duration-200 border cursor-pointer ${
                  isActive
                    ? 'bg-teal-400/15 text-teal-600 border-teal-400/50 font-bold'
                    : 'bg-transparent text-slate-700 border-transparent hover:bg-slate-100'
                }`}
              >
                <div className={isActive ? 'text-teal-500' : 'text-slate-400'}>
                  <Icon size={20} />
                </div>
                <span className="text-[14px]">{mod.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-10 lg:p-12 max-w-[900px] mx-auto w-full pb-24 md:pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModul}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeContent?.content()}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
