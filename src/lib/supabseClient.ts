import { createClient } from "@supabase/supabase-js";
import {
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
} from "./config";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const supabase = createClientComponentClient({
  supabaseUrl: NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey: NEXT_PUBLIC_SUPABASE_ANON_KEY,
});
