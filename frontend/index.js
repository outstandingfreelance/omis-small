const bookList = document.getElementById('book-list')

const modalNew = document.getElementById('exampleModal')
const modalTitle = modalNew.querySelector('#exampleModalLabel')
const modalBtn = modalNew.querySelector('#btn-save-changes')

const modalEdit = document.getElementById('exampleModal')

const modalDeletePrompt = document.getElementById('deletePrompt')
const modalDeleteBody = modalDeletePrompt.querySelector('.modal-body')

const btnsDelete = bookList.querySelectorAll('.delete')
const btnsEdit = bookList.querySelectorAll('.edit')
//так мы повесим прослушиватель сразу на все кнопки

const btnNewBook = document.getElementById('btn-add-new')
btnNewBook.onclick = async () => {
    const form = await getForm()
    modalNew.addEventListener('show.bs.modal', event => {
        
        modalNew.querySelector('.modal-body').innerHTML = form
        modalTitle.textContent = 'Добавить книгу'
    })
    new bootstrap.Modal(modalNew).show()
}



function renderBooks(books) {
    console.log(books)
    bookList.innerHTML = ''
    books.forEach(
        book => {
            const li = document.createElement('li')
            li.textContent = book.title
            li.classList.add('list-group-item')

            const btnDelete = document.createElement('button')
            btnDelete.innerHTML = '<i class="bi bi-trash3"></i>'
            btnDelete.classList.add('btn', 'btn-danger', 'btn-sm', 'float-end', 'm-1', 'delete')

            btnDelete.setAttribute('data-id', book.id)

            const btnEdit = document.createElement('button')
            btnEdit.innerHTML = '<i class="bi bi-pencil-square"></i>'
            btnEdit.classList.add('btn', 'btn-primary', 'btn-sm', 'float-end', 'm-1', 'edit')

            btnEdit.setAttribute('data-id', book.id)

            btnEdit.addEventListener('click', forBtnEdit)
            btnDelete.addEventListener('click', forBtnDelete)


            //li.innerHTML = li.textContent + btnDelete.outerHTML + btnEdit.outerHTML

            li.appendChild(btnEdit)
            li.appendChild(btnDelete)


            bookList.appendChild(li)
        }
    )
}

function getBooks() {
    fetch('http://localhost:3000/books')
        // если header 200, то...
        .then(response => response.json()) //если ввести .text(), то он обработает ответ строкой
        // ...то выводим данные в консоль
        .then(data => renderBooks(data)); //data - это собственно ответ сервера
}

getBooks()

async function getForm() {
    const promis = await fetch('./book-form.html')
    const text = await promis.text()
    return text //промис - это объект, который может находиться в одном из трёх состояний: ожидание, исполнено, отклонено. Когда мы делаем fetch, он возвращает промис, который будет исполнен, когда данные будут получены. Метод .text() также возвращает промис, который будет исполнен, когда текст будет извлечён из ответа. Поэтому мы используем await для обоих промисов, чтобы получить результат их исполнения.
    /*await fetch('./book-form.html')
        .then(response => response.text())
        .then(html => {
    
            modalNew.querySelector('.modal-body').innerHTML = html
        }) */
}

modalBtn.addEventListener('click', event => {
    const title = modal.querySelector('.modal-body').querySelector('#exampleFormControlInput1').value
    const author = modal.querySelector('.modal-body').querySelector('#exampleFormControlInput2').value

    const book = {
        title: title,
        author: author
    }

    fetch('http://localhost:3000/books/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' //говорим серверу, что данные отправляем в виде json. Если не указать, сервер выдаст ошибку
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

    const modalDeleteTitle = modalDeletePrompt.querySelector('#deletePromptLabel')
    modalDeleteTitle.innerText = 'Book deletion #' + event.currentTarget.dataset.id

    const _deleteConfirmed = new bootstrap.Modal(modalDeletePrompt)
    _deleteConfirmed.show()

    modalDeletePrompt.querySelector('#btn-delete').addEventListener('click', (event) => {

        console.log(event.currentTarget.dataset.id)
        console.log("кликнули на кнопку удалить")

        fetch('http://localhost:3000/books/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: event.currentTarget.dataset.id
            }) // data-id // data-firstname // data-first-lastname
        }).then(response => {
            return response.json()
        }).then(data => {
            //TODO - удалить книгу из списка на странице
            console.log(data)
            getBooks()
            _deleteConfirmed.hide()
        })
    })
}


function forBtnEdit(event) {

    console.log(event.currentTarget.dataset.id)
    const idFromEventTarget = event.currentTarget.dataset.id;
    console.log("кликнули на кнопку редактировать")
    
    const modalTitle = modal.querySelector('#exampleModalLabel')
    modalTitle.innerText = 'Modifying book #' + event.currentTarget.dataset.id

    // как корзина и по лесу. сперва заполняешь всем чем нужно, уже после этого уже вывыдишь, показываешь и т.д
    modal.addEventListener('show.bs.modal', event => {
        // step 1 get form 
        getForm()

        const title = modal.querySelector('#exampleFormControlInput1')
        const author = modal.querySelector('#exampleFormControlInput2')
        console.log(title, author);

        // step 2 fill the form with data from server
        fetch('http://localhost:3000/books/' + idFromEventTarget, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }) //если бомбим GET, то body не нужен. мы только принимаем, мы не ничего через body не отправляем.
            .then(response => response.json())
            .then(data => {

                console.log(data);

                
                title.value = data.bookFromResponse.title
                author.value = data.bookFromResponse.author
            })
    })

    const _editModal = new bootstrap.Modal(modal)
    _editModal.show()



    modalDeletePrompt.querySelector('#btn-delete').addEventListener('click', (event) => {
        console.log(event.currentTarget.dataset.id)
    })
}

function fieldToTakeValue() {
    exampleFormControlInput1.addEventListener()
}