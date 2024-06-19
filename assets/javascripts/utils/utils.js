export const notify = (text, status = true) => {
    Toastify({
        text: `${ text }`,
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "350px",
            maxWidth: "500px",
            fontSize: "14px",
            fontWeight: "500",
            fontFamily: "Inter, sans-serif",
            padding: "15px 20px 15px 40px",
            borderRadius: "5px",
            background: "white",
            color: "black",
            boxShadow: "0px 5px 10px #ff969a2a",
            lineHeight: "1.5"
        },
        offset: {
            x: 20,
            y: 20,
        },
        className: status ? "success" : "error",
    }).showToast();
}

export const formatString = (string) => {
    const formatWhiteSpace = string.replace(/\s+/g, " ");
    const lowercase = formatWhiteSpace.toLowerCase();

    return lowercase.trim();
}

export const stringInNum = (inputs) => {
    const handle = (e) => {
        const input = e.target;
        const value = input.value;
        input.value = value.replace(/e/gi, '');
    }

    inputs.forEach((input) => {
        input.addEventListener("input", (e) => { handle(e) });
    });
}

export const formatPrice = (num) => {
    return parseFloat(+num).toFixed(2);
}

export const profitPrice = (initial, profit, percent) => {
    initial.addEventListener("input", (e) => {
        const value = +initial.value;
        profit.value = value + (value * percent);
    });
}

export const addjustData = (array, key) => {
    return array.reduce((prev, curr) => {
        const existing = prev.find(item => item.name === curr.name);

        if (existing) {
            if (Array.isArray(existing[key])) {
                existing[key].push({
                    id: curr.id,
                    size: curr[key][0]
                });
            } else {
                existing[key] = [{
                    id: curr.id,
                    size: curr[key][0]
                }];
            }
        } else {
            prev.push({
                ...curr,
                [key]: [
                    {
                        id: curr.id,
                        size: curr[key][0],
                    }
                ]
            });
        }

        return prev;
    }, []);
}