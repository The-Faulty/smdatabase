import { createClient } from "npm:@supabase/supabase-js";
import {Database} from "./database.types.tsx";

const supabaseUrl = Deno.env.get("REACT_APP_SUPABASE_URL")!;
const supabaseKey = Deno.env.get("REACT_APP_SUPABASE_ANON_KEY")!;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);