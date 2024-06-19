const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

if (!id) window.location.href = "http://127.0.0.1:3001/";

// Hàm chuyển đổi từ base64Url ảnh sang file của input
async function urltoFile(url, filename, mimeType){
    if (url.startsWith('data:')) {
        var arr = url.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[arr.length - 1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        var file = new File([u8arr], filename, {type:mime || mimeType});
        return Promise.resolve(file);
    }
    return fetch(url)
        .then(res => res.arrayBuffer())
        .then(buf => new File([buf], filename,{type:mimeType}));
}

(async () => {
    const res = await fetch(`http://localhost:3000/products/${ id }`);
    if (!res.ok) window.location.href = "http://127.0.0.1:3001/";

    const data = await res.json();
    const FormProduct = document.querySelector(".form-product");
    const InputName = FormProduct.querySelector(".input-name");
    const InputQuantity = FormProduct.querySelector(".input-quantity");

    // Query custom select option
    const Selects = FormProduct.querySelectorAll(".select");
    Selects.forEach((Select) => {
        const HeadingText = Select.querySelector(".heading-text");
        const SelectItems = Select.querySelectorAll(".select-item");

        SelectItems.forEach((select_item) => {
            const ItemText = select_item.querySelector(".item-text");
            let isExist;

            if (Select.classList.contains("categories")) {
                isExist = data["select-categories"].find(category => ItemText.innerHTML === category);
            } else isExist = ItemText.innerHTML === data["select-size"];

            if (isExist) select_item.classList.add("checked");
        });
        
        const innerTexts = Array.from(Select.querySelectorAll('.select-item.checked .item-text')).map(element => element.innerHTML);

        if (innerTexts.length > 1) HeadingText.innerText = innerTexts.join(", ") + ".";
        else if (innerTexts.length === 1) HeadingText.innerText = innerTexts[0];
    })
    // End

    const InputInitialPrice = FormProduct.querySelector(".input-initial-price");
    const InputProfitPrice = FormProduct.querySelector(".input-profit-price");
    const InputDescription = FormProduct.querySelector(".input-description");
    const InputFile = FormProduct.querySelector(".input-file");

    InputName.value = data.name;
    InputQuantity.value = data.quantity;
    InputInitialPrice.value = data["initial-price"];
    InputProfitPrice.value = data["profit-price"];
    InputDescription.value = data["description"];

    // Gán File cho input file
    const arrayFile = await Promise.all(data.files.map(async (url, index) => {
        return await urltoFile(url, `img ${index + 1}`, "image/*");
    }));

    const fileList = new DataTransfer();
    arrayFile.forEach((file) => {
        fileList.items.add(file);
    });

    InputFile.files = fileList.files;
    // End

    // Load ảnh lên giao diện
    const files = InputImage.files;
    const WrapperImage = document.querySelector(".wrapper-input-file");
    const ImagesContainer = WrapperImage.querySelector(".images-container");

    ImagesContainer.innerHTML = "";

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = document.createElement('img');
            Object.assign(img.style, style);

            img.src = e.target.result;
            ImagesContainer.appendChild(img);
        }

        reader.readAsDataURL(file);
    }
    // End
})();