const bookList = document.getElementById('book-list')
const modal = document.getElementById('exampleModal')
const modalTitle = modal.querySelector('#exampleModalLabel')
const modalBody = modal.querySelector('.modal-body')
const modalBtn = modal.querySelector('#btn-save-changes')

const deletePrompt = document.getElementById('deletePrompt')
const bsModal = new bootstrap.Modal(modal)
const bsDeleteModal = new bootstrap.Modal(deletePrompt)

let currentEditId = null

// ─── Fetch helpers ───────────────────────────────────────────────────────────

function getBooks() {
    fetch('http://localhost:3000/books')
        .then(r => r.json())
        .then(renderBooks)
}

async function getForm() {
    const res = await fetch('./book-form.html')
    return res.text()
}

// ─── Render ──────────────────────────────────────────────────────────────────

function renderBooks(books) {
    bookList.innerHTML = ''
    books.forEach(book => {
        const li = document.createElement('li')
        li.classList.add('list-group-item')
        li.textContent = book.title

        const btnEdit = document.createElement('button')
        btnEdit.innerHTML = '<i class="bi bi-pencil-square"></i>'
        btnEdit.classList.add('btn', 'btn-primary', 'btn-sm', 'float-end', 'm-1')
        btnEdit.addEventListener('click', () => openEditModal(book.id))

        const btnDelete = document.createElement('button')
        btnDelete.innerHTML = '<i class="bi bi-trash3"></i>'
        btnDelete.classList.add('btn', 'btn-danger', 'btn-sm', 'float-end', 'm-1')
        btnDelete.addEventListener('click', () => openDeleteModal(book.id))

        li.appendChild(btnEdit)
        li.appendChild(btnDelete)
        bookList.appendChild(li)
    })
}

// ─── Add new book ─────────────────────────────────────────────────────────────

document.getElementById('btn-add-new').addEventListener('click', async () => {
    currentEditId = null
    modalTitle.textContent = 'Добавить книгу'
    modalBody.innerHTML = await getForm()
    bsModal.show()
})

// ─── Save (add or edit) ───────────────────────────────────────────────────────

modalBtn.addEventListener('click', () => {
    const title = modalBody.querySelector('#exampleFormControlInput1').value
    const author = modalBody.querySelector('#exampleFormControlInput2').value

    if (currentEditId) {
        // Edit existing book
        fetch(`http://localhost:3000/books/edit/${currentEditId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author })
        })
        .then(r => r.json())
        .then(() => { getBooks(); bsModal.hide() })
    } else {
        // Add new book
        fetch('http://localhost:3000/books/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author })
        })
        .then(r => r.json())
        .then(() => { getBooks(); bsModal.hide() })
    }
})

// ─── Edit ─────────────────────────────────────────────────────────────────────

async function openEditModal(id) {
    currentEditId = id
    modalTitle.textContent = 'Редактировать книгу #' + id
    modalBody.innerHTML = await getForm()

    fetch(`http://localhost:3000/books/${id}`)
        .then(r => r.json())
        .then(data => {
            modalBody.querySelector('#exampleFormControlInput1').value = data.bookFromResponse.title
            modalBody.querySelector('#exampleFormControlInput2').value = data.bookFromResponse.author
        })

    bsModal.show()
}

// ─── Delete ───────────────────────────────────────────────────────────────────

function openDeleteModal(id) {
    deletePrompt.querySelector('#deletePromptLabel').textContent = 'Book deletion #' + id

    // Clone button to remove old listeners
    const btnDelete = deletePrompt.querySelector('#btn-delete')
    const freshBtn = btnDelete.cloneNode(true)
    btnDelete.replaceWith(freshBtn)

    freshBtn.addEventListener('click', () => {
        fetch('http://localhost:3000/books/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        })
        .then(r => r.json())
        .then(() => { getBooks(); bsDeleteModal.hide() })
    })

    bsDeleteModal.show()
}

// ─── Init ─────────────────────────────────────────────────────────────────────

getBooks()
