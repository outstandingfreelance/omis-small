const bookList = document.getElementById('book-list')

const modal = document.getElementById('exampleModal')
const modalBody = modal.querySelector('.modal-body')
const modalTitle = modal.querySelector('#exampleModalLabel')
const modalBtn = modal.querySelector('#btn-save-changes')

const btnsDelete = bookList.querySelectorAll('.delete')
const btnsEdit = bookList.querySelectorAll('.edit')
//так мы повесим прослушиватель сразу на все кнопки

function renderBooks(books) {
    books.forEach(
        book => {
            const li = document.createElement('li')
            li.textContent = book.title
            li.classList.add('list-group-item')

            const btnDelete = document.createElement('button')
            btnDelete.innerHTML = '<i class="bi bi-trash3"></i>'
            btnDelete.classList.add('btn', 'btn-danger', 'btn-sm', 'float-end', 'delete')

            btnDelete.setAttribute('data-id', book.id)

            const btnEdit = document.createElement('button')
            btnEdit.innerHTML = '<i class="bi bi-pencil-square"></i>'
            btnEdit.classList.add('btn', 'btn-primary', 'btn-sm', 'float-end', 'me-2', 'edit')

            btnEdit.setAttribute('data-id', book.id)

            btnEdit.addEventListener('click', event => {
                console.log(event)
                console.log("кликнули на кнопку редактировать")
            })
            btnDelete.addEventListener('click', forBtnDelete)


            li.innerHTML = li.textContent + btnDelete.outerHTML + btnEdit.outerHTML

            
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
            console.log("body:", data.body);
            console.log("newBook:", data.newBook);
            console.log("result:", data.result);
    })
    
})


// сперва фетч - посылаем запрос
// первый then - получаем ответ
// второй then - чё-то делаем с этим ответом


function forBtnDelete(event) {
     console.log(event)
     console.log("кликнули на кнопку удалить")
}

function forBtnEdit(event) {
     console.log(event)
     console.log("кликнули на кнопку редактировать")
}
