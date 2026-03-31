import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const books = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
    { id: 3, title: 'Book 3', author: 'Author 3' },
];

app.get('/books', (req, res) => {
    res.send(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(b => parseInt(b.id) === parseInt(req.params.id));
    res.status(200).send({ bookFromResponse: book, result: 'ok' });
});

app.post('/books/add', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) return res.status(400).send({ result: 'error', message: 'Title and author are required' });

    const newBook = { id: books.length + 1, title: title.toString(), author: author.toString() };
    books.push(newBook);
    res.status(200).send({ result: 'ok', newBook });
});

app.put('/books/edit/:id', (req, res) => {
    const { title, author } = req.body;
    const book = books.find(b => parseInt(b.id) === parseInt(req.params.id));
    if (!book) return res.status(404).send({ result: 'error', message: 'Book not found' });

    if (title) book.title = title.toString();
    if (author) book.author = author.toString();
    res.status(200).send({ result: 'ok', book });
});

app.delete('/books/delete', (req, res) => {
    const { id } = req.body;
    const index = books.findIndex(b => parseInt(b.id) === parseInt(id));
    if (index === -1) return res.status(404).send({ result: 'error', message: 'Book not found' });

    books.splice(index, 1);
    res.status(200).send({ result: 'ok', message: 'Book deleted successfully' });
});

app.listen(port, () => console.log(`SERVER IS RUNNING ON PORT ${port}`));
