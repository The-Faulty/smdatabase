import { Handlers } from "$fresh/server.ts";
import { supabase } from "@/tools/supabase.tsx";

export const handler: Handlers = {
  async POST(req) {
    const parts = await req.json();
    const { error } = await supabase
      .from("parts").insert(parts);
    console.log("addition");
    console.log(error);
    return new Response();
  },
};
