import express from 'express';
import type { Request, Response } from 'express'
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

interface IBook {
    id: number,
    title: string,
    author?: string
}
// здесь не заьудь в коде прописать этот ифчик

type BooksArray = IBook[]

interface IAddBookRequest {
    title: string,
    author: string
}

interface IApiResponse<T> {
    result: "ok"|"error",
    message?: string,
    data?: T
}


const books: BooksArray = [
    { id: 1, title: 'IBook 1', author: 'Author 1' },
    { id: 2, title: 'IBook 2', author: 'Author 2' },
    { id: 3, title:  'IBook 3', author: 'Author 3' },
];

app.get('/books', (req: Request, res: { send: (arg0: BooksArray) => void; }) => {
    res.send(books);
});



app.get('/books/:id', (req: Request, res: Response) => {
    const book: IBook | undefined = books.find((b) => b.id === parseInt(req.params.id as string));
    // здесь не заьудь в коде зареасчть
    res.status(200).send({ bookFromResponse: book, result: 'ok' });
});

app.post('/books/add', (req: Request<{}, {}, IAddBookRequest>, res) => {
    const { title, author } = req.body;
    if (!title || !author) return res.status(400).send({ result: 'error', message: 'Title and author are required' });

    const newBook = { id: books.length + 1, title: title.toString(), author: author.toString() };
    books.push(newBook);
    res.status(200).send({ result: 'ok', newBook });
});

app.put('/books/edit/:id', (req, res: Response<IApiResponse<IBook>>) => {
    const { title, author } = req.body;
    const book: IBook | undefined = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send({ result: 'error', message: 'IBook not found' });

    if (title) book.title = title.toString();
    if (author) book.author = author.toString();
    res.status(200).send({ result: 'ok', data: book });
});

app.delete('/books/delete', (req: Request<{}, {}, IBook>, res: Response) => {
    const { id } = req.body;
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return res.status(404).send({ result: 'error', message: 'IBook not found' });

    books.splice(index, 1);
    res.status(200).send({ result: 'ok', message: 'IBook deleted successfully' });
});

app.listen(port, () => console.log(`SERVER IS RUNNING ON PORT ${port}`));
