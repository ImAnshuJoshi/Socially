const router = require('express').Router();

const Post = require('../models/Post');
const User = require('../models/User');
const { post } = require('./users');

router.post("/",async (req,res)=>{
    const newPost = new Post(req.body);
    try{
        const savedPost = newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
})

router.put('/:id',async(req,res)=>{
    try{

        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("The post has been updated successfully");
        }
        else{
            res.status(403).json("You can update only your own post");
        }
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId===req.body.userId){
            await post.deleteOne();
            res.status(200).json("the post has been deleted");
        }
        res.status(403).json("you can delete only your post");
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.put('/:id/like',async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json("Post is liked");
        }
        else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json("Post is unliked");
        }
    }
    catch(err){
        res.status(500).json(err);
    }
})

//get a post
router.get("/:id",async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.get('/timeline/:userId',async (req,res)=>{
    try{
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId:currentUser._id});

        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId)=>{
                return Post.find({userId:friendId});
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts));
    }
    catch(err){
        res.status(500).json(err);
    }
})

//users post of profile (all post of the user)
router.get('/profile/:username',async (req,res)=>{
    try{
        const currentUser = await User.findOne({username:req.params.username});
        const userPosts = await Post.find({userId:currentUser._id});

        res.status(200).json(userPosts);
    }
    catch(err){
        res.status(500).json(err);
    }
})  

module.exports=router;