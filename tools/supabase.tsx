import { createClient } from "npm:@supabase/supabase-js";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import {Database} from "./database.types.tsx";

const env = await load();

const supabaseUrl = env["REACT_APP_SUPABASE_URL"];
const supabaseKey = env["REACT_APP_SUPABASE_ANON_KEY"];

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);