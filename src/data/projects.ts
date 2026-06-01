// ============================================================
// Data Project — Ruang Newton
// ============================================================

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  contact: string;
  contactType: 'email' | 'whatsapp' | 'instagram';
  imageGradient: string;
}

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'Simulasi Hukum Newton I',
    description:
      'Simulasi interaktif tentang inersia menggunakan animasi berbasis JavaScript. Pengguna dapat melihat bagaimana benda berperilaku saat gaya eksternal tiba-tiba dihilangkan atau diterapkan.',
    tags: ['JavaScript', 'Animasi', 'Fisika', 'Simulasi'],
    contact: 'naufalheritage@email.com',
    contactType: 'email',
    imageGradient: 'from-blue-600 to-cyan-400',
  },
  {
    id: 'proj-2',
    title: 'Kalkulator Gaya & Percepatan',
    description:
      'Aplikasi web kalkulator gaya yang menghitung percepatan, massa, atau gaya berdasarkan Hukum Newton II. Dilengkapi visualisasi diagram vektor gaya secara real-time.',
    tags: ['React', 'TypeScript', 'Kalkulator', 'Newton II'],
    contact: 'https://wa.me/6281234567890',
    contactType: 'whatsapp',
    imageGradient: 'from-violet-600 to-purple-400',
  },
  {
    id: 'proj-3',
    title: 'Visualisasi Bidang Miring',
    description:
      'Visualisasi 2D interaktif tentang gaya-gaya pada bidang miring. User dapat mengubah sudut kemiringan dan koefisien gesek, lalu melihat komponen gaya secara dinamis.',
    tags: ['Canvas API', 'Trigonometri', 'Interaktif', 'Bidang Miring'],
    contact: 'https://instagram.com/ruang.newton',
    contactType: 'instagram',
    imageGradient: 'from-orange-500 to-amber-400',
  },
  {
    id: 'proj-4',
    title: 'Animasi Aksi-Reaksi Newton III',
    description:
      'Proyek animasi yang mendemonstrasikan Hukum Newton III dengan contoh nyata: roket, dayung perahu, dan permainan tumbukan benda. Dibuat untuk membantu pemahaman siswa SMA.',
    tags: ['CSS Animation', 'Newton III', 'Edukasi', 'Visual'],
    contact: 'naufalheritage@email.com',
    contactType: 'email',
    imageGradient: 'from-rose-500 to-pink-400',
  },
  {
    id: 'proj-5',
    title: 'Game Fisika: Gaya Gesek',
    description:
      'Game edukasi sederhana berbasis web tentang gaya gesek. Pemain harus memilih koefisien gesek yang tepat agar benda dapat berhenti tepat di titik target. Menyenangkan dan edukatif!',
    tags: ['Game', 'Gaya Gesek', 'Gamification', 'Edukasi'],
    contact: 'https://wa.me/6281234567890',
    contactType: 'whatsapp',
    imageGradient: 'from-emerald-500 to-teal-400',
  },
];
