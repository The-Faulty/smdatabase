import { Database, Tables } from "@/tools/database.types.tsx";
import { PartInfo, PartInfoKeys} from "@/tools/types.tsx"

interface PartButtonProps {
  part: Tables<"parts">;
}

export function EditPartButton(props: PartButtonProps) {
  const dialogContent: preact.VNode[] = [];
  // deno-lint-ignore no-explicit-any
  const changes = {} as Tables<"parts"> | any;
  
  // need this otherwise the input gets split and value line isnt happy
  // prettier-ignore
  for (const key of PartInfoKeys) {
    dialogContent.push(
      <p key={key}>
        <small class="small-heading">{key.toLocaleUpperCase()}</small>
        <br />
        {/* @ts-ignore  stupid type script isnt happy even though key is from props.part*/}
        <input value={props.part[key]?.toString()} onInput={(e) => (changes[key] = e.currentTarget.value)} required />
      </p>
    );
  }

  async function savePart() {
    const url = window.location.origin;

    if (!changes.id) {
      changes.id = props.part.id;
    }

    const headers = new Headers({
      "Content-Type": "text/plain",
    });
    const opts = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(changes),
    };
    const rawPosts = await fetch(`${url}/api/updatePart`, opts);
    console.log(rawPosts);
  }

  return (
    <>
      <button class="dialog-open" id={`dialog-open-${props.part.id}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="000"
          class="editicon"
        >
          <path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z" />
        </svg>
      </button>
      <dialog id={`dialog-${props.part.id}`}>
        <form>{dialogContent}</form>

        <button class="dialog-close" id={`dialog-close-${props.part.id}`}>
          Close
        </button>
        <button
          class="dialog-save"
          id={`dialog-save-${props.part.id}`}
          onClick={savePart}
        >
          Save
        </button>
      </dialog>
    </>
  );
}
