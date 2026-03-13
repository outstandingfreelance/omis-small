import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
// будет выводить запросы в виде объекта

const books = [
    {
        id: 1,
        title: 'Book 1',
        author: 'Author 1'
    },
    {
        id: 2,
        title: 'Book 2',
        author: 'Author 2'
    },
    {
        id: 3,
        title: 'Book 3',
        author: 'Author 3'
    }
];

app.get('/books', (req, res) => {
    //app.get - родная функция экспресса
    // если он увидит, что прилетел запрос get, то он запустит именно
    // эту функцию

    // первый параметр - это то, на запрос с какой директории надо реагировать
  res.send(books);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});