const bookList = document.getElementById('book-list')

const modal = document.getElementById('exampleModal')
const modalBody = modal.querySelector('.modal-body')
const modalTitle = modal.querySelector('#exampleModalLabel')
const modalBtn = modal.querySelector('#btn-save-changes')

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

function getBooks() {
    fetch('http://localhost:3000/books')
        // если header 200, то...
        .then(response => response.json())//если ввести .text(), то он обработает ответ строкой
        // ...то выводим данные в консоль
        .then(data => renderBooks(data));//data - это собственно ответ сервера
}

getBooks()

function getForm() {
    fetch('./book-form.html')
        .then(response => response.text())
        .then(html => {
            modalBody.innerHTML = html
        })
}

modal.addEventListener('show.bs.modal', event => {
    getForm()
    modalTitle.textContent = 'Добавить книгу'
})


modalBtn.addEventListener('click', event => {
    modalBody.querySelector('#exampleFormControlInput1').value = "alskdfj"
    modalBody.querySelector('#exampleFormControlInput2').value = "alskdfj"

    const title = modalBody.querySelector('#exampleFormControlInput1').value
    const author = modalBody.querySelector('#exampleFormControlInput2').value

    const book = {
        title: title,
        author: author
    }

    fetch('http://localhost:3000/books/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'//говорим серверу, что данные отправляем в виде json. Если не указать, сервер выдаст ошибку
        },
        body: JSON.stringify(book)
    })
    .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json()
        })
        .then(data => {
            getBooks()
            console.log(data);
            console.log(data.body);
            console.log("newBook:", data.newBook);
            console.log("result:", data.result);
    })
    
})


// сперва фетч - посылаем запрос
// первый then - получаем ответ
// второй then - чё-то делаем с этим ответом