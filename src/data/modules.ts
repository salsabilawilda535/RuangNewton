// ============================================================
// Data Modul — Ruang Newton
// Berisi materi fisika sesuai flowchart: INERSIA, KONSEP GAYA,
// JENIS GAYA, BIDANG MIRING, AKSI REAKSI
// ============================================================

export interface CourseModule {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  content: string;
  color: string;
}

export const modules: CourseModule[] = [
  {
    id: 'inersia',
    title: 'Inersia',
    subtitle: 'Hukum Newton I',
    icon: '🔵',
    color: 'from-blue-500 to-cyan-400',
    description:
      'Pelajari konsep inersia (kelembaman) dan Hukum Newton Pertama tentang gerak benda.',
    content: `
## Inersia (Kelembaman)

**Inersia** adalah kecenderungan suatu benda untuk mempertahankan keadaannya — baik diam maupun bergerak lurus beraturan — kecuali ada gaya luar yang memaksanya berubah.

### Hukum Newton I

> *"Setiap benda akan tetap diam atau bergerak lurus beraturan, kecuali ada gaya luar yang bekerja padanya."*

**Rumus:**  
\\[ \\sum F = 0 \\Rightarrow a = 0 \\]

Artinya jika resultan gaya pada benda = 0, maka benda tidak mengalami percepatan.

### Contoh di Kehidupan Nyata

- 🚗 **Penumpang terdorong ke belakang** saat mobil tiba-tiba bergerak maju.
- 🛑 **Penumpang terdorong ke depan** saat mobil tiba-tiba berhenti.
- 🪐 **Planet bergerak mengelilingi matahari** karena tidak ada hambatan di luar angkasa.

### Faktor yang Mempengaruhi Inersia

Semakin **besar massa** suatu benda, semakin **besar inersianya** (semakin sulit diubah geraknya).

\\[ \\text{Inersia} \\propto m \\]

### Latihan Soal

1. Sebuah buku diletakkan di atas meja. Gaya apa saja yang bekerja pada buku?
2. Mengapa kita perlu memakai sabuk pengaman saat berkendara?
3. Sebutkan 3 contoh inersia dalam kehidupan sehari-hari!
    `,
  },
  {
    id: 'konsep-gaya',
    title: 'Konsep Gaya',
    subtitle: 'Hukum Newton II',
    icon: '⚡',
    color: 'from-violet-500 to-purple-400',
    description:
      'Memahami konsep gaya, resultan gaya, dan Hukum Newton Kedua tentang percepatan.',
    content: `
## Konsep Gaya

**Gaya** adalah tarikan atau dorongan yang dapat mengubah keadaan gerak suatu benda. Gaya memiliki besar dan arah (besaran vektor).

### Hukum Newton II

> *"Percepatan suatu benda berbanding lurus dengan resultan gaya yang bekerja padanya dan berbanding terbalik dengan massanya."*

**Rumus:**  
\\[ F = m \\cdot a \\]

| Simbol | Satuan | Keterangan |
|--------|--------|-----------|
| F | Newton (N) | Gaya |
| m | kilogram (kg) | Massa |
| a | m/s² | Percepatan |

### Jenis-jenis Gaya

| Gaya | Penjelasan |
|------|-----------|
| Gaya gravitasi (w) | w = mg, arah ke bawah |
| Gaya normal (N) | Tegak lurus permukaan |
| Gaya gesek (f) | Berlawanan arah gerak |
| Gaya tegangan tali (T) | Searah tali |

### Contoh Soal

Sebuah benda bermassa **5 kg** mendapat gaya **20 N**. Hitunglah percepatannya!

\\[ a = \\frac{F}{m} = \\frac{20}{5} = 4 \\text{ m/s}^2 \\]

### Latihan

1. Jika massa benda dua kali lipat dengan gaya tetap, bagaimana percepatannya?
2. Benda 10 kg percepatan 3 m/s². Berapa gaya yang bekerja?
    `,
  },
  {
    id: 'jenis-gaya',
    title: 'Jenis Gaya',
    subtitle: 'Klasifikasi Gaya Fisika',
    icon: '🎯',
    color: 'from-emerald-500 to-teal-400',
    description:
      'Mengenal berbagai jenis gaya yang ada dalam fisika dan penerapannya.',
    content: `
## Jenis-jenis Gaya dalam Fisika

### 1. Gaya Gravitasi

Gaya tarik yang dimiliki oleh semua benda bermassa. Gaya gravitasi bumi menarik semua benda ke arah pusat bumi.

\\[ w = m \\cdot g \\]

g = 9,8 m/s² ≈ 10 m/s² (pada permukaan bumi)

### 2. Gaya Normal

Gaya yang bekerja tegak lurus terhadap bidang kontak. Selalu tegak lurus permukaan bidang.

### 3. Gaya Gesek

Gaya yang melawan gerak relatif dua permukaan yang bersentuhan.

**Gaya Gesek Statis:**  
\\[ f_s \\leq \\mu_s \\cdot N \\]

**Gaya Gesek Kinetis:**  
\\[ f_k = \\mu_k \\cdot N \\]

### 4. Gaya Pegas (Elastis)

\\[ F = k \\cdot x \\]

k = konstanta pegas (N/m), x = pertambahan panjang (m)

### 5. Gaya Tegangan Tali

Gaya yang timbul pada tali akibat beban. Arah tegangan tali selalu sepanjang tali, menjauhi titik beban.

### Perbandingan

| Jenis Gaya | Arah | Contoh |
|-----------|------|--------|
| Gravitasi | Ke bawah | Buah jatuh |
| Normal | Tegak lurus permukaan | Buku di meja |
| Gesek | Melawan gerak | Rem mobil |
| Pegas | Berlawanan deformasi | Timbangan |
| Tegangan tali | Sepanjang tali | Lift |

### Latihan

1. Jelaskan perbedaan gaya gesek statis dan kinetis!
2. Sebuah pegas memiliki k = 200 N/m. Jika ditarik 0,05 m, berapa gaya pegas?
    `,
  },
  {
    id: 'bidang-miring',
    title: 'Bidang Miring',
    subtitle: 'Aplikasi Gaya pada Bidang Miring',
    icon: '📐',
    color: 'from-orange-500 to-amber-400',
    description:
      'Analisis gaya dan gerak benda pada bidang miring dengan dan tanpa gesekan.',
    content: `
## Bidang Miring

Bidang miring adalah permukaan datar yang membentuk sudut θ terhadap horizontal. Bidang miring memudahkan pemindahan benda ke tempat lebih tinggi dengan gaya lebih kecil.

### Komponen Gaya pada Bidang Miring

Pada benda di bidang miring, berat (w = mg) diuraikan menjadi dua komponen:

\\[ w_x = mg \\sin\\theta \\quad \\text{(sejajar bidang, ke bawah)} \\]
\\[ w_y = mg \\cos\\theta \\quad \\text{(tegak lurus bidang)} \\]

### Gaya Normal

\\[ N = mg \\cos\\theta \\]

### Percepatan Tanpa Gesekan

\\[ a = g \\sin\\theta \\]

### Percepatan Dengan Gesekan

\\[ a = g(\\sin\\theta - \\mu_k \\cos\\theta) \\]

### Keuntungan Mekanik

\\[ KM = \\frac{l}{h} = \\frac{1}{\\sin\\theta} \\]

Semakin landai bidang miring, semakin kecil gaya yang diperlukan.

### Contoh Soal

Sebuah benda bermassa **10 kg** berada di bidang miring sudut **30°** (tanpa gesekan). Hitunglah percepatannya!

\\[ a = g \\sin 30° = 10 \\times 0{,}5 = 5 \\text{ m/s}^2 \\]

### Penerapan

- 🏔️ Jalan berkelok di pegunungan
- 🪛 Ulir sekrup
- 💉 Jarum suntik
- ⚓ Baji

### Latihan

1. Benda 5 kg di bidang miring 45°, μk = 0,2. Berapa percepatannya?
2. Mengapa jalan menuju puncak gunung dibuat berkelok-kelok?
    `,
  },
  {
    id: 'aksi-reaksi',
    title: 'Aksi–Reaksi',
    subtitle: 'Hukum Newton III',
    icon: '🔄',
    color: 'from-rose-500 to-pink-400',
    description:
      'Memahami Hukum Newton Ketiga: setiap aksi selalu ada reaksi yang sama besar dan berlawanan arah.',
    content: `
## Aksi–Reaksi (Hukum Newton III)

> *"Jika benda A memberikan gaya pada benda B (aksi), maka benda B akan memberikan gaya pada benda A (reaksi) yang besarnya sama tetapi arahnya berlawanan."*

**Rumus:**  
\\[ F_{\\text{aksi}} = -F_{\\text{reaksi}} \\]

\\[ |F_{AB}| = |F_{BA}| \\]

### Ciri-ciri Pasangan Aksi-Reaksi

1. ✅ Besarnya **sama**
2. ✅ Arahnya **berlawanan**
3. ✅ Bekerja pada **dua benda yang berbeda**
4. ✅ Berjenis gaya **sama**
5. ✅ **Tidak saling menghilangkan** (karena bekerja pada benda berbeda)

### Contoh Pasangan Aksi-Reaksi

| Aksi | Reaksi |
|------|--------|
| Bumi menarik apel (gravitasi) | Apel menarik bumi |
| Kaki mendorong lantai ke belakang | Lantai mendorong kaki ke depan |
| Roket menyemburkan gas ke bawah | Gas mendorong roket ke atas |
| Peluru didorong ke depan | Pistol terdorong ke belakang (recoil) |

### Analisis Diagram Benda Bebas

Ketika kamu berdiri di lantai:
- **Aksi:** Beratmu (w) = gaya gravitasi bumi pada tubuhmu (ke bawah)
- **Reaksi:** Gaya gravitasi tubuhmu pada bumi (ke atas)
- **Normal:** Lantai mendorong kaki ke atas (N) ≠ reaksi dari w

⚠️ **Perhatian:** Gaya normal bukan pasangan aksi-reaksi dari berat!

### Penerapan Aksi-Reaksi

- 🚀 **Roket:** Gas menyembur ke bawah → roket naik
- 🚣 **Dayung:** Dayung mendorong air → perahu maju
- 🏊 **Renang:** Tangan mendorong air → tubuh maju
- 🔫 **Senjata:** Peluru keluar → recoil ke belakang

### Latihan

1. Saat berjalan, gaya apa yang merupakan pasangan aksi-reaksi?
2. Mengapa astronot di luar angkasa bisa bergerak dengan melempar benda?
3. Identifikasi 3 pasangan aksi-reaksi dalam kehidupan sehari-hari!
    `,
  },
];
