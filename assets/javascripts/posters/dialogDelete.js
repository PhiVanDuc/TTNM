import { notify } from "../utils/utils.js";

const ConfirmDialog = document.querySelector(".confirm-dialog");
const ButtonDisagree = ConfirmDialog.querySelector(".button-disagree");
const ButtonAgree = ConfirmDialog.querySelector(".button-agree");

ButtonDisagree.addEventListener("click", (e) => {
    ConfirmDialog.classList.add("hidden");
});

ButtonAgree.addEventListener("click", async (e) => {
    const id = ButtonAgree.dataset.id;

    const res = await fetch(`http://localhost:3000/posters/${id}`, {
        method: "DELETE",
    });

    if (res.ok) notify("Deleted poster successfully!");
    else notify("Delete poster failed!", false);

    ConfirmDialog.classList.add("hidden");
});