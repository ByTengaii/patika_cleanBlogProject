const Post = require('../models/Post');

exports.getPostPage =  async (req,res) => {
    const post = await Post.findById(req.params.id).exec();
    res.render('post',{
        post
    });
};

exports.createPost = async (req,res) => {
    await Post.create(req.body);
    res.redirect('/');
};

exports.editPost = async (req,res) => {
    const post = await Post.findById(req.params.id).exec();
    res.render('editPost',{
        post
    });
};

exports.updatePost = async (req,res) => {
    const post = await Post.findById(req.params.id);
    post.title = req.body.title;
    post.detail = req.body.detail;
    post.save();
    res.redirect(`/posts/${req.params.id}`);    
};

exports.deletePost = async (req, res) => {
    await Post.findByIdAndRemove(req.params.id);
    res.redirect('/');
};