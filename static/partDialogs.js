const open = document.querySelectorAll("button.dialog-open");
const dialog = document.querySelector("dialog");
const close = document.querySelectorAll("button.dialog-close");

open.forEach((item) => {
  item.addEventListener(
    "click",
    () => {
      item.parentElement.querySelector("dialog").showModal();
    },
  );
});

dialog.addEventListener("close", () => {
  dialog.querySelector("form").reset();
});

close.forEach((item) => {
  item.addEventListener("click", () => {
    item.parentElement.close();
  });
});
