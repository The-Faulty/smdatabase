import { createClient } from "npm:@supabase/supabase-js";
import { Database } from "@/tools/database.types.tsx";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";

const isDenoDeploy = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;

var key,
  url: string = "";
if (!isDenoDeploy) {
  const env = await load();
  key = env["REACT_APP_SUPABASE_ANON_KEY"];
  url = env["REACT_APP_SUPABASE_URL"];
} else {
  key = Deno.env.get("REACT_APP_SUPABASE_ANON_KEY")!;
  url = Deno.env.get("REACT_APP_SUPABASE_URL")!;
}
const supabaseKey: string = key;
const supabaseUrl: string = url;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
