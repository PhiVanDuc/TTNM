import pagination from "../utils/pagination.js";

const urlParams = new URLSearchParams(window.location.search);
let currentPage = urlParams.get('page') ? urlParams.get('page') : 1;

const getProducts = async () => {
    const response = await fetch(`http://localhost:3000/products?_page=${currentPage}&_per_page=9`);
    const products = await response.json();
    localStorage.setItem("length-products", JSON.stringify(products.items));

    const ProductList = document.querySelector(".content-product .product-list");
    if (products.data && Array.isArray(products.data) && products.data.length > 0 && (+currentPage <= products.last && +currentPage >= products.first)) {
        ProductList.innerHTML = products.data.map((product) => {
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
                            }.</p>
                        </div>

                        <div class="product-cost">
                            <i class="fa-solid fa-money-bill-wave"></i>
                            <p>${ product["profit-price"] } $</p>
                        </div>

                        <div class="product-buttons">
                            <a href="http://127.0.0.1:3001/html/edit-product.html?id=${ product.id }" class="button-edit" data-id="${ product.id }">Edit</a>
                            <button href="#!" class="button-delete" data-id="${ product.id }">Delete</button>
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

await getProducts();

const paginationElement = document.querySelector(".content-product .pagination");
const length = JSON.parse(localStorage.getItem("length-products"));

const pages = pagination(currentPage, Math.ceil(length / 9));
paginationElement.innerHTML = '';

pages.forEach(page => {
    const li = document.createElement('li');
    li.classList.add('page-item');
    
    if (typeof page === 'number') {
        const a = document.createElement('a');
        a.href = `http://127.0.0.1:3001/html/product-management.html?page=${page}`;
        a.classList.add('page-link');
        a.textContent = page;

        if (page === +currentPage) a.classList.add('active');
        else a.classList.remove('active');

        li.appendChild(a);
    } else {
        const span = document.createElement('span');
        span.classList.add('page-link');
        span.textContent = page;
        li.appendChild(span);
    }
    
    paginationElement.appendChild(li);
});