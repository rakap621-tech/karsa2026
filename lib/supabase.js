import { createClient } from '@supabase/supabase-js'

// Tempelkan langsung di dalam tanda kutip ini
const supabaseUrl = 'https://ytgogffqrmgpblbgrwom.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z29nZmZxcm1ncGJsYmdyd29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzOTkwNzUsImV4cCI6MjA5Mzk3NTA3NX0.bbpKm9u1AYyKGQF2CQ9qWyJg8GLLedJDXqM4NE9HAaU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)