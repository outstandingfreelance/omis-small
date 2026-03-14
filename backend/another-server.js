import express from 'express'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
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
]

app.get('/books', (req, res) => {
  res.send(books)
})

app.post('/test', (req, res) => res.status(200).send({result: 'ok'}))

app.post('/books/add-new', (req, res) => {
    const { title, author } = req.body
    let newBook = null

    res.status(200).send({result: 'ok'})

})



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})