import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pkirfmecyxlxuoqwlvbu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBraXJmbWVjeXhseHVvcXdsdmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2ODEyMDksImV4cCI6MjA5NTI1NzIwOX0.JCbqyAOdPuOOSjwStF-uGTLnkq8_oqWkH0A7t7w77_w';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { error } = await supabase.from('test_results').insert([
    { af_level: null }
  ]).select();
  if (error && error.code === 'PGRST204') {
    console.log("test_results.af_level is MISSING.");
  } else {
    console.log("test_results.af_level EXISTS!");
  }

  const { error: pError } = await supabase.from('profiles').insert([
    { name: null }
  ]).select();
  if (pError && pError.code === 'PGRST204') {
    console.log("profiles.name is MISSING.");
  } else {
    console.log("profiles.name EXISTS!");
  }
}

test();
