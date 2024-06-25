//import { Head, Header } from "./mod.ts";
//import { Ref, useRef, useState } from "npm:preact/compat";
import { supabase } from "@/tools/supabase.tsx";
import { Tables } from "@/tools/database.types.tsx";
import { Header } from "@/islands/Header.tsx";
import { EditPartButton } from "../islands/EditPartButton.tsx";
import { AddPartButton } from "@/islands/AddPartButton.tsx";
import { PartCSVButton } from "@/islands/PartCSVButton.tsx";

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
        <PartCSVButton />
        <AddPartButton />
        <table class="part-table">
          <tr>
            <th class="part-table-head">Part</th>
            <th class="part-table-head">Value</th>
            <th class="part-table-head">Footprint</th>
          </tr>

          {parts.map((part: Tables<"parts">) => {
            return (
              <tr>
                <td>{part.type}</td>
                <td>{part.value}</td>
                <td>{part.footprint}</td>
                <td>
                  <EditPartButton part={part} />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      <script src="partDialogs.js" type="module" />
    </>
  );
}
