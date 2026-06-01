// ============================================================
// Navbar Component — Ruang Newton
// Responsive navigation with active state and mobile menu
// ============================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Info, User, BookOpen, FileQuestion, BarChart3,
  Folder, HelpCircle, LogOut, Menu, X,
} from 'lucide-react';
import logoImg from '../assets/lampiran 13.png';
import { useApp } from '../context/AppContext';
import type { ActiveSection } from '../types';

// Nav items configuration
const navItems: { label: string; section: ActiveSection; icon: typeof Home }[] = [
  { label: 'Home',         section: 'home',    icon: Home         },
  { label: 'About Us',     section: 'about',   icon: Info         },
  { label: 'Profile',      section: 'profile', icon: User         },
  { label: 'Materi',       section: 'modul',   icon: BookOpen     },
  { label: 'Test',         section: 'test',    icon: FileQuestion },
  { label: 'Result',       section: 'result',  icon: BarChart3    },
  { label: 'Project',      section: 'project', icon: Folder       },
  { label: 'Panduan Web',  section: 'panduan', icon: HelpCircle   },
];

export default function Navbar() {
  const { state, navigate, logout } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (section: ActiveSection) => {
    navigate(section);
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 h-20 px-4 md:px-8 flex items-center justify-between shadow-sm">
      {/* Logo */}
      <button
        className="flex items-center gap-2 font-heading font-extrabold text-xl text-slate-800 hover:text-teal-500 transition-colors"
        onClick={() => handleNav('home')}
      >
        <img src={logoImg} alt="Ruang Newton Logo" className="h-10 w-10 object-contain shrink-0" />
        <span>Ruang Newton</span>
      </button>

      {/* Desktop Nav */}
      <div className="hidden lg:flex items-center gap-1">
        {navItems.map(({ label, section, icon: Icon }) => {
          const isActive = state.activeSection === section;
          return (
            <button
              key={section}
              onClick={() => handleNav(section)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                isActive 
                  ? 'bg-teal-400/10 text-teal-600 font-bold' 
                  : 'text-slate-500 hover:text-teal-500 hover:bg-teal-400/5'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          );
        })}
      </div>

      {/* Right: User + Logout (Desktop) */}
      <div className="hidden lg:flex items-center gap-6">
        {state.user ? (
          <>
            <div className="flex items-center gap-3 text-slate-600 text-sm font-semibold">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-green-400 flex items-center justify-center font-bold text-slate-900 shadow-sm">
                {state.user.username?.[0]?.toUpperCase() ?? 'U'}
              </div>
              <span>{state.user.username ?? 'User'}</span>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-full text-sm transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => handleNav('auth')}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-teal-400 to-green-400 hover:from-teal-500 hover:to-green-500 text-white font-bold rounded-full text-sm shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <User size={16} />
            Login / Daftar
          </button>
        )}
      </div>

      {/* Mobile hamburger */}
      <button
        className="lg:hidden p-2 text-slate-500 hover:text-teal-500 transition-colors"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-200 p-6 flex flex-col gap-2 z-50 shadow-2xl"
          >
            {navItems.map(({ label, section, icon: Icon }) => {
              const isActive = state.activeSection === section;
              return (
                <button
                  key={section}
                  onClick={() => handleNav(section)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${
                    isActive 
                      ? 'bg-teal-400/10 text-teal-600' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={20} />
                  {label}
                </button>
              );
            })}
            <div className="h-px bg-slate-200 my-4" />
            {state.user && (
              <div className="flex items-center gap-3 px-4 py-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-green-400 flex items-center justify-center font-bold text-slate-900 shadow-sm">
                  {state.user?.username?.[0]?.toUpperCase() ?? 'U'}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-slate-800">{state.user?.username ?? 'User'}</span>
                  <span className="text-xs text-slate-500 truncate max-w-[200px]">{state.user?.email ?? ''}</span>
                </div>
              </div>
            )}
            {/* Mobile Logout/Login */}
            <div className="p-4 border-t border-slate-100">
              {state.user ? (
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-semibold transition-colors"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => handleNav('auth')}
                  className="flex w-full items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-green-400 text-white font-bold shadow-md transition-transform active:scale-95"
                >
                  <User size={20} />
                  Login / Daftar
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
