// ============================================================
// Data Soal — Ruang Newton
// Diambil dari PDF SOAL PEMBELAJARAN FISIKA MATERI HUKUM NEWTON
// Lengkap 10 Soal per Tahap (AF1 - AF5)
// ============================================================
import { type Question } from '../types';

export const STAGES = [
  { level: 1, label: 'INERSIA', passScore: 70 },
  { level: 2, label: 'KONSEP GAYA', passScore: 70 },
  { level: 3, label: 'JENIS GAYA', passScore: 70 },
  { level: 4, label: 'BIDANG MIRING', passScore: 70 },
  { level: 5, label: 'AKSI REAKSI', passScore: 70 },
];

export const questions: Question[] = [
  // ==========================================
  // AF1 - INERSIA (10 Soal)
  // ==========================================
  {
    id: 'af1-1', stage: 1, stageLabel: 'INERSIA',
    text: 'Inersia adalah kecenderungan suatu benda untuk...',
    options: [
      'Bergerak lebih cepat saat didorong',
      'Mempertahankan keadaan gerak atau diamnya',
      'Berpindah tempat secara otomatis',
      'Berhenti saat tidak ada hambatan'
    ],
    correctIndex: 1,
    explanation: 'Inersia adalah sifat alami benda untuk mempertahankan keadaannya — jika diam tetap diam, jika bergerak tetap bergerak dengan kecepatan dan arah yang sama.'
  },
  {
    id: 'af1-2', stage: 1, stageLabel: 'INERSIA',
    text: 'Benda yang memiliki massa lebih besar akan memiliki inersia yang...',
    options: [
      'Lebih kecil',
      'Sama saja, tidak bergantung massa',
      'Lebih besar',
      'Berubah-ubah tergantung posisi benda'
    ],
    correctIndex: 2,
    explanation: 'Inersia berbanding lurus dengan massa. Semakin besar massa benda, semakin besar inersianya.'
  },
  {
    id: 'af1-3', stage: 1, stageLabel: 'INERSIA',
    text: 'Sebuah koin diletakkan di atas kartu yang berada di atas mulut gelas. Kartu disentil dengan cepat, dan koin jatuh ke dalam gelas. Mengapa koin tidak ikut terlempar bersama kartu?',
    options: [
      'Koin terlalu berat sehingga tidak bisa bergerak horizontal',
      'Koin memiliki inersia sehingga cenderung mempertahankan keadaan diamnya',
      'Gelas menarik koin ke bawah',
      'Kartu terlalu licin sehingga koin tidak bisa mengikutinya'
    ],
    correctIndex: 1,
    explanation: 'Koin memiliki inersia. Ia cenderung mempertahankan keadaan diamnya. Ketika kartu disentil cepat, waktu kontak sangat singkat sehingga koin jatuh ke dalam gelas karena gravitasi.'
  },
  {
    id: 'af1-4', stage: 1, stageLabel: 'INERSIA',
    text: 'Seorang penumpang berdiri di dalam bus yang bergerak ke depan lalu bus tiba-tiba berhenti. Penumpang tersebut akan...',
    options: [
      'Terdorong ke belakang karena bus berhenti',
      'Tetap diam di tempat karena tubuhnya berat',
      'Terdorong ke depan karena inersia tubuhnya ingin melanjutkan gerak',
      'Tidak merasakan apapun karena bus berhenti perlahan'
    ],
    correctIndex: 2,
    explanation: 'Tubuh penumpang sedang bergerak ke depan bersama bus. Ketika bus berhenti mendadak, inersia membuat tubuh penumpang cenderung melanjutkan gerak ke depan.'
  },
  {
    id: 'af1-5', stage: 1, stageLabel: 'INERSIA',
    text: 'Dua benda A (massa 2 kg) dan B (massa 10 kg) sama-sama dalam keadaan diam. Jika tidak ada gaya yang bekerja pada keduanya, maka...',
    options: [
      'Benda A akan bergerak lebih dulu karena massanya kecil',
      'Benda B akan bergerak lebih dulu karena massanya besar',
      'Keduanya akan tetap diam karena memiliki inersia',
      'Keduanya akan bergerak bersama-sama secara otomatis'
    ],
    correctIndex: 2,
    explanation: 'Kedua benda memiliki inersia. Karena tidak ada gaya yang bekerja, keduanya akan tetap mempertahankan keadaan diamnya.'
  },
  {
    id: 'af1-6', stage: 1, stageLabel: 'INERSIA',
    text: 'Sebuah bola tenis menggelinding di atas lantai. Lama-kelamaan bola berhenti. Jika lantai tersebut benar-benar licin sempurna tanpa gesekan, maka bola akan...',
    options: [
      'Berhenti lebih cepat',
      'Berhenti pada jarak tertentu',
      'Terus menggelinding selamanya dengan kecepatan tetap',
      'Bergerak makin cepat karena tidak ada hambatan'
    ],
    correctIndex: 2,
    explanation: 'Tanpa gesekan, tidak ada yang mengubah keadaan gerak bola. Sesuai konsep inersia, bola akan terus bergerak dengan kecepatan tetap selamanya.'
  },
  {
    id: 'af1-7', stage: 1, stageLabel: 'INERSIA',
    text: 'Perhatikan dua situasi berikut:\n• Situasi 1: Truk bermassa 5.000 kg bergerak dengan kecepatan 60 km/jam\n• Situasi 2: Sepeda motor bermassa 200 kg bergerak dengan kecepatan 60 km/jam\nManakah pernyataan yang benar mengenai inersia keduanya?',
    options: [
      'Inersia keduanya sama karena kecepatannya sama',
      'Inersia truk lebih besar karena massanya jauh lebih besar',
      'Inersia sepeda motor lebih besar karena lebih ringan dan lincah',
      'Inersia bergantung pada kecepatan, bukan massa'
    ],
    correctIndex: 1,
    explanation: 'Inersia hanya ditentukan oleh massa, bukan kecepatan. Massa truk jauh lebih besar dari sepeda motor, sehingga inersia truk jauh lebih besar.'
  },
  {
    id: 'af1-8', stage: 1, stageLabel: 'INERSIA',
    text: 'Sebuah benda berada di dalam pesawat luar angkasa yang bergerak jauh dari gravitasi Bumi. Pernyataan yang benar tentang inersia benda tersebut adalah...',
    options: [
      'Inersianya hilang karena tidak ada gravitasi',
      'Inersianya berkurang karena beratnya berkurang',
      'Inersianya tetap sama karena massa benda tidak berubah',
      'Inersianya bertambah karena berada di ruang hampa'
    ],
    correctIndex: 2,
    explanation: 'Inersia ditentukan oleh massa, bukan oleh gravitasi atau berat. Massa benda tidak berubah meski berada di luar angkasa.'
  },
  {
    id: 'af1-9', stage: 1, stageLabel: 'INERSIA',
    text: 'Seorang siswa berkata: "Benda yang lebih berat pasti lebih sulit digerakkan karena beratnya, bukan karena inersianya." Menurut kamu pernyataan ini termasuk...',
    options: [
      'Benar, karena berat dan inersia adalah hal yang sama',
      'Benar, karena berat selalu berbanding lurus dengan inersia di mana saja',
      'Salah, karena di luar angkasa benda tidak memiliki berat tetapi tetap sulit digerakkan akibat inersianya',
      'Salah, karena benda berat justru lebih mudah digerakkan'
    ],
    correctIndex: 2,
    explanation: 'Pernyataan siswa keliru. Berat dan inersia adalah dua hal berbeda. Di luar angkasa, benda tidak memiliki berat (hampir nol), namun tetap sulit digerakkan karena massanya.'
  },
  {
    id: 'af1-10', stage: 1, stageLabel: 'INERSIA',
    text: 'Sebelum belajar inersia, kebanyakan siswa berpikir bahwa benda diam adalah keadaan "normal" dan benda bergerak pasti butuh sesuatu yang menggerakkannya terus-menerus. Setelah memahami inersia, kesimpulan yang paling tepat adalah...',
    options: [
      'Pemikiran awal tersebut benar, benda memang selalu butuh dorongan terus-menerus',
      'Diam dan bergerak lurus beraturan adalah dua keadaan yang setara — keduanya adalah keadaan "normal" selama tidak ada gangguan',
      'Hanya keadaan bergerak yang merupakan keadaan normal suatu benda',
      'Inersia hanya berlaku untuk benda diam, tidak berlaku untuk benda yang sedang bergerak.'
    ],
    correctIndex: 1,
    explanation: 'Diam dan gerak lurus beraturan adalah dua keadaan yang setara. Keduanya akan dipertahankan oleh benda selama tidak ada gangguan dari luar.'
  },

  // ==========================================
  // AF2 - KONSEP GAYA (10 Soal)
  // ==========================================
  {
    id: 'af2-1', stage: 2, stageLabel: 'KONSEP GAYA',
    text: 'Hukum Newton II menyatakan hubungan antara gaya, massa, dan percepatan. Pernyataan yang paling tepat adalah...',
    options: [
      'Gaya berbanding terbalik dengan massa dan percepatan',
      'Percepatan suatu benda berbanding lurus dengan gaya dan berbanding terbalik dengan massa',
      'Massa suatu benda berbanding lurus dengan gaya dan percepatan',
      'Gaya tidak mempengaruhi percepatan benda'
    ],
    correctIndex: 1,
    explanation: 'Hukum Newton II: F = m × a, artinya percepatan (a) berbanding lurus dengan gaya (F) dan berbanding terbalik dengan massa (m).'
  },
  {
    id: 'af2-2', stage: 2, stageLabel: 'KONSEP GAYA',
    text: 'Satuan gaya dalam Sistem Internasional (SI) adalah Newton (N). Satu Newton setara dengan...',
    options: [
      '1 kg × m/s²',
      '1 kg × m²/s',
      '1 kg × m/s',
      '1 g × m/s²'
    ],
    correctIndex: 0,
    explanation: 'Dari rumus F = m × a, maka satuan gaya = satuan massa × satuan percepatan = kg × m/s².'
  },
  {
    id: 'af2-3', stage: 2, stageLabel: 'KONSEP GAYA',
    text: 'Sebuah benda dikenai dua gaya: 20 N ke kanan dan 8 N ke kiri. Resultan gaya yang bekerja pada benda adalah...',
    options: [
      '28 N ke kanan',
      '28 N ke kiri',
      '12 N ke kiri',
      '12 N ke kanan'
    ],
    correctIndex: 3,
    explanation: 'Resultan gaya = 20 N (kanan) − 8 N (kiri) = 12 N ke kanan.'
  },
  {
    id: 'af2-4', stage: 2, stageLabel: 'KONSEP GAYA',
    text: 'Sebuah benda bermassa 3,5 kg mula-mula diam, lalu dikenai gaya konstan selama 4 detik hingga kecepatannya menjadi 28 m/s. Berapakah besar gaya yang bekerja pada benda tersebut?',
    options: [
      '8,75 N',
      '98 N',
      '49 N',
      '24,5 N'
    ],
    correctIndex: 3,
    explanation: 'a = (28−0)/4 = 7 m/s². F = m × a = 3,5 × 7 = 24,5 N.'
  },
  {
    id: 'af2-5', stage: 2, stageLabel: 'KONSEP GAYA',
    text: 'Sebuah mobil bermassa 1.000 kg dikenai gaya total 4.000 N ke depan. Berapakah percepatan mobil tersebut?',
    options: [
      '0,25 m/s²',
      '2,5 m/s²',
      '4 m/s²',
      '40 m/s²'
    ],
    correctIndex: 2,
    explanation: 'a = F/m = 4.000 / 1.000 = 4 m/s².'
  },
  {
    id: 'af2-6', stage: 2, stageLabel: 'KONSEP GAYA',
    text: 'Tiga buah gaya bekerja pada benda bermassa 6 kg: F1 = 72 N ke kanan, F2 = 30 N ke kiri, F3 = 18 N ke kiri. Berapakah percepatan dan jarak yang ditempuh benda selama 5 detik jika mula-mula diam?',
    options: [
      '2 m/s² dan 20 m',
      '4 m/s² dan 50 m',
      '4 m/s² dan 20 m',
      '2 m/s² dan 50 m'
    ],
    correctIndex: 1,
    explanation: 'ΣF = 72 − 30 − 18 = 24 N. a = 24/6 = 4 m/s². s = ½ × a × t² = ½ × 4 × 25 = 50 m.'
  },
  {
    id: 'af2-7', stage: 2, stageLabel: 'KONSEP GAYA',
    text: 'Sebuah benda bermassa m dikenai gaya F sehingga menghasilkan percepatan 16 m/s². Benda kedua bermassa 3m dikenai gaya 2F. Benda ketiga bermassa ½m dikenai gaya ¾F. Urutan percepatan dari yang terbesar ke terkecil adalah...',
    options: [
      'Benda 3 > Benda 1 > Benda 2',
      'Benda 1 > Benda 3 > Benda 2',
      'Benda 2 > Benda 1 > Benda 3',
      'Benda 3 > Benda 2 > Benda 1'
    ],
    correctIndex: 0,
    explanation: 'a1 = 16. a2 = 2F/3m = 2/3 × 16 = 10,67. a3 = (¾F)/(½m) = 1,5 × 16 = 24. Urutan: Benda 3 > Benda 1 > Benda 2.'
  },
  {
    id: 'af2-8', stage: 2, stageLabel: 'KONSEP GAYA',
    text: 'Tiga benda A (massa 4 kg), B (massa 6 kg), dan C (massa 2 kg) disusun berjajar dan didorong oleh gaya F = 144 N. Susunan: F → A → B → C. Berapakah gaya kontak antara benda B dan C?',
    options: [
      '18 N',
      '24 N',
      '36 N',
      '48 N'
    ],
    correctIndex: 1,
    explanation: 'Total massa = 12 kg. a = 144/12 = 12 m/s². Gaya kontak B dan C dihitung dari benda C saja: F_BC = m_C × a = 2 × 12 = 24 N.'
  },
  {
    id: 'af2-9', stage: 2, stageLabel: 'KONSEP GAYA',
    text: 'Benda bermassa 4 kg bergerak ke kanan dengan kecepatan awal 36 m/s. Gaya 24 N ke kiri bekerja terus-menerus pada benda. Seorang siswa mengklaim bahwa total jarak yang ditempuh benda hingga kembali ke posisi awal adalah 216 m. Evaluasi klaim tersebut!',
    options: [
      'Benar, karena benda menempuh 108 m ke kanan lalu 108 m kembali ke kiri',
      'Salah, total jarak yang benar adalah 108 m',
      'Salah, total jarak yang benar adalah 270 m',
      'Benar, karena s_pergi = s_kembali = 108 m sehingga total 216 m'
    ],
    correctIndex: 3,
    explanation: 'a = F/m = 24/4 = 6 m/s² (perlambatan). t = v/a = 36/6 = 6s. Jarak ke kanan: s = 36(6) - ½(6)(36) = 108 m. Total bolak-balik = 216 m. Klaim benar.'
  },
  {
    id: 'af2-10', stage: 2, stageLabel: 'KONSEP GAYA',
    text: 'Benda A (massa 5 kg) dan benda B (massa 3 kg) dihubungkan tali dan ditarik gaya F = 64 N. Susunan: F → A → tali → B. Berapakah tegangan tali T?',
    options: [
      '16 N',
      '24 N',
      '32 N',
      '64 N'
    ],
    correctIndex: 1,
    explanation: 'a = F / (m_A + m_B) = 64 / 8 = 8 m/s². Tegangan tali dihitung dari benda B saja: T = m_B × a = 3 × 8 = 24 N.'
  },

  // ==========================================
  // AF3 - JENIS GAYA (10 Soal)
  // ==========================================
  {
    id: 'af3-1', stage: 3, stageLabel: 'JENIS GAYA',
    text: 'Rumus untuk menghitung berat suatu benda adalah...',
    options: [
      'w = m/g',
      'w = m + g',
      'w = m × g',
      'w = g/m'
    ],
    correctIndex: 2,
    explanation: 'Berat (w) adalah gaya gravitasi yang bekerja pada benda. Rumusnya w = m × g.'
  },
  {
    id: 'af3-2', stage: 3, stageLabel: 'JENIS GAYA',
    text: 'Sebuah pegas memiliki konstanta pegas k. Jika pegas ditekan atau ditarik sejauh x dari posisi normalnya, maka besar gaya pegas yang bekerja adalah...',
    options: [
      'F = k/x',
      'F = k × x',
      'F = k × x²',
      'F = k + x'
    ],
    correctIndex: 1,
    explanation: 'Hukum Hooke menyatakan F = k × x, di mana k adalah konstanta pegas dan x adalah perubahan panjang pegas.'
  },
  {
    id: 'af3-3', stage: 3, stageLabel: 'JENIS GAYA',
    text: 'Sebuah buku bermassa 2 kg diletakkan diam di atas meja datar. Berapakah besar gaya normal yang bekerja pada buku? (g = 10 m/s²)',
    options: [
      '2 N',
      '20 N',
      '10 N',
      '40 N'
    ],
    correctIndex: 1,
    explanation: 'Karena buku diam di atas meja datar, gaya normal = berat benda. w = m × g = 2 × 10 = 20 N. Maka N = 20 N.'
  },
  {
    id: 'af3-4', stage: 3, stageLabel: 'JENIS GAYA',
    text: 'Sebuah pegas dengan konstanta 400 N/m ditarik hingga bertambah panjang 15 cm. Berapakah besar gaya pegas yang bekerja?',
    options: [
      '60 N',
      '26,67 N',
      '415 N',
      '6.000 N'
    ],
    correctIndex: 0,
    explanation: 'x = 15 cm = 0,15 m. F = k × x = 400 × 0,15 = 60 N.'
  },
  {
    id: 'af3-5', stage: 3, stageLabel: 'JENIS GAYA',
    text: 'Sebuah balok bermassa 5 kg berada di atas lantai dengan koefisien gesek kinetik μk = 0,3. Berapakah besar gaya gesek kinetik yang bekerja pada balok saat didorong? (g = 10 m/s²)',
    options: [
      '1,5 N',
      '5 N',
      '15 N',
      '150 N'
    ],
    correctIndex: 2,
    explanation: 'N = w = m × g = 5 × 10 = 50 N. fk = μk × N = 0,3 × 50 = 15 N.'
  },
  {
    id: 'af3-6', stage: 3, stageLabel: 'JENIS GAYA',
    text: 'Sebuah benda bermassa 8 kg didorong dengan gaya 70 N di atas lantai dengan koefisien gesek kinetik μk = 0,4. Berapakah percepatan benda tersebut? (g = 10 m/s²)',
    options: [
      '2,125 m/s²',
      '4,75 m/s²',
      '5,5 m/s²',
      '8,75 m/s²'
    ],
    correctIndex: 1,
    explanation: 'N = 80 N. fk = 0,4 × 80 = 32 N. ΣF = 70 − 32 = 38 N. a = ΣF/m = 38/8 = 4,75 m/s².'
  },
  {
    id: 'af3-7', stage: 3, stageLabel: 'JENIS GAYA',
    text: 'Sebuah balok ditarik oleh mobil mainan ke arah kanan pada lantai kasar. Jenis gaya yang bekerja menghambat gerak balok pada permukaan lantai kasar adalah...',
    options: [
      'Gaya Normal',
      'Gaya Gesek Kinetis',
      'Gaya Gesek Statis',
      'Gaya Tegangan Tali'
    ],
    correctIndex: 1,
    explanation: 'Karena benda bergerak, gaya hambat yang bekerja adalah Gaya Gesek Kinetis (fk).'
  },
  {
    id: 'af3-8', stage: 3, stageLabel: 'JENIS GAYA',
    text: 'Sebuah pegas digantungi beban bermassa 500 gram bertambah panjang 5 cm. Kemudian beban diganti dengan benda bermassa 1,5 kg. Berapakah pertambahan panjang pegas sekarang? (g = 10 m/s²)',
    options: [
      '5 cm',
      '10 cm',
      '15 cm',
      '20 cm'
    ],
    correctIndex: 2,
    explanation: 'k = F1/x1 = 5/0,05 = 100 N/m. F2 = 1,5 × 10 = 15 N. x2 = F2/k = 15/100 = 0,15 m = 15 cm.'
  },
  {
    id: 'af3-9', stage: 3, stageLabel: 'JENIS GAYA',
    text: 'Sebuah benda bermassa 10 kg didorong dengan gaya 50 N namun benda tidak bergerak. Koefisien gesek statis μs = 0,6 dan μk = 0,4. Berapakah gaya gesek yang bekerja saat itu?',
    options: [
      '60 N',
      '40 N',
      '50 N',
      '0 N'
    ],
    correctIndex: 2,
    explanation: 'Gaya gesek statis maksimum = μs × N = 0,6 × 100 = 60 N. Karena F_dorong (50 N) < fs_maks, benda diam. Gaya gesek menyesuaikan gaya dorong = 50 N.'
  },
  {
    id: 'af3-10', stage: 3, stageLabel: 'JENIS GAYA',
    text: 'Sebuah benda bermassa 4 kg diikat pada pegas berkonstanta 200 N/m di lantai dengan μk = 0,25. Benda ditarik hingga pegas meregang 20 cm lalu dilepas. Berapakah gaya total yang bekerja pada benda saat dilepas? (g = 10 m/s²)',
    options: [
      '50 N',
      '30 N',
      '40 N',
      '10 N'
    ],
    correctIndex: 1,
    explanation: 'F_pegas = k × x = 200 × 0,2 = 40 N. Gaya gesek = μk × N = 0,25 × 40 = 10 N. Gaya total = 40 - 10 = 30 N.'
  },

  // ==========================================
  // AF4 - BIDANG MIRING (10 Soal)
  // ==========================================
  {
    id: 'af4-1', stage: 4, stageLabel: 'BIDANG MIRING',
    text: 'Kalau ada benda yang meluncur di bidang miring licin, rumus percepatannya adalah...',
    options: [
      'a = g cos θ',
      'a = g tan θ',
      'a = g / sin θ',
      'a = g sin θ'
    ],
    correctIndex: 3,
    explanation: 'Di bidang miring licin, komponen berat yang searah bidang adalah mg sin θ. ma = mg sin θ → a = g sin θ.'
  },
  {
    id: 'af4-2', stage: 4, stageLabel: 'BIDANG MIRING',
    text: 'Budi parkir motor di jalan menanjak. Berat motor W dan sudut jalannya θ. Komponen berat motor yang bikin dia cenderung meluncur ke bawah adalah...',
    options: [
      'W cos θ',
      'W tan θ',
      'W / sin θ',
      'W sin θ'
    ],
    correctIndex: 3,
    explanation: 'Komponen sejajar jalan adalah W sin θ. Ini yang menarik motor ke bawah bidang miring.'
  },
  {
    id: 'af4-3', stage: 4, stageLabel: 'BIDANG MIRING',
    text: 'Kamu (60 kg) dan temanmu (40 kg) main perosotan licin dari ketinggian dan sudut yang sama. Siapa yang duluan sampai bawah?',
    options: [
      'Kamu, karena badan lebih berat jadi lebih cepat',
      'Temanmu, karena lebih ringan',
      'Kalian sampai bersamaan karena percepatan tidak bergantung pada massa',
      'Tergantung siapa yang mulai duluan'
    ],
    correctIndex: 2,
    explanation: 'a = g sin θ. Tidak ada massa (m) dalam rumus ini. Keduanya memiliki percepatan yang sama.'
  },
  {
    id: 'af4-4', stage: 4, stageLabel: 'BIDANG MIRING',
    text: 'Mengapa kardus lebih lambat atau diam saat didorong di permukaan bidang miring kasar (karpet) dibandingkan yang licin (keramik)?',
    options: [
      'Di permukaan kasar berat kardus jadi lebih kecil',
      'Di permukaan kasar gravitasinya lebih lemah',
      'Di permukaan kasar muncul gaya gesekan yang melawan gerak kardus',
      'Di permukaan licin sudut kemiringannya selalu lebih besar'
    ],
    correctIndex: 2,
    explanation: 'Permukaan kasar memunculkan gaya gesekan (f = μN) yang arahnya berlawanan dengan gerak benda.'
  },
  {
    id: 'af4-5', stage: 4, stageLabel: 'BIDANG MIRING',
    text: 'Sebuah balok 6 kg meluncur ke bawah pada papan licin yang dimiringkan 30° dari lantai. Berapakah percepatannya? (g = 10 m/s²)',
    options: [
      '6 m/s²',
      '5 m/s²',
      '18 m/s²',
      '9 m/s²'
    ],
    correctIndex: 1,
    explanation: 'a = g sin θ = 10 × sin(30°) = 10 × 0,5 = 5 m/s².'
  },
  {
    id: 'af4-6', stage: 4, stageLabel: 'BIDANG MIRING',
    text: 'Sebuah benda bergerak menuruni bidang dengan kemiringan 37°. Koefisien gesek kinetik 0,1. Berapakah percepatannya? (g = 10 m/s², sin 37°=0,6, cos 37°=0,8)',
    options: [
      '5,2 m/s²',
      '7 m/s²',
      '9 m/s²',
      '4 m/s²'
    ],
    correctIndex: 0,
    explanation: 'a = g(sin θ - μk cos θ) = 10(0,6 - (0,1 × 0,8)) = 10(0,6 - 0,08) = 10(0,52) = 5,2 m/s².'
  },
  {
    id: 'af4-7', stage: 4, stageLabel: 'BIDANG MIRING',
    text: 'Koefisien gesekan statis antara kulkas dan bidang miring (ramp) truk adalah 0,5. Supaya kulkas tidak melorot sendiri, sudut ramp maksimal adalah... (tan 26,5° ≈ 0,5)',
    options: [
      '20°',
      '26,5°',
      '30°',
      '45°'
    ],
    correctIndex: 1,
    explanation: 'Syarat tidak melorot: tan θ ≤ μs. tan θ ≤ 0,5, sehingga θ ≤ 26,5°.'
  },
  {
    id: 'af4-8', stage: 4, stageLabel: 'BIDANG MIRING',
    text: 'Dani menghitung percepatan sofa di lantai miring kasar dan mendapat hasil negatif (-3 m/s²). Apa yang seharusnya Dani lakukan?',
    options: [
      'Ulangi perhitungan dari awal',
      'Abaikan tanda negatifnya',
      'Cek dulu apakah gaya dorong ke bawah bidang (mg sin θ) lebih besar dari gaya gesek statis maksimum (fs maks). Jika tidak, sofa diam.',
      'Ganti nilai sudutnya biar positif'
    ],
    correctIndex: 2,
    explanation: 'Percepatan negatif pada perhitungan ini berarti gaya gesek statis lebih kuat dari gaya tarik gravitasi, sehingga sofa sebenarnya diam (a=0).'
  },
  {
    id: 'af4-9', stage: 4, stageLabel: 'BIDANG MIRING',
    text: 'Apakah memperbesar sudut kemiringan bidang dapat membuat benda yang diam menjadi meluncur?',
    options: [
      'Ya, memperbesar sudut membuat gaya komponen berat yang searah bidang makin besar, dan gaya gesek makin kecil.',
      'Tidak, sudut besar membuat benda makin stabil',
      'Tidak, sudut besar meningkatkan gaya normal',
      'Salah, sudut tidak berpengaruh'
    ],
    correctIndex: 0,
    explanation: 'sin θ naik → gaya berat searah bidang makin besar. cos θ turun → gaya normal turun → gesekan mengecil. Keduanya bikin gampang meluncur.'
  },
  {
    id: 'af4-10', stage: 4, stageLabel: 'BIDANG MIRING',
    text: 'Sebuah jalur evakuasi dirancang dengan sudut kemiringan 20° dan permukaan memiliki koefisien gesekan statik 0,4. Apakah jalur ini aman sehingga orang tidak meluncur sendiri tanpa sengaja? (tan 20° ≈ 0,36)',
    options: [
      'Tidak aman, karena sudut terlalu besar',
      'Tidak aman, karena koefisien gesekan terlalu kecil',
      'Aman, karena koefisien gesekan (0,4) lebih besar dari tan 20° (0,36)',
      'Aman, karena semua di bawah 45° pasti aman'
    ],
    correctIndex: 2,
    explanation: 'Syarat tidak meluncur: μs ≥ tan θ. Karena 0,4 > 0,36, jalur ini aman dalam kondisi kering/normal.'
  },

  // ==========================================
  // AF5 - AKSI REAKSI (10 Soal)
  // ==========================================
  {
    id: 'af5-1', stage: 5, stageLabel: 'AKSI REAKSI',
    text: 'Fakta yang menunjukkan bahwa gaya aksi dan reaksi nilainya selalu sama besar adalah...',
    options: [
      'Kerusakan mobil kecil lebih parah saat ditabrak truk besar.',
      'Senapan menghentak ke belakang dengan gaya yang sama besar dengan gaya dorong pada peluru.',
      'Pemain sepak bola merasa kesakitan yang sama saat menendang bola plastik maupun beton.',
      'Meja rapuh akan langsung patah jika dipukul pelan.'
    ],
    correctIndex: 1,
    explanation: 'Gaya dorong pada peluru ke depan (Aksi) sama persis dengan gaya dorong senapan ke belakang (Reaksi).'
  },
  {
    id: 'af5-2', stage: 5, stageLabel: 'AKSI REAKSI',
    text: 'Dari fenomena alam berikut, manakah fakta yang menunjukkan penerapan dari pasangan gaya aksi-reaksi Hukum III Newton?',
    options: [
      'Sebuah mobil direm dan penumpang terdorong ke depan',
      'Kertas di atas meja tetap diam saat taplak ditarik pelan',
      'Seekor gurita bergerak maju di dalam air dengan cara menyemburkan air ke arah belakang',
      'Dua benda jatuh bebas bersamaan'
    ],
    correctIndex: 2,
    explanation: 'Gurita menyemburkan air ke belakang (Aksi), air mendorong gurita ke depan (Reaksi).'
  },
  {
    id: 'af5-3', stage: 5, stageLabel: 'AKSI REAKSI',
    text: 'Sebuah buku diletakkan diam di meja datar. Gaya berat (w) ke bawah dan gaya normal (N) ke atas BUKAN merupakan pasangan gaya aksi-reaksi karena...',
    options: [
      'Nilai kedua gaya tidak sama besar',
      'Kedua gaya bekerja pada objek yang sama yaitu buku',
      'Buku dan permukaan meja tidak saling melekat',
      'Arah kedua gaya searah'
    ],
    correctIndex: 1,
    explanation: 'Aksi-reaksi harus bekerja pada dua benda yang berbeda. w dan N bekerja pada satu benda yang sama (buku), sehingga ini merupakan gaya kesetimbangan (Hukum I), bukan aksi-reaksi.'
  },
  {
    id: 'af5-4', stage: 5, stageLabel: 'AKSI REAKSI',
    text: 'Sebuah roket dapat bergerak meluncur naik ke angkasa luar yang hampa udara karena...',
    options: [
      'Mesin roket memanfaatkan udara atmosfer di sekitarnya untuk mendorong badan roket.',
      'Roket menyemburkan gas hasil pembakaran ke belakang, dan gas memberikan gaya reaksi mendorong roket ke depan.',
      'Gaya gravitasi bumi otomatis hilang saat bahan bakar terbakar.',
      'Gas buang membuat ruang hampa menjadi medan magnet'
    ],
    correctIndex: 1,
    explanation: 'Roket mendorong gas ke belakang (Aksi), gas mendorong roket ke depan (Reaksi). Ini tidak membutuhkan medium udara.'
  },
  {
    id: 'af5-5', stage: 5, stageLabel: 'AKSI REAKSI',
    text: 'Sebuah lampu hias bermassa 3 kg digantung diam pada tali di langit-langit. Berapakah besar gaya reaksi (tegangan tali) yang diberikan tali ke atas untuk menahan lampu? (g=10m/s²)',
    options: [
      '0 Newton',
      '3 Newton',
      '30 Newton',
      '300 Newton'
    ],
    correctIndex: 2,
    explanation: 'Gaya tarik lampu pada tali ke bawah (Aksi) = w = m×g = 30 N. Reaksi tali menarik ke atas sama besarnya yaitu 30 N.'
  },
  {
    id: 'af5-6', stage: 5, stageLabel: 'AKSI REAKSI',
    text: 'Sebuah kotak kayu 100 kg dinaikkan ke atas truk memakai papan miring sudut 30°. Gaya dorong total yang diperlukan jika tanpa gesekan (g=10m/s²) adalah: F = w sin 30°. Berapa gaya aksinya?',
    options: [
      '250 N',
      '500 N',
      '1000 N',
      '0 N'
    ],
    correctIndex: 1,
    explanation: 'F = m × g × sin(30°) = 100 × 10 × 0,5 = 500 N.'
  },
  {
    id: 'af5-7', stage: 5, stageLabel: 'AKSI REAKSI',
    text: 'Anak bermassa 40 kg di atas skateboard 2 kg melompat ke depan dengan percepatan 5 m/s². Berapakah percepatan skateboard yang terhentak ke belakang?',
    options: [
      '0,25 m/s²',
      '5 m/s²',
      '20 m/s²',
      '100 m/s²'
    ],
    correctIndex: 3,
    explanation: 'F_anak = 40 × 5 = 200 N. Reaksi pada skateboard: F = 200 N. a = F / m = 200 / 2 = 100 m/s².'
  },
  {
    id: 'af5-8', stage: 5, stageLabel: 'AKSI REAKSI',
    text: 'Truk kontainer besar menabrak sedan kecil. Sedan ringsek parah, truk hanya lecet. Pernyataan yang benar mengenai besar gaya tabrakan adalah...',
    options: [
      'Truk memberikan gaya yang jauh lebih besar karena bodinya keras',
      'Sedan memberikan gaya pertahanan lebih besar',
      'Gaya yang diberikan truk pada sedan sama besar dengan gaya yang diberikan sedan pada truk.',
      'Tidak ada gaya yang bekerja karena sedan diam'
    ],
    correctIndex: 2,
    explanation: 'Gaya tabrakan (aksi-reaksi) sama besar. Kerusakan berbeda karena struktur bodi dan massa yang berbeda, menyebabkan efek percepatan yang jauh lebih parah pada sedan.'
  },
  {
    id: 'af5-9', stage: 5, stageLabel: 'AKSI REAKSI',
    text: 'Saat berjalan, kita mendorong lantai ke arah belakang agar...',
    options: [
      'Gaya gravitasi menarik kita',
      'Lantai memberikan gaya reaksi yang mendorong tubuh kita maju ke depan',
      'Kita tidak tergelincir',
      'Udara di sekitar menahan kita'
    ],
    correctIndex: 1,
    explanation: 'Saat kaki kita memberikan gaya aksi mendorong lantai ke belakang, lantai membalas dengan gaya reaksi mendorong tubuh kita ke depan.'
  },
  {
    id: 'af5-10', stage: 5, stageLabel: 'AKSI REAKSI',
    text: 'Andi (40 kg) dan Badu (60 kg) berdiri berhadapan di atas sepatu roda. Andi mendorong Badu dengan gaya 60 N. Apa yang terjadi?',
    options: [
      'Hanya Badu yang bergerak karena Andi yang mendorong',
      'Keduanya bergerak mundur saling menjauh',
      'Andi bergerak maju mengikuti dorongannya',
      'Hanya Andi yang bergerak mundur'
    ],
    correctIndex: 1,
    explanation: 'Meskipun Badu diam, tubuh Badu akan memberikan gaya reaksi sebesar 60 N kepada Andi. Akibatnya, baik Andi maupun Badu akan bergerak terpental ke arah berlawanan.'
  }
];
