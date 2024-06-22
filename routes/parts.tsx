//import { Head, Header } from "./mod.ts";
//import { Ref, useRef, useState } from "npm:preact/compat";
import { supabase } from "@/tools/supabase.tsx";
import { Tables } from "@/tools/database.types.tsx";
import { Header } from "@/islands/Header.tsx";

type Part = {
  part: string;
  quantity?: number;
  type?: string;
  value: number;
  footprint: string;
  location?: string;
  description?: string;
};

export default async function Parts() {
  const { data, error } = await supabase.from("parts").select();
  //console.log(data);
  const output: preact.VNode[] = [];
  data.forEach((part: Tables<"parts">) => {
    let key: keyof Part;

    const detailedPartList: preact.VNode[] = [];

    for (key in part) {
      detailedPartList.push(
        <p>
          <small class="small-heading">
            {key.toLocaleUpperCase()}
          </small>
          <br />
          <input value={part[key]?.toString()} required />
        </p>,
      );
    }

    output.push(
      <tr>
        <td>{part.type}</td>
        <td>{part.value}</td>
        <td>{part.footprint}</td>
        <td>
	<button class="dialog-open" id={`dialog-open-${data.indexOf(part)}`}>
	    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="000" class="editicon"><path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z"/></svg>
	  </button>
          <dialog id={`dialog-${data.indexOf(part)}`}>
            <form>
              {detailedPartList}
            </form>

            <button class="dialog-close" id={`dialog-close-${data.indexOf(part)}`}>
              Close
            </button>
          </dialog>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Header path="parts" />
      <h1>Parts</h1>
      <div style="overflow-x:auto;">
        <table>
          <tr>
            <th>Part</th>
            <th>Value</th>
            <th>Footprint</th>
          </tr>

          {output}

          {/* Form to add new parts */}
          <tr>
            <td>
              <input placeholder={"Part name"} />
            </td>
            <td>
              <input placeholder={"100n"} />
            </td>
            <td>
              <input placeholder={"Footprint"} />
            </td>
          </tr>
        </table>
      </div>
      <script src="partDialogs.js" type="module" />
    </>
  );
}
