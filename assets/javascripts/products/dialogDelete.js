import { notify } from "../utils/utils.js";

const ConfirmDialog = document.querySelector(".confirm-dialog");
const ButtonDisagree = ConfirmDialog.querySelector(".button-disagree");
const ButtonAgree = ConfirmDialog.querySelector(".button-agree");

ButtonDisagree.addEventListener("click", () => {
    ConfirmDialog.classList.add("hidden");
});

ButtonAgree.addEventListener("click", async () => {
    const id = ButtonAgree.dataset.id;

    const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const item = document.querySelector(`div[data-id="${id}"]`);
        item.remove();
        notify("Deleted product successfully!");
    }
    else notify("Delete product failed!", false);

    ConfirmDialog.classList.add("hidden");
});