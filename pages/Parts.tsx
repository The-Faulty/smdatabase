import { Head, Header } from "./mod.ts";

type Part = {
  part: string;
  quantity?: number;
  type?: string;
  value: number;
  footprint: string;
  location?: string;
  description?: string;
};

export const Parts = () => {
  // Example parts list
  const parts: Part[] = [
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
  ];

  const partsList: preact.VNode[] = [];
  parts.forEach((part, index) => {
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

    partsList.push(
      <tr>
        <td>{part.part}</td>
        <td>{part.value}</td>
        <td>{part.footprint}</td>
        <td>
          <button class="dialog-open" id={`dialog-open-${index}`}>Open</button>
          <dialog id={`dialog-${index}`}>
            <form>
              {detailedPartList}
            </form>

            <button class="dialog-close" id={`dialog-close-${index}`}>
              Close
            </button>
          </dialog>
        </td>
      </tr>,
    );
  });

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

            {partsList}
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
