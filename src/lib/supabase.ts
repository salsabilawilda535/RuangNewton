// ============================================================
// Supabase Client — Ruang Newton
// ============================================================
import { createClient } from '@supabase/supabase-js';

// Ganti dengan credentials Supabase Anda di file .env.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================================
// Auth Helpers
// ============================================================

/**
 * Register user baru dengan email + password.
 */
export async function registerUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

/**
 * Login dengan email + password.
 */
export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

/**
 * Logout user saat ini.
 */
export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * Ambil session aktif.
 */
export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// ============================================================
// Profile Helpers
// ============================================================

export interface UserProfile {
  id: string;
  name: string;
  class: string;
  school: string;
  email: string;
}

/**
 * Mengambil data profile pengguna.
 */
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
  return { data, error };
}

/**
 * Menyimpan atau memperbarui data profile.
 */
export async function saveProfile(profile: UserProfile) {
  const { data, error } = await supabase
    .from('profiles')
    .upsert(profile)
    .select()
    .maybeSingle();
  return { data, error };
}

// ============================================================
// Test Results Helpers
// ============================================================

export interface TestResult {
  user_id: string;
  af_level: string;
  score: number;
  passed: boolean;
}

/**
 * Simpan hasil kuis ke tabel test_results.
 */
export async function saveTestResult(result: TestResult) {
  const { data, error } = await supabase
    .from('test_results')
    .insert([result])
    .select();
  return { data, error };
}

/**
 * Ambil semua hasil kuis untuk user tertentu.
 */
export async function getTestResults(userId: string) {
  const { data, error } = await supabase
    .from('test_results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });
  return { data, error };
}
