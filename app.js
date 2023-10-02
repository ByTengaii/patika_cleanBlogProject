const ejs =  require('ejs');
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const pageController = require('./controller/pageController.js');
const postController = require('./controller/postController.js');

const app = express();
const port = 3000;

//* Middle Wares
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method',{
    methods:['GET', 'POST']
}));

//* MongoDB connection
const connection = mongoose.connect('mongodb://localhost/cleanblog-test-db');

connection.catch(err => {
    if (err) console.log(err);
});

//* Routes
app.get('/', pageController.getIndex);
app.get('/about', pageController.getAbout);
app.get('/add_post', pageController.getAddPost);
app.get('/posts/:id', postController.getPostPage);
app.get('/posts/edit/:id', postController.editPost);

app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id',postController.deletePost)

app.listen(port,() => {
    console.log(`Server start at ${port}`);
});