var datas = [
    { id: 1, name: "Name 1", value: -1 },
    { id: 2, name: "Name 21", value: 0 },
    { id: 3, name: "Name 3", value: 1 },
    { id: 4, name: "Name 2", value: 20 },
    { id: 5, name: "Name 10", value: 10 },
    { id: 6, name: "Name 1", value: -1 },
    { id: 7, name: "Name 21", value: 0 },
    { id: 8, name: "Name 3", value: 1 },
    { id: 9, name: "Name 2", value: 20 },
    { id: 10, name: "Name 10", value: 10 },
    { id: 11, name: "Name 10", value: 10 },
    { id: 12, name: "Name 10", value: 10 }
];

let numberOfPages = Math.ceil(datas.length / 5);
let currentPage = 0;

displayContent(currentPage, datas);

function displayContent(currentPage, array) {
    let tbody = document.createElement('tbody')


    // let htmlRow = ``;
    let start = 5 * currentPage;
    let end;

    if (currentPage === numberOfPages - 1) {
        end = 5 * currentPage + (datas.length % 5)
    }
    else {
        end = 5 * currentPage + 5
    }

    for (let i = start; i < end; i++) {
        let row = document.createElement('tr');

        row.insertAdjacentHTML("afterbegin", `<td> ${datas[i].id} </td> <td> ${datas[i].name} </td> <td> ${datas[i].value} </td>`)
        tbody.appendChild(row)
        // document.querySelector(".table-block").appendChild(row);
    }
    let table = document.querySelector(".main-table")
    let oldTbody = table.querySelector('tbody')
    table.replaceChild(tbody, oldTbody);

}


let order = -1;
let currentCellSort = 0;


let tableHeaders = document.querySelectorAll('.table-header')
for (let i = 0; i < tableHeaders.length; i++) {
    tableHeaders[i].addEventListener('click', () => {
        if(i != currentCellSort){
            order = -1
        }
        else{
            order *= -1;
        }
        // sortArray(tableHeader.innerText)

        if (tableHeaders[i].innerText == 'ID') {
            datas.sort(compareId)
        }
        else if (tableHeaders[i].innerText == 'Name') {
            datas.sort(compareName)
        }
        else {
            datas.sort(compareValue)
        }



        // tableHeader.childNodes[1].classList.remove('hidden')

        currentCellSort = i;
        setOrderImg();

        displayContent(currentPage, datas);
    })
}

function setOrderImg() {
    for (let i = 0; i < tableHeaders.length; i++) {
        if (i === currentCellSort) {
            tableHeaders[i].childNodes[1].classList.remove('hidden')
            if (order == 1){
                tableHeaders[i].childNodes[1].classList.add('rotate')
            }
            else{
                tableHeaders[i].childNodes[1].classList.remove('rotate')
            }
            continue;
        }
        tableHeaders[i].childNodes[1].classList.add('hidden')
    }

}

function compareId(a, b) {
    if (a.id > b.id) return -1 * order;
    if (a.id < b.id) return 1 * order;
}

function compareName(a, b) {
    if (a.name > b.name) return -1 * order;
    if (a.name < b.name) return 1 * order;
}

function compareValue(a, b) {
    if (a.value > b.value) return -1 * order;
    if (a.value < b.value) return 1 * order;
}

function sortArray(cell) {
    if (cell == 'ID') {
        datas.sort(compareId)
    }
    else if (cell == 'Name') {
        datas.sort(compareName)
    }
    else {
        datas.sort(compareValue)
    }
}


// let filter = document.querySelector('.filter-text').value
let filteredDatas = datas.filter((value) => {
    value.id > 5
})

document.querySelector('.filter-btn').addEventListener('click', () => {
    displayContent(currentPage, filteredDatas)
})

let htmlLinkPages = ``

for (let i = 0; i < numberOfPages; i++) {
    htmlLinkPages += `<a class="page-link">${i + 1}</a>`
}
document.querySelector(".table-block").insertAdjacentHTML("afterend", htmlLinkPages);

let pageLinks = document.querySelectorAll('.page-link');
for (let pageLink of pageLinks) {
    pageLink.addEventListener('click', () => {
        currentPage = pageLink.textContent - 1;
        displayContent(currentPage, datas);
    })
}