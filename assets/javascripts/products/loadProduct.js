const getProducts = async () => {
    const response = await fetch("http://localhost:3000/products?_page=1&_limit=9");
    const products = await response.json();

    const ProductList = document.querySelector(".content-product .product-list");
    if (products && Array.isArray(products) && products.length > 0) {

        ProductList.innerHTML = products.map((product) => {
            return `
                <div class="product-item">
                    <div class="product-image">
                        <img src="${ product.files[0] }">
                    </div>

                    <div class="product-info">
                        <div class="product-name">
                            <h4>${ product.name }</h4>
                            <p class="product-category">${
                                product["select-categories"].map((category, index) => {
                                    if (index === products.length - 1) return category;
                                    return category;
                                }).join(", ")
                            }</p>
                        </div>

                        <div class="product-cost">
                            <i class="fa-solid fa-money-bill-wave"></i>
                            <p>${ product["profit-price"] } $</p>
                        </div>

                        <div class="product-buttons">
                            <a href="#!" class="button-edit" data-id="${ product["id-product"] }">Edit</a>
                            <a href="#!" class="button-delete" data-id="${ product["id-product"] }">Delete</a>
                        </div>
                    </div>
                </div>
            `
        }).join("")
    }
    else {
        ProductList.classList.add("empty");
        ProductList.innerHTML = `<h3>Product list is empty.</h3>`
    }
}

getProducts();