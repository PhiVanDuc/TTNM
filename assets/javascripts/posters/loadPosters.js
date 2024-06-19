import pagination from "../utils/pagination.js";

const urlParams = new URLSearchParams(window.location.search);
let currentPage = urlParams.get('page') ? urlParams.get('page') : 1;
const PosterList = document.querySelector(".content-poster .poster-list");

const getPosters = async () => {
    const response = await fetch(`http://localhost:3000/posters?_page=${currentPage}&_per_page=6`);
    const posters = await response.json();
    localStorage.setItem("length-posters", JSON.stringify(posters.items));

    if (posters.data && Array.isArray(posters.data) && posters.data.length > 0 && (+currentPage <= posters.last && +currentPage >= posters.first)) {
        PosterList.innerHTML = posters.data.map((poster) => {
            return `
                <div class="poster-item">
                    <div class="poster-image">
                        <img src="${ poster.files[0] }">
                    </div>

                    <div class="poster-info">
                        <div class="poster-name">
                            <h4>${ poster.name }</h4>
                        </div>

                        <div class="poster-buttons">
                         <a href="http://127.0.0.1:3001/html/detail-poster.html?id=${ poster.id }" class="button-edit" data-id="${ poster.id }">Detail</a>
                            <a href="http://127.0.0.1:3001/html/edit-poster.html?id=${ poster.id }" class="button-edit" data-id="${ poster.id }">Edit</a>
                           

                            <button class="button-delete" data-id="${ poster.id }">Delete</button>
                        </div>
                    </div>
                </div>
            `
        }).join("")
    }
    else {
        PosterList.classList.add("empty");
        PosterList.innerHTML = `<h3>Poster list is empty.</h3>`
    }
}

await getPosters();

const ButtonDeletes = PosterList.querySelectorAll(".button-delete");
const ConfirmDialog = document.querySelector(".confirm-dialog");
const ButtonAgree = ConfirmDialog.querySelector(".button-agree");

ButtonDeletes.forEach(ButtonDelete => {
    ButtonDelete.addEventListener("click", () => {
        const id = ButtonDelete.dataset.id;
        ButtonAgree.dataset.id = id;
        ConfirmDialog.classList.remove("hidden");
    });
})

const paginationElement = document.querySelector(".content-poster .pagination");
const length = JSON.parse(localStorage.getItem("length-posters"));

const pages = pagination(currentPage, Math.ceil(length / 6));
paginationElement.innerHTML = '';

pages.forEach(page => {
    const li = document.createElement('li');
    li.classList.add('page-item');
    
    if (typeof page === 'number') {
        const a = document.createElement('a');
        a.href = `http://127.0.0.1:3001/html/poster-management.html?page=${page}`;
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