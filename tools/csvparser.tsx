export function ParseCSV(csv: string) {
  const output: object[] = [];
  const rows: string[] = csv.split("\r\n");
  const header: string[] = rows[0].split(",");
  rows.shift();
  for (const row of rows) {
    const data: string[] = row.split(",");
    for (let i = 0; i < data.length; i++) {
      if (data[i].includes('"')) {
        for (let j = i + 1; j < data.length; j++) {
          if (data[j].includes('"')) {
            for (let k = i + 1; k <= j; k++) {
              data[i] += "," + data[i + 1];
              data.splice(i + 1, 1);
            }
          }
        }
        data[i] = data[i].replaceAll('"', "");
      }
    }
    let index = 0;
    // deno-lint-ignore no-explicit-any
    let rowOut: any = {};
    for (const head of header) {
      rowOut[head] = data[index];
      index++;
    }
    output.push(rowOut);
  }
  return output;
}
