const list_items = [...Array(65).keys()]

const list_element = document.getElementById('list');
const pagination_element = document.getElementById('pagination');

// Initialise states
let currentPage = 1;
let itemsPerPage = 6;
let totalPages;

function DisplayList(items, wrapper, rowsPerPage, page) {
    let start = rowsPerPage * (page - 1);
    console.log({ start });
    let end = rowsPerPage * page;
    console.log({ end });
    wrapper.innerHTML = "";
    console.log(wrapper);
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
    renderPages();
}

DisplayList(list_items, list_element, itemsPerPage, currentPage);


document.addEventListener('click', onDocumentClick);

function onDocumentClick(event) {
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

function renderPages() {
    totalPages = Math.ceil(list_items.length / itemsPerPage)
    console.log({ totalPages });
    let pageBtns = document.querySelector(".pagenumbers");
    console.log({ pageBtns });

    pageBtns.innerHTML = `<button data-pagination="firstPage"><span class="material-icons">first_page</span></button>`

    if (currentPage !== 1)
        pageBtns.innerHTML += `<button data-pagination="prevPage"><span class="material-icons">keyboard_arrow_left</span></button>`

    if (totalPages) {
        for (let i = 1; i <= totalPages; i++) {
            // pageBtns.innerHTML += `<button data-pagination="pageNumber" class="pageNumber">${i}</button>`
            let btn = PaginationButton(i, list_items);
            pagination_element.appendChild(btn);
        }
    }

    if (currentPage !== totalPages)
        pageBtns.innerHTML += `<button data-pagination="nextPage"><span class="material-icons">keyboard_arrow_right</span></button>`

    pageBtns.innerHTML += `<button data-pagination="lastPage"><span class="material-icons">last_page</span></button>`
}

// =============================================================
// let current_page = 1;
// let rows = 10;

// function DisplayList(items, wrapper, rows_per_page, page) {
//     wrapper.innerHTML = "";
//     page--;

//     let start = rows_per_page * page;
//     let end = start + rows_per_page;
//     let paginatedItems = items.slice(start, end);

//     for (let i = 0; i < paginatedItems.length; i++) {
//         let item = "Item " + paginatedItems[i];

//         let item_element = document.createElement('div');
//         item_element.classList.add('item');
//         item_element.innerText = item;

//         wrapper.appendChild(item_element);
//     }
// }

// function SetupPagination(items, wrapper, rows_per_page) {
//     wrapper.innerHTML = "";

//     let page_count = Math.ceil(items.length / rows_per_page);
//     var pages = Math.round(items.length / rows_per_page);
//     console.log({ page_count, pages })
//     for (let i = 1; i < page_count + 1; i++) {
//         let btn = PaginationButton(i, items);
//         wrapper.appendChild(btn);
//     }
// }

function PaginationButton(page, items) {
    let button = document.createElement('button');
    button.innerText = page;
    button.dataset.pagination = "pageNumber";
    console.log({ page, items });
    if (currentPage === page) button.classList.add('active');

    button.addEventListener('click', function() {
        currentPage = page;
        DisplayList(items, list_element, rows, currentPage);

        let current_btn = document.querySelector('.pagenumbers button.active');
        console.log("b4", current_btn);
        current_btn.classList.remove('active');
        console.log("aft", current_btn);
        button.classList.add('active');
    });

    return button;
}

// DisplayList(list_items, list_element, rows, current_page);
// SetupPagination(list_items, pagination_element, rows);