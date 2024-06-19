const Selects = document.querySelectorAll(".select");
import { notify } from "../utils/utils.js";

Selects.forEach((Select) => {
    const SelectHeading = Select.querySelector(".select-heading");
    const Heading = SelectHeading.querySelector("span");
    const SelectItems = Select.querySelectorAll(".select-item");
    const Overlay = Select.querySelector(".overlay");

    const SELECT_HEADING_TEXT = SelectHeading.querySelector(".heading-text");
    let heading = SELECT_HEADING_TEXT.innerText;

    SelectHeading.addEventListener("click", function(e) {
        if (Select.classList.contains("disabled")) notify("The select field has been disabled!", false);
        else Select.classList.add("open");
    });

    if (Select.classList.contains("disabled")) Select.style.background = "rgb(227,227,227)";

    Overlay.addEventListener("click", function(e) {
        Select.classList.remove("open");
    });

    if (!Select.classList.contains("single")) {
        SelectItems.forEach((item) => {
            item.addEventListener("click", function() {
                item.classList.toggle("checked");
    
                const innerTexts = Array.from(document.querySelectorAll('.checked')).map(element => element.innerText);
    
                if (innerTexts.length === 0) SELECT_HEADING_TEXT.innerText = heading;
                else SELECT_HEADING_TEXT.innerText = innerTexts.join(", ");
            });
        });
    } else {
        SelectItems.forEach((item) => {
            item.addEventListener("click", function() {
                if (item.classList.contains("checked")) {
                    item.classList.remove("checked");
                    Heading.innerText = "";
                } else {
                    let flag = -1;
                    flag = Array.from(SelectItems).findIndex((item) => item.classList.contains("checked"));

                    const textItem = item.querySelector(".item-text");

                    if (flag === -1) {
                        item.classList.add("checked");
                        Heading.innerText = textItem.innerText;
                    } else {
                        SelectItems[flag].classList.remove("checked");
                        item.classList.add("checked");
                        Heading.innerText = textItem.innerText;
                    }
                }
            });
        });
    }
});