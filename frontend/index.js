const bookList = document.getElementById('book-list')

function getBooks(){
    fetch('http://localhost:3000/books')
    // если header 200, то...
        .then(response => response.json())//если ввести .text(), то он обработает ответ строкой
        // ...то выводим данные в консоль
        .then(data => renderBooks(data));//data - это собственно ответ сервера
}

getBooks()

function renderBooks(books) {
    books.forEach(
        book => {
            const li = document.createElement('li')
            li.textContent = book.title
            li.classList.add('list-group-item')
            bookList.appendChild(li)
        }
    )
}