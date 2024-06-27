import { useState } from "preact/hooks";
import { ParseCSV } from "@/tools/csvparser.tsx";
import { PartInfoKeys } from "@/tools/types.tsx";

export function PartCSVButton() {
  const [columns, setColumns] = useState<string[]>([]);
  let options: string[] = [];


  async function savePart() {
    const url = window.location.origin;

    const headers = new Headers({
      "Content-Type": "text/plain",
    });
    const opts = {
      method: "POST",
      headers: headers,
      body: JSON.stringify("da"),
    };
    const rawPosts = await fetch(`${url}/api/addPart`, opts);
    console.log(rawPosts);
  }

  async function handleFile(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    const csvData = ParseCSV(await files![0].text());
    console.log(csvData);
    options = ["(None)", ...Object.keys(csvData[0])];
    
    const dialog = document.querySelector("dialog");
    dialog?.showModal();
    setColumns(options);
  }
  function promptFile() {
    const input = document.getElementById("csvInput");
    input?.click();
  }



  return (
    <>
      <input
        type="file"
        id="csvInput"
        style="display: none"
        accept=".csv,.txt"
        onInput={handleFile}
      />
      <button onClick={promptFile}>Upload CSV</button>
      <dialog id="dialog-upload-csv">
        <h2>Upload Part CSV</h2>
        <form>{PartInfoKeys.map((key) => {
          return <>
          <p>
            {key.toLocaleUpperCase()}
            <br/>
            <select id={key}>
            {columns.map((col) => {
              if (col.toLocaleLowerCase() === key.toLocaleLowerCase())
                return <option value={col} selected>{col}</option>;
              else
                return <option value={col} >{col}</option>;
              })}
            </select>
          </p>
          </>
        })}</form>

        <button class="dialog-close" id={`dialog-close-add-part`}>
          Close
        </button>
        <button
          class="dialog-save"
          id={`dialog-save-add-part`}
          onClick={savePart}
        >
          Save
        </button>
      </dialog>
    </>
  );
}
