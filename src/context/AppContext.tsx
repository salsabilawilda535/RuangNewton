// ============================================================
// AppContext — Ruang Newton
// Global state management using React Context + useReducer
// ============================================================
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from 'react';
import type { AppState, AppAction, User, TestResult, ActiveSection } from '../types';
import { supabase, getTestResults } from '../lib/supabase';

// ── Initial State ──────────────────────────────────────────
const initialState: AppState = {
  user: null,
  activeSection: 'home',
  testResults: [],
  isLoading: true,
};

// ── Reducer ────────────────────────────────────────────────
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isLoading: false };
    case 'SET_SECTION':
      return { ...state, activeSection: action.payload };
    case 'ADD_RESULT':
      return { ...state, testResults: [...state.testResults, action.payload] };
    case 'SET_RESULTS':
      return { ...state, testResults: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

// ── Context ────────────────────────────────────────────────
interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  navigate: (section: ActiveSection) => void;
  logout: () => Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

// ── Provider ───────────────────────────────────────────────
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  /** Navigate to a section (hides all others) */
  const navigate = (section: ActiveSection) => {
    dispatch({ type: 'SET_SECTION', payload: section });
  };

  /** Sign out from Supabase */
  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      dispatch({ type: 'SET_USER', payload: null });
      navigate('home');
    }
  };

  // On mount: check if user is already logged in via Supabase session
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Supabase Auth Error:", error.message);
          return;
        }

        if (session?.user) {
          const user: User = {
            id: session.user.id,
            username: session.user.user_metadata?.username ?? session.user.email ?? 'User',
            email: session.user.email ?? '',
            createdAt: session.user.created_at,
          };
          dispatch({ type: 'SET_USER', payload: user });

          // Load test results in the background so it doesn't block the loading screen
          getTestResults(session.user.id).then(({ data, error }) => {
            if (error) {
              console.error("Error fetching test results:", error);
              return;
            }
            if (data) {
              const results: TestResult[] = data.map((r: Record<string, unknown>) => ({
                id: r.id as string,
                user_id: r.user_id as string,
                af_level: r.af_level as string,
                score: r.score as number,
                passed: r.passed as boolean,
                created_at: r.created_at as string,
              }));
              dispatch({ type: 'SET_RESULTS', payload: results });
            }
          }).catch(err => console.error("Exception fetching test results:", err));
        }
      } catch (err) {
        console.error("Unexpected error during initAuth:", err);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const user: User = {
            id: session.user.id,
            username: session.user.user_metadata?.username ?? session.user.email ?? 'User',
            email: session.user.email ?? '',
            createdAt: session.user.created_at,
          };
          dispatch({ type: 'SET_USER', payload: user });
          
          // reload test results on sign in with timeout
          const timeoutPromise = new Promise<{data: any, error: any}>((_, reject) => 
            setTimeout(() => reject(new Error('Timeout fetching results')), 10000)
          );
          
          try {
            const { data } = await Promise.race([getTestResults(session.user.id), timeoutPromise]);
            if (data) {
              const results: TestResult[] = data.map((r: Record<string, unknown>) => ({
                id: r.id as string,
                user_id: r.user_id as string,
                af_level: r.af_level as string,
                score: r.score as number,
                passed: r.passed as boolean,
                created_at: r.created_at as string,
              }));
              dispatch({ type: 'SET_RESULTS', payload: results });
            }
          } catch (err) {
            console.error("Timeout or error on auth state change:", err);
          }
        } else if (event === 'SIGNED_OUT') {
          dispatch({ type: 'SET_USER', payload: null });
          navigate('home');
        }
      }
    );

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, navigate, logout }}>
      {children}
    </AppContext.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────────
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
