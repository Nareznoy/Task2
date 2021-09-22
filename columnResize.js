// Измененение ширины столбцов
function resizebleColumns() {
    let table = document.querySelector('.main-table')
    let separators = document.querySelectorAll('.separator')
    for (let separator of separators) {
        separator.style.height = table.offsetHeight + 'px'

        let pageX
        let currentCol
        let currentColWidth
        let nextCol
        let nextColWidth;

        separator.addEventListener('mousedown', function(e) {
            pageX = e.pageX

            currentCol = e.target.parentElement
            currentColWidth = currentCol.offsetWidth

            nextCol = currentCol.nextElementSibling
            if (nextCol) {
                nextColWidth = nextCol.offsetWidth
            }
        });

        document.addEventListener('mousemove', function(e) {
            if (currentCol) {
                var diff = e.pageX - pageX;

                if (nextCol) {
                    nextCol.style.width = (nextColWidth - (diff)) + 'px'
                }

                currentCol.style.width = (currentColWidth + diff) + 'px'
            }
        });

        document.addEventListener('mouseup', function(e) {
            currentCol = undefined
            nextCol = undefined
            pageX = undefined
            nextColWidth = undefined
            currentColWidth = undefined
        });
    }
}