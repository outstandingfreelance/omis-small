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
        title: 'Book 1;kjmnlkjhokj,hnoilukklkjn',
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
    console.log(books)
    // первый параметр - это то, на запрос с какой директории надо реагировать
    res.send(books);
});

app.post('/test', (req, res) => res.status(200).send({ result: 'ok' }));


// по пост - он сам назодит в документе, какой запрос имеет тип пост
app.post('/books/add', (req, res) => {
    const { title, author } = req.body;
    console.log(req);

    let newBook = null;
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


    res.status(200).send({
        result: 'ok',
        message: 'Book added successfully',
        newBook: newBook//отсылаем чтобы наш фронтендер увидел в браузере во вкладке "сеть"
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!');

});

app.delete('/books/delete', (req, res) => {
    const { id } = req.body; //в реальной жизни мы бы получили id из req.body, но для теста я просто захардкодил его
    //const id = red.body.id;
    const index = books.findIndex(book => book.id === id);
    books.splice(index, 1)

    console.log('Deleted ', id);
    
    console.log(books);
    res.status(200).send({
        result: 'ok',
        message: 'Book deleted successfully',
    })
})

// books/123 -> id = 123 (req.params)
app.get('/books/:id', (req, customResponse) => {
    const ourId = req.params.id;

    const bookItem = books.find(book => {
        //console.log(ourId,  "book id", book.id)
        return parseInt(book.id) === parseInt(ourId);
    }
    )
    console.log('book', bookItem);


    // get умеет брать знаечение из url и соотносить его с ключом массива или типа того. но он не использует body для запросов

    customResponse.status(200).send({
        idFromRequest: ourId,
        bookFromResponse: bookItem,
        result: 'ok',
        message: 'Book found successfully',
        
    })
})


app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON PORT ${port}`);
});