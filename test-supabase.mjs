import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pkirfmecyxlxuoqwlvbu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBraXJmbWVjeXhseHVvcXdsdmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2ODEyMDksImV4cCI6MjA5NTI1NzIwOX0.JCbqyAOdPuOOSjwStF-uGTLnkq8_oqWkH0A7t7w77_w';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const tCols = ['id', 'user_id', 'score', 'passed', 'created_at', 'skor', 'lulus'];
  for (const col of tCols) {
    const { error } = await supabase.from('test_results').insert([
      { [col]: null }
    ]).select();
    if (error && error.code === 'PGRST204') {
      console.log(`test_results.${col} is MISSING.`);
    } else {
      console.log(`test_results.${col} EXISTS!`);
    }
  }

  const pCols = ['id', 'created_at', 'updated_at', 'user_id'];
  for (const col of pCols) {
    const { error } = await supabase.from('profiles').insert([
      { [col]: null }
    ]).select();
    if (error && error.code === 'PGRST204') {
      console.log(`profiles.${col} is MISSING.`);
    } else {
      console.log(`profiles.${col} EXISTS!`);
    }
  }
}

test();
