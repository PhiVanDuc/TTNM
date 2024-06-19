import pagination from "../utils/pagination.js";

const urlParams = new URLSearchParams(window.location.search);
let currentPage = urlParams.get('page') ? urlParams.get('page') : 1;
const ProductList = document.querySelector(".content-product .product-lists");

const getProducts = async () => {
    const response = await fetch(`http://localhost:3000/coupons?_page=${currentPage}&_per_page=9`);
    const products = await response.json();
    localStorage.setItem("length-products", JSON.stringify(products.items));
    if (products.data && Array.isArray(products.data) && products.data.length > 0 && (+currentPage <= products.last && +currentPage >= products.first)) {
        console.log('aa');
        ProductList.innerHTML = `
            <table class="product-table">
                <thead>
                    <tr>
                        <th>Coupon Name</th>
                        <th>Status</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Coupon Content</th>
                         <th>Coupon Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${products.data.map((product) => {
                        return `
                            <tr class="product-item">
                                <td class="product-name">${product.name}</td>
                                
                                <td class="product-status">${product.status === 0 ? 'Disabled' : 'Enabled'}</td>
                                 <td class="product-name">${product.start__time}</td>
                                <td class="product-name">${product.end__time}</td>
                                <td class="product-name">${product.coupon__code}</td>
                                <td class="product-buttons">
                                    <a href="http://127.0.0.1:3001/html/edit-coupon.html?id=${product.id}" class="button-edit" data-id="${product.id}">Edit</a>
                                    <button class="button-delete" data-id="${product.id}">Delete</button>
                                </td>
                            </tr>
                        `
                    }).join('')}
                </tbody>
            </table>
        `;
    }
    

    // if (products.data && Array.isArray(products.data) && products.data.length > 0 && (+currentPage <= products.last && +currentPage >= products.first)) {
    //     ProductList.innerHTML = products.data.map((product) => {
    //         return `
    //             <div class="product-item">
    //                 <div class="product-info">
    //                     <div class="product-name">
    //                         <h4>${ product.name }</h4>
    //                     </div>

    //                     <div class="product-cost">
    //                         <i class="fa-solid fa-money-bill-wave"></i>
    //                         <p>${ product.discount__amount } $</p>
    //                     </div>

    //                     <div class="product-buttons">
    //                         <a href="http://127.0.0.1:3001/html/edit-coupon.html?id=${ product.id }" class="button-edit" data-id="${ product.id }">Edit</a>
    //                         <button class="button-delete" data-id="${ product.id }">Delete</button>
    //                     </div>
    //                 </div>
    //             </div>
    //         `
    //     }).join("")
    // }
    else {
        ProductList.classList.add("empty");
        ProductList.innerHTML = `<h3>Coupon list is empty.</h3>`
    }
}

await getProducts();

const ButtonDeletes = ProductList.querySelectorAll(".button-delete");
const ConfirmDialog = document.querySelector(".confirm-dialog");
const ButtonAgree = ConfirmDialog.querySelector(".button-agree");

ButtonDeletes.forEach(ButtonDelete => {
    ButtonDelete.addEventListener("click", () => {
        const id = ButtonDelete.dataset.id;
        ButtonAgree.dataset.id = id;
        ConfirmDialog.classList.remove("hidden");
    });
})

// Pagination
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