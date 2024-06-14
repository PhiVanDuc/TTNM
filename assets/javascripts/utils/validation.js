import { formatPrice } from "./utils.js";

function removeMessage (FormGroup, Message) {
    FormGroup.classList.remove("invalid");
    Message.innerHTML = "";
}

function validation (options) {
    const Form = document.querySelector(options.form);
    const Button = document.querySelector(options.button);
    const ruleList = {};

    function validate (FormGroup, Message, Input, rule) {
        const rules = ruleList[rule.selector];
        let message;

        if (Input.type === "file") {
            const files = Input.files;
            for (let i = 0; i < rules.length; i++) {
                message = rules[i](files);
                if (message) break;
            }
        } else {
            for (let i = 0; i < rules.length; i++) {
                message = rules[i](Input.value);
                if (message) break;
            }
        }

        if (message) {
            FormGroup.classList.add("invalid");
            Message.innerHTML = message;
        }
        else removeMessage(FormGroup, Message, message);

        return !message;
    }
    
    if (Button) {
        // Sự kiện submit form
        Button.addEventListener("click", async (event) => {
            let isFormValid = true;
            options.rules.forEach(function(rule) {
                const Input = Form.querySelector(rule.selector);
                const FormGroup = Input.closest(".form-group");
                const Message = FormGroup.querySelector(options.message);

                const isValid = validate(FormGroup, Message, Input, rule);

                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                if (typeof options.onSubmit === "function") {
                    const Inputs = Form.querySelectorAll("[name]");

                    const formValues = Array.from(Inputs).reduce(function(prev, curr) {
                        switch(curr.tagName) {
                            case "DIV":
                                const Checked = Array.from(curr.querySelectorAll(".checked")).map(check => {
                                    const text = check.querySelector(".item-text");
                                    return text.innerHTML;
                                });
                                prev[curr.className] = Checked;

                                break;
                            default:
                                switch(curr.type) {
                                    case "file":
                                        prev[curr.name] = curr.files;
                                        break;
                                    default:
                                        prev[curr.name] = curr.value;
                                        break;
                                }
                                break;
                        }

                        return prev;
                    }, {});

                    await options.onSubmit({
                        ...formValues,
                        "initial-price": formatPrice(formValues["initial-price"]),
                        "profit-price": formatPrice(formValues["profit-price"]),
                    });
                }
            }
        })

        // Vòng lặp qua các rules
        options.rules.forEach(function(rule) {
            const Input = Form.querySelector(rule.selector);
            const FormGroup = Input.closest(".form-group");
            const Message = FormGroup.querySelector(options.message);

            if (Input) {
                if (Array.isArray(ruleList[rule.selector])) {
                    ruleList[rule.selector].push(rule.test);
                } else {
                    ruleList[rule.selector] = [rule.test];
                }

                if (Input.tagName === "DIV") {
                    const Overlay = Input.querySelector(".overlay");
                    Input.addEventListener("click", function() {
                        removeMessage(FormGroup, Message);
                    });

                    Overlay.addEventListener("click", function(e) {
                        e.stopPropagation();
                        validate(FormGroup, Message, Input, rule);
                    });
                }

                Input.addEventListener("blur", function() {
                    validate(FormGroup, Message, Input, rule);
                });

                Input.addEventListener("input", function() {
                    removeMessage(FormGroup, Message);
                });
            }
        });
    }
}

// Định nghĩa các rules
validation.isRequired = function (selector, message) {
    return {
        selector,
        test: function(value) {
            return value.trim() ? undefined : message
        }
    }
}

validation.isRequiredCustomSelect = function (selector, message) {
    return {
        selector,
        test: function(value) {
            const SelectCategories =  document.querySelector(".select-categories");
            const CheckedList = Array.from(SelectCategories.querySelectorAll(".checked"));

            return CheckedList.length > 0 ? undefined : message;
        }
    }
}

validation.isMin = function (selector, message) {
    return {
        selector,
        test: function(value) {
            const string = value.trim();
            return string.length >= 6 ? undefined : message;
        }
    }
}

validation.isFiles = function (selector, message) {
    return {
        selector,
        test: function(value) {
            return value.length > 0 ? undefined : message;
        }
    }
}

export default validation;