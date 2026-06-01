import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pkirfmecyxlxuoqwlvbu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBraXJmbWVjeXhseHVvcXdsdmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2ODEyMDksImV4cCI6MjA5NTI1NzIwOX0.JCbqyAOdPuOOSjwStF-uGTLnkq8_oqWkH0A7t7w77_w';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data, error } = await supabase.from('test_results').insert([
    { user_id: '123e4567-e89b-12d3-a456-426614174000', af_level: 'AF1', score: 100, passed: true }
  ]).select();
  console.log("Insert result:", { data, error });
}
test();
