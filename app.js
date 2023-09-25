const ejs =  require('ejs');
const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/Post.js');
const app = express();
const port = 3000;

//* Middle Wares
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//* MongoDB connection
const connection = mongoose.connect('mongodb://localhost/cleanblog-test-db');

connection.catch(err => {
    if (err) console.log(err);
});

app.get('/', async (req, res) => {
    const posts = await Post.find({}).exec();
    res.render('index',{
        posts
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/add_post', (req, res) => {
    res.render('add_post');
});

app.get('/posts/:id', async (req,res) => {
    const post = await Post.findById(req.params.id).exec();
    res.render('post',{
        post
    });
})
app.post('/post', async (req,res) => {
    await Post.create(req.body);
    console.log(req.body);
    res.redirect('/');
});


app.listen(port,() => {
    console.log(`Server start at ${port}`);
});