const Select = document.querySelector(".select-categories");
const SelectHeading = Select.querySelector(".select-heading");
const SelectItems = Select.querySelectorAll(".select-item");
const Overlay = Select.querySelector(".overlay");

const SELECT_HEADING_TEXT = SelectHeading.querySelector(".heading-text");
let heading = SELECT_HEADING_TEXT.innerText;

SelectHeading.addEventListener("click", function(e) {
    Select.classList.add("open");
});

Overlay.addEventListener("click", function(e) {
    Select.classList.remove("open");
});

SelectItems.forEach((item) => {
    item.addEventListener("click", function(e) {
        item.classList.toggle("checked");

        const innerTexts = Array.from(document.querySelectorAll('.checked')).map(element => element.innerText);

        if (innerTexts.length === 0) SELECT_HEADING_TEXT.innerText = heading;
        else SELECT_HEADING_TEXT.innerText = innerTexts.join(", ") + ".";
    });
});