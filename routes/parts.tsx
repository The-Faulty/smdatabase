//import { Head, Header } from "./mod.ts";
//import { Ref, useRef, useState } from "npm:preact/compat";
import { supabase } from "../tools/supabase.tsx";
import { Tables } from "../tools/database.types.tsx";
import { DefaultHead } from "../components/Head.tsx";
import { Header } from "../islands/Header.tsx";

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
    output.push(
      <tr>
        <td>{part.type}</td>
        <td>{part.value}</td>
        <td>{part.footprint}</td>
        <td>
          <button class="dialog-open" id={`dialog-open-${part.id}`}>
            Open
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <DefaultHead />
      <body>
        <Header path="parts"/>
        <h1>Parts</h1>
        <div style="overflow-x:auto;">
          <table>
            <tr>
              <th>Part</th>
              <th>Value</th>
              <th>Footprint</th>
            </tr>

            {output}
            <script src="partDialogs.js" type="module" />

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
      </body>
    </>
  );
};
