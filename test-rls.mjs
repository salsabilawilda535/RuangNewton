import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pkirfmecyxlxuoqwlvbu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBraXJmbWVjeXhseHVvcXdsdmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2ODEyMDksImV4cCI6MjA5NTI1NzIwOX0.JCbqyAOdPuOOSjwStF-uGTLnkq8_oqWkH0A7t7w77_w';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  console.log("Registering test user...");
  const email = `test_${Date.now()}@example.com`;
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password: 'password123',
  });

  if (authError) {
    console.error("Auth error:", authError);
    return;
  }

  const userId = authData.user.id;
  console.log("Logged in as:", userId);

  console.log("1. Upserting profile...");
  const { data: profileInsert, error: profileInsertError } = await supabase.from('profiles').upsert({
    id: userId,
    name: 'Test User'
  }).select();
  console.log("Profile Upsert Result:", profileInsert, profileInsertError);

  console.log("2. Selecting profile...");
  const { data: profileSelect, error: profileSelectError } = await supabase.from('profiles').select('*').eq('id', userId);
  console.log("Profile Select Result:", profileSelect, profileSelectError);

  console.log("3. Inserting test result...");
  const { data: testInsert, error: testInsertError } = await supabase.from('test_results').insert([
    { user_id: userId, af_level: 'AF1', score: 100, passed: true }
  ]).select();
  console.log("Test Insert Result:", testInsert, testInsertError);

  console.log("4. Selecting test result...");
  const { data: testSelect, error: testSelectError } = await supabase.from('test_results').select('*').eq('user_id', userId);
  console.log("Test Select Result:", testSelect, testSelectError);
}

run();
