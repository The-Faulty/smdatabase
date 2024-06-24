//import { Head, Header } from "./mod.ts";
//import { Ref, useRef, useState } from "npm:preact/compat";
import { supabase } from "@/tools/supabase.tsx";
import { Tables } from "@/tools/database.types.tsx";
import { Header } from "@/islands/Header.tsx";
import { PartButton } from "@/islands/PartButton.tsx";

export default async function Parts() {
  const { data, error } = await supabase.from("parts").select();
  let parts: Tables<"parts">[] = [];
  parts = data;

  async function refresh() {
    const { data, error } = await supabase.from("parts").select();
    parts = data;
  }

  if (error) {
    console.log(error);
  }

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

          {parts.map((part: Tables<"parts">) => {
            return (
              <tr>
                <td>{part.type}</td>
                <td>{part.value}</td>
                <td>{part.footprint}</td>
                <td>
                  <PartButton part={part} supabase={supabase} />
                </td>
              </tr>
            );
          })}

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
