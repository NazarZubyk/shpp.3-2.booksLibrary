import express from 'express'
import http from 'http'
import path from 'path';
import ejs from 'ejs';

const app = express()
const port = 3005;

app.set('views', path.join('front', 'books-page')); 
app.set('view engine', 'ejs'); 
app.use('/static', express.static(path.join('front')));

http.createServer(app).listen(port,()=>{
    console.log(`Server start on ${port} port`)
})

// Mock data from SQL database
const books = [
    { id: 22, title: 'Book 1', author: 'Author 1' },
    { id: 23, title: 'Book 2', author: 'Author 2' },
    { id: 25, title: 'Book 1', author: 'Author 1' },
    { id: 26, title: 'Book 2', author: 'Author 2' },
    { id: 27, title: 'Book 1', author: 'Author 1' },
    { id: 28, title: 'Book 2', author: 'Author 2' },
    { id: 29, title: 'Book 1', author: 'Author 1' },
    { id: 31, title: 'Book 2', author: 'Author 2' },
    { id: 32, title: 'Book 1', author: 'Author 1' },
    { id: 33, title: 'Book 2', author: 'Author 2' },
    { id: 35, title: 'Book 1', author: 'Author 1' },
    { id: 36, title: 'Book 2', author: 'Author 2' },
    { id: 37, title: 'Book 1', author: 'Author 1' },
    { id: 38, title: 'Book 2', author: 'Author 2' },
    { id: 39, title: 'Book 1', author: 'Author 1' },
    { id: 40, title: 'Book 2', author: 'Author 2' },
    { id: 41, title: 'Book 2', author: 'Author 2' },
    { id: 42, title: 'Book 1', author: 'Author 1' },
    { id: 43, title: 'Book 2', author: 'Author 2' },
    { id: 45, title: 'Book 1', author: 'Author 1' },
    { id: 46, title: 'Book 2', author: 'Author 2' },
    { id: 47, title: 'Book 1', author: 'Author 1' },
    { id: 48, title: 'Book 2', author: 'Author 2' },
    { id: 49, title: 'Book 1', author: 'Author 1' },
    { id: 50, title: 'Book 2', author: 'Author 2' },
    // Add more books as needed
];

app.get('/',(req, res)=>{
    res.render('books-page', { books });
})
app.post('/',(req, res)=>{

    res.redirect('books-page/books-page.html')
})
