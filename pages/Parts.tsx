import { Head, Header } from "./mod.ts";

type Part = {
  quantity: number;
  type: string;
  value: number;
  footprint?: string;
  location?: string;
  description?: string;
};

export const Parts = () => {
  // Example parts list
  const parts: Part[] = [
    {
      quantity: 1,
      type: "Board",
      value: 100,
    },
    {
      quantity: 2,
      type: "Computer",
      value: 5,
    },
    {
      quantity: 10,
      type: "Camera",
      value: 150,
    },
  ];

  const partsEls: preact.VNode[] = [];
  parts.forEach((part, index) => {
    partsEls.push(
      <tr>
        <td>{part.quantity}</td>
        <td>{part.type}</td>
        <td>{part.value}</td>
        <td>
          <button class="dialog-open" id={`dialog-open-${index}`}>Open</button>
          <dialog id={`dialog-${index}`}>
            {part.type}
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
        <Header />

        <h1>Parts</h1>
        <table>
          <tr>
            <th>Quantity</th>
            <th>Type</th>
            <th>Value</th>
          </tr>

          {partsEls}
          <script src="partDialogs.js" type="module" />

          {/* Form to add new parts */}
          <tr>
            <td>
              <input placeholder={"10"} />
            </td>
            <td>
              <input placeholder={"Part"} />
            </td>
            <td>
              <input placeholder={"50"} />
            </td>
          </tr>
        </table>
      </body>
    </>
  );
};
