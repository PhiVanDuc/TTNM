

function removeMessage (FormGroup, Message) {
    FormGroup.classList.remove("invalid");
    Message.innerHTML = "";
}

function validation(options) {
    const Form = document.querySelector(options.form);
    const Button = document.querySelector(options.button);
    const ruleList = {};

    function validate(FormGroup, Message, Input, rule) {
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
        } else {
            removeMessage(FormGroup, Message, message);
        }

        return !message;
    }
    
    if (Button) {
        // Sự kiện submit form
        Button.addEventListener("click", async (event) => {
            let isFormValid = true;
            const formValues = {}; // Để lưu trữ giá trị từ form
        
            options.rules.forEach(function(rule) {
                const Input = Form.querySelector(rule.selector);
        
                if (!Input) {
                    console.error(`Element with selector "${rule.selector}" not found.`);
                    isFormValid = false;
                    return;
                }
        
                const FormGroup = Input.closest(".form-group");
        
                if (!FormGroup) {
                    console.error(`FormGroup for selector "${rule.selector}" not found.`);
                    isFormValid = false;
                    return;
                }
        
                const Message = FormGroup.querySelector(options.message);
        
                const isValid = validate(FormGroup, Message, Input, rule);
        
                if (!isValid) {
                    isFormValid = false;
                }
        
                // Thêm giá trị vào formValues
                switch (Input.tagName) {
                    case "DIV":
                        const Checked = Array.from(Input.querySelectorAll(".checked")).map(check => {
                            const text = check.querySelector(".item-text");
                            return text.innerHTML;
                        });
                        formValues[Input.className] = Checked;
                        break;
                    default:
                        switch (Input.type) {
                            case "file":
                                formValues[Input.name] = Input.files;
                                break;
                            default:
                                formValues[Input.name] = Input.value;
                                break;
                        }
                        break;
                }
            });
        
            // Loại bỏ các trường "initial-price" và "profit-price" khỏi formValues
            delete formValues["initial-price"];
            delete formValues["profit-price"];
        
            if (isFormValid) {
                if (typeof options.onSubmit === "function") {
                    await options.onSubmit(formValues); // Chỉ truyền các giá trị còn lại, không bao gồm initial-price và profit-price
                }
            }
        });
        

        // Vòng lặp qua các rules
        options.rules.forEach(function(rule) {
            const Input = Form.querySelector(rule.selector);
            if (!Input) {
                console.error(`Element with selector "${rule.selector}" not found during rules iteration.`);
                return;
            }

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
