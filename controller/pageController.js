const Post = require('../models/Post');
exports.getIndex = async (req, res) => {
    const posts = await Post.find({}).sort('-dataCreated').exec();
    res.render('index',{
        posts
    });
};

exports.getAbout = (req, res) => {
    res.render('about');
};

exports.getAddPost = (req, res) => {
    res.render('add_post');
};