import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const SUPABASE_URL = 'https://zqzdoefigyovgsbyssxr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxemRvZWZpZ3lvdmdzYnlzc3hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExODIzODgsImV4cCI6MjA1Njc1ODM4OH0.8DXCEz6I9S7jyYGGTz2k640n8Kv6BOdwoIfVKQHV-Oo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
