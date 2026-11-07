import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mxhbfezoowjjtjghadgn.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14aGJmZXpvb3dqanRqZ2hhZGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQwNjk0NjUsImV4cCI6MjEwOTY0NTQ2NX0.lncY3JSZP4OLxDLiyjQXEFQWt01pFsdRhUE-75CrD60'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
