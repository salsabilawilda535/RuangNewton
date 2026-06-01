import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pkirfmecyxlxuoqwlvbu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBraXJmbWVjeXhseHVvcXdsdmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2ODEyMDksImV4cCI6MjA5NTI1NzIwOX0.JCbqyAOdPuOOSjwStF-uGTLnkq8_oqWkH0A7t7w77_w';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data, error } = await supabase.from('profiles').upsert({
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Test',
    class: '10',
    school: 'SMA',
    email: 'test@test.com'
  }).select();
  console.log("Profile upsert result:", { data, error });
}
test();
