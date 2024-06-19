import { Head, Header } from "./mod.ts";
//import { Ref, useRef, useState } from "npm:preact/compat";
import { supabase } from "../tools/supabase.tsx";
import { Tables } from "../tools/database.types.tsx";
import { useState } from "npm:preact/compat";


type Part = {
  part: string;
  quantity?: number;
  type?: string;
  value: number;
  footprint: string;
  location?: string;
  description?: string;
};

export function Parts() {
  /*const quantInput: Ref<string> = useRef("");
  const typeInput: Ref<string> = useRef("");
  const valInput: Ref<string> = useRef("");
  const footInput: Ref<string> = useRef("");
  const locInput: Ref<string> = useRef("");
  const [status, setStatus] = useState("");
  const desc: Ref<string> = useRef("");*/
  const [parts, setParts] = useState<Tables<'parts'>[]>();
  
  async function retrieveParts(){
    const partsList: Tables<"parts">[] = [];
    const { data, error } = await supabase.from("parts").select();
    if (error){
      return (<>
      error getting parts
      </>);
    }
    

    data.forEach((part: Tables<'parts'>, index: number) => {
      let key: keyof Tables<"parts">;
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

      partsList.push(part);
      //console.log(parts);
    });
    setParts(partsList);
    console.log(partsList);
  }
  retrieveParts();
  
  // Example parts list
  /*const parts: Part[] = [
    {
      part: "Test1",
      value: 100,
      footprint: "Big",
      type: "Computer",
      location: "Home",
      description: "This is a big computer",
    },
    {
      part: "Test2",
      value: 1000,
      footprint: "Bigger",
      description: "This thing big",
    },
    {
      part: "Test3",
      value: 10000,
      footprint: "Biggest",
      location: "The moon",
    },
  ];*/

  

  return (
    <>
      <Head />

      <body>
        <Header path="parts" />

        <h1>Parts</h1>
        <div style="overflow-x:auto;">
          <table>
            <tr>
              <th>Part</th>
              <th>Value</th>
              <th>Footprint</th>
            </tr>

            {parts?.map((part) => {
              <tr>
          <td>{part.type}</td>
          <td>{part.value}</td>
          <td>{part.footprint}</td>
          <td>
            <button class="dialog-open" id={`dialog-open-${part.id}`}>Open</button>
          </td>
        </tr>
            })}
            <script src="partDialogs.js" type="module" />

            {/* Form to add new parts */}
            <tr>
              <td>
                <input placeholder={"Part name"} />
              </td>
              <td>
                <input placeholder={"100"} />
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
