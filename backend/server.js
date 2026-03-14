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

app.post('/test', (req, res) => res.status(200).send({result: 'ok'}));


// по пост - он сам назодит в документе, какой запрос имеет тип пост
app.post('/books/add', (req, res) => {
    const { title, author } = req.body;
    console.log(req);
    /*
    const newBook = null;
    try {
        if (!title || !author) {
            //throw new Error('Title and author are required');
        }

        newBook = {
            id: books.length + 1,
            title: title.toString(),//так мы защищаемся от инъекций. без тайпскрипта преобразуем.
            author: author.toString(),
        }

        books.push(newBook);

        //всё содержание ошибки изходящее из трая идёт в аргумент err, который в catch()
    } catch (err) {
        res
            .status(500)
            .send({ 
                result: 'error',
                message: err.message 
            });
    } finally {
        // anyway run this code , even if there was an error
    }
        */

    res.status(200).send({
        result: 'ok',
        message: 'Book added successfully',
        //newBook: newBook//отсылаем чтобы наш фронтендер увидел в браузере во вкладке "сеть"
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});