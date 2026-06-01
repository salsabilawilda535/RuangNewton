// ============================================================
// ProfilePage — Ruang Newton
// Menampilkan dan edit data profil (tersambung ke Supabase)
// ============================================================
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, GraduationCap, Building, Save, Edit3, Shield, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getProfile, saveProfile, type UserProfile } from '../lib/supabase';

export default function ProfilePage() {
  const { state } = useApp();
  const user = state.user;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState<{type: 'success'|'error', msg: string} | null>(null);

  const [profileData, setProfileData] = useState<UserProfile>({
    id: user?.id || '',
    name: user?.username || '',
    class: '',
    school: '',
    email: user?.email || '',
  });

  useEffect(() => {
    let isMounted = true;
    
    // Hard fallback timeout: ensure spinner always disappears after 20.5s
    const fallbackTimer = setTimeout(() => {
      if (isMounted) setLoading(false);
    }, 20500);

    async function fetchProfile() {
      if (!user?.id) {
        if (isMounted) setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const profilePromise = getProfile(user.id);
        const timeoutPromise = new Promise<{data: any, error: any}>((_, reject) => 
          setTimeout(() => reject(new Error('Timeout fetching profile')), 20000)
        );
        const { data } = await Promise.race([profilePromise, timeoutPromise]);
        
        if (data && isMounted) {
          setProfileData({
            id: data.id,
            name: data.name || user.username,
            class: data.class || '',
            school: data.school || '',
            email: data.email || user.email,
          });
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        if (isMounted) setLoading(false);
        clearTimeout(fallbackTimer);
      }
    }
    fetchProfile();

    return () => {
      isMounted = false;
      clearTimeout(fallbackTimer);
    };
  }, [user]);

  const handleSave = async () => {
    if (!user?.id) return;
    setSaving(true);
    setAlert(null);
    
    try {
      const { error } = await saveProfile(profileData);
      if (error) {
        setAlert({ type: 'error', msg: 'Gagal menyimpan profil. ' + error.message });
      } else {
        setAlert({ type: 'success', msg: 'Profil berhasil disimpan!' });
        setIsEditing(false);
      }
    } catch (err: any) {
      setAlert({ type: 'error', msg: err?.message || 'Terjadi kesalahan saat menyimpan.' });
    } finally {
      setSaving(false);
      setTimeout(() => setAlert(null), 3000);
    }
  };

  if (!user) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 font-heading mb-3">Profil Saya</h1>
        <p className="text-slate-500 dark:text-slate-400">Kelola informasi data diri Anda</p>
      </motion.div>

      {/* Alert */}
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className={`flex items-center gap-3 p-4 rounded-xl border ${alert.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400'}`}>
              {alert.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              <span className="font-medium">{alert.msg}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative overflow-hidden bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none"
      >
        {/* Background decoration */}
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(64,224,208,0.2)_0%,transparent_70%)] pointer-events-none" />

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start relative z-10">
          {/* Avatar Area */}
          <div className="flex flex-col items-center gap-4 w-full md:w-auto">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-400 to-green-400 flex items-center justify-center text-4xl font-black text-slate-900 shadow-lg shadow-teal-500/30 border-4 border-white dark:border-slate-800">
              {profileData.name?.[0]?.toUpperCase() ?? 'U'}
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/15 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider">
              <Shield size={14} /> Terverifikasi
            </span>
          </div>

          {/* Form Area */}
          <div className="flex-1 w-full min-w-[250px]">
            {loading ? (
              <div className="flex items-center justify-center h-48 text-slate-500">
                <Loader2 size={40} className="animate-spin text-teal-500" />
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div>
                  <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
                    <User size={16} className="text-teal-500" />
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-xl border bg-white/50 dark:bg-slate-950/50 text-slate-800 dark:text-slate-100 transition-all ${isEditing ? 'border-teal-400 focus:ring-4 focus:ring-teal-400/20 focus:outline-none' : 'border-slate-200 dark:border-slate-800 opacity-70 cursor-not-allowed'}`}
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
                    <GraduationCap size={16} className="text-teal-500" />
                    Kelas
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-xl border bg-white/50 dark:bg-slate-950/50 text-slate-800 dark:text-slate-100 transition-all ${isEditing ? 'border-teal-400 focus:ring-4 focus:ring-teal-400/20 focus:outline-none' : 'border-slate-200 dark:border-slate-800 opacity-70 cursor-not-allowed'}`}
                    placeholder="Contoh: X MIPA 1"
                    value={profileData.class}
                    onChange={(e) => setProfileData({ ...profileData, class: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
                    <Building size={16} className="text-teal-500" />
                    Sekolah
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-xl border bg-white/50 dark:bg-slate-950/50 text-slate-800 dark:text-slate-100 transition-all ${isEditing ? 'border-teal-400 focus:ring-4 focus:ring-teal-400/20 focus:outline-none' : 'border-slate-200 dark:border-slate-800 opacity-70 cursor-not-allowed'}`}
                    placeholder="Nama Sekolah"
                    value={profileData.school}
                    onChange={(e) => setProfileData({ ...profileData, school: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
                    <Mail size={16} className="text-teal-500" />
                    Akun Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-500 opacity-60 cursor-not-allowed"
                    value={profileData.email}
                    disabled
                  />
                  <span className="text-xs text-slate-500 mt-2 block">Email terikat dengan akun Supabase dan tidak dapat diubah di sini.</span>
                </div>

                <div className="flex justify-end gap-4 mt-4">
                  {isEditing ? (
                    <>
                      <button 
                        className="px-6 py-2.5 rounded-xl font-semibold text-slate-600 dark:text-slate-300 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                        onClick={() => setIsEditing(false)} 
                        disabled={saving}
                      >
                        Batal
                      </button>
                      <button 
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-slate-900 bg-teal-400 hover:bg-teal-300 shadow-lg shadow-teal-400/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        onClick={handleSave} 
                        disabled={saving}
                      >
                        {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        Simpan Data
                      </button>
                    </>
                  ) : (
                    <button 
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-slate-900 bg-teal-400 hover:bg-teal-300 shadow-lg shadow-teal-400/30 transition-all"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit3 size={18} />
                      Edit Profil
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
