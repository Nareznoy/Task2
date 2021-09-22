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

let table = document.querySelector(".main-table")

let filteredDatas = datas
let currentPage = 0
displayContent(currentPage, filteredDatas)
resizebleColumns(table)

// Вывод контента таблицы
function displayContent(currentPage, array) {
    let tbody = document.createElement('tbody')
    let numberOfPages

    if (array.length == 0) {
        numberOfPages = 1
        let oldTbody = table.querySelector('tbody')
        table.replaceChild(tbody, oldTbody)
        addLinkPages(numberOfPages)
        return
    }

    numberOfPages = Math.ceil(filteredDatas.length / 5)
    let start = 5 * currentPage
    let end

    if (array.length < 5) {
        end = array.length
    } else if (currentPage === numberOfPages - 1) {
        end = 5 * currentPage + (array.length % 5)
    } else {
        end = 5 * currentPage + 5
    }

    for (let i = start; i < end; i++) {
        let row = document.createElement('tr')

        row.insertAdjacentHTML("afterbegin", `<td> ${array[i].id} </td> <td> ${array[i].name} </td> <td> ${array[i].value} </td>`)
        tbody.appendChild(row)
    }
    let oldTbody = table.querySelector('tbody')
    table.replaceChild(tbody, oldTbody);
    addLinkPages(numberOfPages)
}



// Сортировка по нажатию на столбцы
let order = -1
let currentCellSort = 0
let tableHeaders = table.querySelectorAll('.table-header')
for (let i = 0; i < tableHeaders.length; i++) {
    tableHeaders[i].addEventListener('click', () => {
        if (i != currentCellSort) {
            order = -1
        } else {
            order *= -1
        }

        currentCellSort = i

        sortArray(filteredDatas, tableHeaders[i].innerText)
        setOrderImg()
        displayContent(currentPage, filteredDatas)
    })
}


// Вывод значков направления сортировки
function setOrderImg() {
    for (let i = 0; i < tableHeaders.length; i++) {
        if (i === currentCellSort) {
            tableHeaders[i].childNodes[1].classList.remove('hidden')
            if (order == 1) {
                tableHeaders[i].childNodes[1].classList.add('rotate')
            } else {
                tableHeaders[i].childNodes[1].classList.remove('rotate')
            }
            continue;
        }
        tableHeaders[i].childNodes[1].classList.add('hidden')
    }

}

// Сортировка массива по столбцу
function sortArray(inputArray, cell) {
    if (cell == 'ID') {
        inputArray.sort(compareId)
    } else if (cell == 'Name') {
        inputArray.sort(compareName)
    } else {
        inputArray.sort(compareValue)
    }

    function compareId(a, b) {
        if (a.id > b.id) return -1 * order
        if (a.id < b.id) return 1 * order
    }

    function compareName(a, b) {
        if (a.name > b.name) return -1 * order
        if (a.name < b.name) return 1 * order
    }

    function compareValue(a, b) {
        if (a.value > b.value) return -1 * order
        if (a.value < b.value) return 1 * order
    }

    return inputArray
}

// Обработчик фильтрации данных по полю Name
document.querySelector('.filter-btn').addEventListener('click', () => {
    let filter = document.querySelector('.filter-text').value
    filteredDatas = datas.filter(data => data.name.indexOf(filter) != -1)
    displayContent(currentPage, filteredDatas)
})


// Вывод переключателей по страницам таблицы
function addLinkPages(numberOfPages) {
    let tableBlockElement = document.querySelector(".table-block")
    document.querySelectorAll('.page-link').forEach(e => e.remove())

    for (let i = 0; i < numberOfPages; i++) {
        let linkElement = document.createElement('a')
        linkElement.classList.add('page-link')
        linkElement.textContent = i + 1

        if (i === currentPage) {
            linkElement.classList.add('current-page')
        }

        linkElement.addEventListener('click', () => {
            currentPage = linkElement.textContent - 1
            displayContent(currentPage, filteredDatas)
        })

        tableBlockElement.insertAdjacentElement('beforeend', linkElement)
    }
}