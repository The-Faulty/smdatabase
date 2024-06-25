import { useState } from "preact/hooks";
import { ParseCSV } from "@/tools/csvparser.tsx";

export function PartCSVButton() {
  const [columns, setColumns] = useState<string[]>([]);

  async function handleFile(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    const csvData = ParseCSV(await files![0].text());
    console.log(csvData);
    setColumns(Object.keys(csvData));
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
      <select>
        {columns?.map((col: string) => {
          return <option value={col}>{col}</option>;
        })}
      </select>
    </>
  );
}
