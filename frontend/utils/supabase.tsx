import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Supabase API URL and Anon Key (found in Supabase Dashboard)
const SUPABASE_URL = 'https://ftijqesjcehzbenhmfht.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0aWpxZXNqY2VoemJlbmhtZmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzMzgwMDYsImV4cCI6MjA1NjkxNDAwNn0.nJSXLdrqS_5Bqk2ijc4stppmnodE4bIPmqd-ZjEj-Ck'

// Create a Supabase client instance
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })