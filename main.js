const list_items = [...Array(65).keys()]

const list_element = document.getElementById('list');
const pagination_element = document.getElementById('pagination');

// Initialise states
let currentPage = 1;
let itemsPerPage = 6;
let totalPages;

function DisplayList(items, wrapper, rowsPerPage, page) {
    let start = rowsPerPage * (page - 1);
    let end = rowsPerPage * page;
    wrapper.innerHTML = "";
    let paginatedItems = items.slice(start, end);
    paginatedItems.map(item => {
        let text = "Item " + item;
        let item_element = document.createElement('div');
        item_element.classList.add('item');
        item_element.innerText = text;
        return (
            wrapper.appendChild(item_element)
        )
    });
    renderPages(page, pagination_element);
}


document.addEventListener('click', onDocumentClick);

function onDocumentClick(event) {
    console.log(event.target.dataset.pagination);
    switch (event.target.dataset.pagination) {
        case "pageNumber":
            currentPage = Number(event.target.innerText);
            break;
        case "prevPage":
            currentPage = currentPage === 1 ? currentPage : currentPage - 1;
            break;
        case "nextPage":
            currentPage = currentPage === totalPages ? currentPage : currentPage + 1;
            break;
        case "firstPage":
            currentPage = 1;
            break;
        case "lastPage":
            currentPage = totalPages;
            break;
        default:
    }
    console.log({ currentPage });
    pageContentFilter(currentPage);
}

function pageContentFilter(page) {
    currentPage = page;
    DisplayList(list_items, list_element, itemsPerPage, currentPage);
}

function renderPages(page, wrapper) {
    totalPages = Math.ceil(list_items.length / itemsPerPage)
    let pageBtns = document.querySelector(".pagenumbers");
    pageBtns.innerHTML = `<button data-pagination="firstPage"><span data-pagination="firstPage" class="material-icons">first_page</span></button>`

    if (currentPage !== 1)
        pageBtns.innerHTML += `<button data-pagination="prevPage"><span data-pagination="prevPage" class="material-icons">keyboard_arrow_left</span></button>`

    if (totalPages > 0) {
        for (let i = 1; i <= totalPages; i++) {
            // pageBtns.innerHTML += `<button data-pagination="pageNumber" class="pageNumber" id="pageNumber">${i}</button>`
            let btn = PaginationButton(i, list_items);
            wrapper.appendChild(btn);
        }
    }

    if (currentPage !== totalPages)
        pageBtns.innerHTML += `<button data-pagination="nextPage"><span data-pagination="nextPage" class="material-icons">keyboard_arrow_right</span></button>`

    pageBtns.innerHTML += `<button data-pagination="lastPage"><span data-pagination="lastPage" class="material-icons">last_page</span></button>`
}

function PaginationButton(page, items) {
    let button = document.createElement('button');
    button.innerText = page;
    button.dataset.pagination = "pageNumber";
    if (currentPage === page) button.classList.add('active');

    button.addEventListener('click', function() {
        currentPage = page;
        DisplayList(items, list_element, rows, currentPage);
        let current_btn = document.querySelector('.pagenumbers button.active');
        current_btn.classList.remove('active');
        button.classList.add('active');
    });
    return button;
}

DisplayList(list_items, list_element, itemsPerPage, currentPage);