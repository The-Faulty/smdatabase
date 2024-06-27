import { Tables } from "@/tools/database.types.tsx";
import { PartInfoKeys } from "@/tools/types.tsx";

export function AddPartButton() {
  const dialogContent: preact.VNode[] = [];
  // deno-lint-ignore no-explicit-any
  const part = {} as Tables<"parts"> | any;

  // need this otherwise the input gets split and value line isnt happy
  // prettier-ignore
  for (const key of PartInfoKeys) {
    dialogContent.push(
      <p key={key}>
        <small class="small-heading">{key.toLocaleUpperCase()}</small>
        <br />
        {/* @ts-ignore  stupid type script isnt happy even though key is from props.part*/}
        <input onInput={(e) => (part[key] = e.currentTarget.value)} required />
      </p>
    );
  }

  async function savePart() {
    const url = window.location.origin;

    const headers = new Headers({
      "Content-Type": "text/plain",
    });
    const opts = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(part),
    };
    const rawPosts = await fetch(`${url}/api/addPart`, opts);
    console.log(rawPosts);
  }

  return (
    <>
      <button class="add-part dialog-open" id={`dialog-open-add-part`}>
        + Add Part
      </button>
      <dialog id="dialog-add-part">
        <form>{dialogContent}</form>

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
