const getProducts = async () => {
    const response = await fetch("http://localhost:3000/products?_page=1&_limit=9");
    const products = await response.json();

    const ProductList = document.querySelector(".content-product .product-list");
    if (products && Array.isArray(products) && products.length > 0) {
        for (let i = products.length - 1; i >= 0; i--) {
            
            const li = document.createElement("li");
            li.classList.add("product-item");
            li.innerHTML = `
                <div class="product-image">
                    <img src="${ products[i].files[0] }">
                </div>

                <div class="product-info">
                    <div class="product-name">
                        <h4>${ products[i].name }</h4>
                        <p class="product-category">${
                            products[i]["select-categories"].map((category, index) => {
                                if (index === products.length - 1) return category;
                                return category;
                            }).join(", ")
                        }</p>
                    </div>

                    <div class="product-cost">
                        <i class="fa-solid fa-money-bill-wave"></i>
                        <p>${ products[i]["profit-price"] } $</p>
                    </div>

                    <div class="product-buttons">
                        <a href="#!" class="button-edit" data-id="${ products[i]["id-product"] }">Edit</a>
                        <a href="#!" class="button-delete" data-id="${ products[i]["id-product"] }">Delete</a>
                    </div>
                </div>
            `;

            ProductList.appendChild(li);
        }
    }
    else {
        ProductList.classList.add("empty");
        ProductList.innerHTML = `<h3>Empty.</h3>`
    }
}

getProducts();