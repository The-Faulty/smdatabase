interface PartButtonProps {
  part: Tables<"parts">;
}

export function PartButton(props: PartButtonProps) {
  return (
    <>
      <button class="dialog-open">
        <img src="/editicon.png" style="width=20px;height=20px" />
      </button>
    </>
  );
}
