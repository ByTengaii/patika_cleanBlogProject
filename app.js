const ejs =  require('ejs');
const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/Post.js');
const methodOverride = require('method-override')

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

app.get('/', async (req, res) => {
    const posts = await Post.find({}).sort('-dataCreated').exec();
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
app.post('/posts', async (req,res) => {
    await Post.create(req.body);
    res.redirect('/');
});

app.get('/posts/edit/:id', async (req,res) => {
    const post = await Post.findById(req.params.id).exec();
    res.render('editPost',{
        post
    });
});

app.put('/posts/:id', async (req,res) => {
    const post = await Post.findById(req.params.id);
    post.title = req.body.title;
    post.detail = req.body.detail;
    post.save();
    res.redirect(`/posts/${req.params.id}`);    
});

app.delete('/posts/:id', async (req, res) => {
    await Post.findByIdAndRemove(req.params.id);
    res.redirect('/');
})

app.listen(port,() => {
    console.log(`Server start at ${port}`);
});