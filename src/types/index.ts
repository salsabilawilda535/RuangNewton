// ============================================================
// Types & Interfaces — Ruang Newton
// ============================================================

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface CourseModule {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  content: string;
  color: string;
}

export interface Question {
  id: string;
  stage: number;          // AF1=1, AF2=2, ..., AF5=5
  stageLabel: string;     // e.g. "INERSIA"
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TestResult {
  id?: string;
  user_id: string;
  af_level: string;
  score: number;
  passed: boolean;
  created_at?: string;
}

export interface StageResult {
  stage: number;
  stageLabel: string;
  correct: boolean;
  attempts: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  contact: string;
  contactType: 'email' | 'whatsapp' | 'instagram';
  imageGradient: string;
}

export type ActiveSection =
  | 'auth'
  | 'home'
  | 'about'
  | 'profile'
  | 'modul'
  | 'test'
  | 'result'
  | 'project'
  | 'panduan';

export interface AppState {
  user: User | null;
  activeSection: ActiveSection;
  testResults: TestResult[];
  isLoading: boolean;
}

export type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_SECTION'; payload: ActiveSection }
  | { type: 'ADD_RESULT'; payload: TestResult }
  | { type: 'SET_RESULTS'; payload: TestResult[] }
  | { type: 'SET_LOADING'; payload: boolean };
