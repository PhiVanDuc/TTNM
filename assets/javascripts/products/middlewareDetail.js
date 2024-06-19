const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

if (!id) window.location.href = "http://127.0.0.1:3001/";

(async function() {
    const res = await fetch(`http://localhost:3000/products/${ id }`);
    if (!res.ok) window.location.href = "http://127.0.0.1:3001/";

    const data = await res.json();
    if (!data) window.location.href = "http://127.0.0.1:3001/";

    const res2 = await fetch(`http://localhost:3000/products?name=${data.name}`);
    if (!res2.ok) window.location.href = "http://127.0.0.1:3001/";

    const data2 = await res2.json();
    if (!data2) window.location.href = "http://127.0.0.1:3001/";

    const ProductInfo = document.querySelector(".product-info");

    ProductInfo.innerHTML = `
        <div class="main-info">
            <img class="product-img" src="${ data.files[0] }" alt="img">

            <div class="info">
                <h4 class="product-name">${ data.name }</h4>

                <div class="align-info">
                    <div class="info-item">
                        <h5>Initial price</h5>
                        <span class="info-content">
                            <i class="fa-solid fa-money-bill-wave"></i>
                            <span>${ data["initial-price"] } $</span>
                        </span>
                    </div>

                    <div class="info-item">
                        <h5>Profit price</h5>
                        <span class="info-content">
                            <i class="fa-solid fa-money-bill-wave"></i>
                            <span>${ data["profit-price"] } $</span>
                        </span>
                    </div>
                </div>

                <div class="align-info">
                    <div class="info-item">
                        <h5>Categories</h5>
                        <span class="info-content">
                            <span>
                                ${ data["select-categories"].map((category) => {
                                    return category;
                                }).join(", ") }
                            </span>
                        </span>
                    </div>

                    <div class="info-item">
                        <h5>Quantity</h5>
                        <span class="info-content">
                            <span>${ data.quantity }</span>
                        </span>
                    </div>
                </div>
                
                <div class="align-info size">
                    <h5>Sizes</h5>

                    <ul class="list-size">
                        ${ data2.map((elem) => {
                            return `
                                <a href="http://127.0.0.1:3001/html/detail-product.html?id=${ elem.id }" class="size-item ${ elem["select-size"] === data["select-size"] ? "marked" : "" }">${ elem["select-size"] }</a>
                            `
                        }).join("") }
                    </ul>
                </div>
            </div>
        </div>

        <div class="product-desc">
            <h5>Description</h5>
            <p class="desc">${ data.description }</p>
        </div>
    `
})();