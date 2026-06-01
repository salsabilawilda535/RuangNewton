// ============================================================
// App.tsx — Ruang Newton
// Root component: auth guard + section routing
// ============================================================
import { motion, AnimatePresence } from 'framer-motion';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import AuthPage from './components/AuthPage';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ProfilePage from './components/ProfilePage';
import ModulPage from './components/ModulPage';
import TestPage from './components/TestPage';
import ResultPage from './components/ResultPage';
import ProjectPage from './components/ProjectPage';
import PanduanPage from './components/PanduanPage';

// ── Loading Spinner ────────────────────────────────────────
function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-50">
      <div className="w-16 h-16 rounded-full border-4 border-teal-400/20 border-t-teal-400 animate-spin" />
      <p className="text-slate-500 text-sm font-heading font-medium">
        Memuat Ruang Newton...
      </p>
    </div>
  );
}

// ── Inner App (inside context) ─────────────────────────────
function AppInner() {
  const { state } = useApp();

  // Show loading while checking auth session
  if (state.isLoading) return <LoadingScreen />;

  // Require auth: if no user is logged in, show AuthPage
  if (!state.user) return <AuthPage />;

  // Main app rendering
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {state.activeSection === 'home'    && <HomePage />}
            {state.activeSection === 'about'   && <AboutPage />}
            {state.activeSection === 'profile' && <ProfilePage />}
            {state.activeSection === 'modul'   && <ModulPage />}
            {state.activeSection === 'test'    && <TestPage />}
            {state.activeSection === 'result'  && <ResultPage />}
            {state.activeSection === 'project' && <ProjectPage />}
            {state.activeSection === 'panduan' && <PanduanPage />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

// ── Root App with Provider ─────────────────────────────────
export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
