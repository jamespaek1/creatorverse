// src/client.js
//
// A small module that encapsulates the creation of a Supabase client.  By
// reading the URL and anon key from environment variables, you can keep
// sensitive credentials out of your source code.  When running the app
// locally, Vite will load variables prefixed with `VITE_` from `.env`.

import { createClient } from '@supabase/supabase-js';

// Pull the project URL and anon key from environment variables.  Refer to
// `.env` for details on how to configure these values.  Without
// substituting your own values the Supabase client will not be able to
// connect to anything.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);