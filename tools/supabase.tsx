import { createClient } from "npm:@supabase/supabase-js";
import { Database } from "@/tools/database.types.tsx";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";

const env = await load();
const supabaseKey: string = Deno.env.get("REACT_APP_SUPABASE_ANON_KEY")!;
const supabaseUrl: string = Deno.env.get("REACT_APP_SUPABASE_URL")!;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
