import { Handlers } from "$fresh/server.ts";
import { supabase } from "@/tools/supabase.tsx";

export const handler: Handlers = {
  async POST(req) {
    const changes = await req.json();
    const { error } = await supabase
      .from("parts")
      .update(changes)
      .eq("id", changes.id);
    console.log("update");
    return new Response();
  },
};
