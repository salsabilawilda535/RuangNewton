// ============================================================
// AuthPage — Ruang Newton
// Login & Register with Supabase Auth + tabs switcher
// Follows flowchart: register → validate → redirect login
// ============================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, UserPlus, LogIn, AlertCircle, CheckCircle } from 'lucide-react';
import { registerUser, loginUser } from '../lib/supabase';
import { useApp } from '../context/AppContext';
import type { User } from '../types';
import { supabase } from '../lib/supabase';
import logoImg from '../assets/lampiran 13.png';

type Tab = 'login' | 'register';
type AlertType = { type: 'success' | 'error'; message: string } | null;

export default function AuthPage() {
  const { dispatch, navigate } = useApp();
  const [tab, setTab] = useState<Tab>('login');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertType>(null);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);

  // Login form state
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  // Register form state
  const [regForm, setRegForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // ── Login Handler ────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);
    setLoading(true);

    try {
      const { data, error } = await loginUser(loginForm.email, loginForm.password);

      if (error) {
        setAlert({ type: 'error', message: 'Username atau password salah. Silakan coba lagi.' });
        return;
      }

      if (data.session?.user) {
        const user: User = {
          id: data.session.user.id,
          username: data.session.user.user_metadata?.username ?? loginForm.email,
          email: data.session.user.email ?? '',
          createdAt: data.session.user.created_at,
        };
        dispatch({ type: 'SET_USER', payload: user });
        navigate('home');
      }
    } catch (err: any) {
      setAlert({ type: 'error', message: err?.message || 'Terjadi kesalahan. Coba lagi.' });
    } finally {
      setLoading(false);
    }
  };

  // ── Register Handler ─────────────────────────────────────
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    // ── Validasi sesuai flowchart ──
    if (regForm.username.trim().length < 3) {
      setAlert({ type: 'error', message: 'Username minimal 3 karakter.' });
      return;
    }
    if (regForm.password.length < 8) {
      setAlert({ type: 'error', message: 'Password minimal 8 karakter.' });
      return;
    }
    if (regForm.password !== regForm.confirmPassword) {
      setAlert({ type: 'error', message: 'Password dan konfirmasi password harus sama.' });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await registerUser(
        regForm.email,
        regForm.password
      );

      if (error) {
        if (error.message.includes('already registered') || error.message.includes('already exists')) {
          setAlert({ type: 'error', message: 'Email sudah terdaftar. Silakan login.' });
        } else {
          setAlert({ type: 'error', message: error.message });
        }
        return;
      }

      if (data.user) {
        // Create profile in profiles table
        await supabase.from('profiles').upsert({
          id: data.user.id,
          name: regForm.username.trim(),
        });

        // Tampilkan popup verifikasi
        setShowVerificationPopup(true);
      }
    } catch (err: any) {
      setAlert({ type: 'error', message: err?.message || 'Terjadi kesalahan. Coba lagi.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-50">
      {/* Background decorative circles */}
      <div className="absolute -top-32 -right-20 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(64,224,208,0.2)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute -bottom-24 -left-16 w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(91,215,135,0.15)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[440px] relative z-10"
      >
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-green-400 mb-4 shadow-lg shadow-teal-400/30">
          <img src={logoImg} alt="Ruang Newton Logo" className="w-16 h-16 object-contain" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 font-heading">Ruang Newton</h1>
          <p className="text-sm mt-1 text-slate-500 font-medium">
            Platform Edukasi Fisika Interaktif
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-8 shadow-xl shadow-slate-200/50">
          {/* Tabs */}
          <div className="flex bg-slate-100/80 rounded-xl p-1.5 mb-7">
            {(['login', 'register'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setAlert(null); }}
                className={`flex-1 py-2.5 rounded-lg border-none text-sm font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 ${
                  tab === t
                    ? 'bg-gradient-to-br from-teal-400 to-green-400 text-slate-900 shadow-md shadow-teal-400/20'
                    : 'bg-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {t === 'login' ? <LogIn size={16} /> : <UserPlus size={16} />}
                {t === 'login' ? 'Login' : 'Register'}
              </button>
            ))}
          </div>

          {/* Alert */}
          <AnimatePresence mode="wait">
            {alert && (
              <motion.div
                key="alert"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-5"
              >
                <div className={`flex items-center gap-2 p-3.5 rounded-xl border text-sm font-medium ${
                  alert.type === 'success' 
                    ? 'bg-green-500/10 border-green-500/30 text-green-600' 
                    : 'bg-red-500/10 border-red-500/30 text-red-600'
                }`}>
                  {alert.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                  {alert.message}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Form */}
          <AnimatePresence mode="wait">
            {tab === 'login' ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleLogin}
                className="flex flex-col gap-5"
              >
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-600">
                    <Mail size={14} className="inline mr-1.5 text-teal-500" />
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20 outline-none transition-all"
                    placeholder="email@example.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    required
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-600">
                    <Lock size={14} className="inline mr-1.5 text-teal-500" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20 outline-none transition-all pr-12"
                      placeholder="Masukkan password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-teal-400 hover:bg-teal-300 text-slate-900 font-bold rounded-xl shadow-lg shadow-teal-400/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                  disabled={loading}
                >
                  {loading ? 'Sedang login...' : (
                    <><LogIn size={18} />Login</>
                  )}
                </button>

                <p className="text-center mt-2 text-sm text-slate-500">
                  Belum punya akun?{' '}
                  <button
                    type="button"
                    onClick={() => setTab('register')}
                    className="font-bold text-teal-500 hover:text-teal-600 transition-colors"
                  >
                    Daftar sekarang
                  </button>
                </p>
              </motion.form>
            ) : (
              /* Register Form */
              <motion.form
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleRegister}
                className="flex flex-col gap-4"
              >
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-600">
                    Username <span className="text-teal-500 text-xs">(min. 3 karakter)</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20 outline-none transition-all"
                    placeholder="Nama pengguna unik"
                    value={regForm.username}
                    onChange={(e) => setRegForm({ ...regForm, username: e.target.value })}
                    required
                    minLength={3}
                    autoComplete="username"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-600">
                    <Mail size={14} className="inline mr-1.5 text-teal-500" />
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20 outline-none transition-all"
                    placeholder="email@example.com"
                    value={regForm.email}
                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                    required
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-600">
                    <Lock size={14} className="inline mr-1.5 text-teal-500" />
                    Password <span className="text-teal-500 text-xs">(min. 8 karakter)</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20 outline-none transition-all pr-12"
                      placeholder="Password kuat"
                      value={regForm.password}
                      onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                      required
                      minLength={8}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-600">
                    Konfirmasi Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20 outline-none transition-all pr-12"
                      placeholder="Ulangi password"
                      value={regForm.confirmPassword}
                      onChange={(e) => setRegForm({ ...regForm, confirmPassword: e.target.value })}
                      required
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-teal-400 hover:bg-teal-300 text-slate-900 font-bold rounded-xl shadow-lg shadow-teal-400/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                  disabled={loading}
                >
                  {loading ? 'Mendaftarkan...' : (
                    <><UserPlus size={18} />Register</>
                  )}
                </button>

                <p className="text-center mt-2 text-sm text-slate-500">
                  Sudah punya akun?{' '}
                  <button
                    type="button"
                    onClick={() => setTab('login')}
                    className="font-bold text-teal-500 hover:text-teal-600 transition-colors"
                  >
                    Login di sini
                  </button>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center mt-8 text-xs font-medium text-slate-400">
          © 2025 Ruang Newton — Platform Edukasi Fisika
        </p>
      </motion.div>

      {/* Verification Modal */}
      <AnimatePresence>
        {showVerificationPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative"
            >
              <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-10 h-10 text-teal-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3 font-heading">Verifikasi Email</h3>
              <p className="text-slate-600 mb-8 text-sm leading-relaxed">
                Kami telah mengirimkan link verifikasi ke <strong className="text-slate-800">{regForm.email}</strong>. 
                Silakan cek kotak masuk atau folder spam Anda dan klik link tersebut untuk mengaktifkan akun.
              </p>
              <button 
                 onClick={() => {
                   setShowVerificationPopup(false);
                   setTab('login');
                   setLoginForm({ email: regForm.email, password: '' });
                   setAlert({ type: 'success', message: 'Silakan login setelah Anda memverifikasi email Anda.' });
                   setRegForm({ username: '', email: '', password: '', confirmPassword: '' });
                 }}
                 className="w-full py-3.5 bg-teal-400 hover:bg-teal-300 text-slate-900 font-bold rounded-xl shadow-lg shadow-teal-400/30 transition-all"
              >
                Selesai
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
