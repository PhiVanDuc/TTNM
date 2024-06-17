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
    const res = await fetch(`http://localhost:3000/posters/${ id }`);
    if (!res.ok) window.location.href = "http://127.0.0.1:3001/";

    const data = await res.json();

    const FormPoster = document.querySelector(".form-poster");
    const InputName = FormPoster.querySelector(".input-name");

    const InputDescription = FormPoster.querySelector(".input-content");
    const InputFile = FormPoster.querySelector(".input-file");

    InputName.value = data.name;
    InputDescription.value = data["content"];

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