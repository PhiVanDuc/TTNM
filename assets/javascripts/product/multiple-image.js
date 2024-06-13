const InputImage = document.querySelector(".input-file");
const styleImage = {
    display: "inline-block",
    width: "150px",
    height: "100px",
    borderRadius: "5px",
    objectFit: "cover",
}

InputImage.addEventListener("change", function(e) {
    const files = e.target.files;
    const WrapperImage = document.querySelector(".wrapper-input-file");
    const ImagesContainer = WrapperImage.querySelector(".images-container");

    
    Object.assign(ImagesContainer.style, { columnGap: "15px" });
    Object.assign(WrapperImage.style, { columnGap: "15px" });


    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = document.createElement('img');
            Object.assign(img.style, styleImage);
            img.src = e.target.result;
            ImagesContainer.appendChild(img);
        }

        reader.readAsDataURL(file);
    }
});