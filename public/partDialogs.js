const open = document.querySelectorAll("button.dialog-open");
const close = document.querySelectorAll("button.dialog-close");

open.forEach((item) => {
  item.addEventListener(
    "click",
    () => {
      item.parentElement.querySelector("dialog").showModal();
    },
  );
});

close.forEach((item) => {
  item.addEventListener("click", () => {
    item.parentElement.close();
  });
});
