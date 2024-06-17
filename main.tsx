import { render } from "npm:preact-render-to-string";
import { typeByExtension } from "jsr:@std/media-types";

import { EditPart, Home, Parts, Projects } from "./pages/mod.ts";

Deno.serve({
  port: 8080,
}, async (req) => {
  const url = new URL(req.url);
  const path = url.pathname;

  // PAGES
  if (path === "/home") {
    return new Response(render(<Home />), headers);
  }
  if (path === "/parts") {
    return new Response(render(<Parts />), headers);
  }
  if (path === "/parts/edit") {
    const partNum = url.searchParams.get("num")!;
    return new Response(render(<EditPart partNum={partNum} />), headers);
  }
  if (path === "/projects") {
    return new Response(render(<Projects />), headers);
  }
  try {
    const file_name = path.split("/").at(-1)!.split(".").at(-1)!;
    const file = await Deno.readTextFile("./public" + path);
    const content_type = typeByExtension(file_name)!;
    return new Response(file, {
      "headers": {
        "Content-Type": content_type,
      },
    });
  } catch {
    return Response.redirect(`${url.protocol}${url.host}/home`, 303);
  }
});

const headers: ResponseInit = {
  "headers": {
    "Content-Type": "text/html;charset=utf-8",
  },
};
