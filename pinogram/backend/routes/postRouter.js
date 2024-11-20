const express = require("express")
const {getAllPosts,uploadedPost,likePost,deletePost,postComment,getPost,deleteComment} = require('../controllers/posts')
const postRouter = express.Router();

postRouter.get('/',getAllPosts)
postRouter.get('/post/:id',getPost);
postRouter.post('/',uploadedPost)
postRouter.put('/like',likePost)
postRouter.delete('/delete',deletePost)
postRouter.post('/comment',postComment)
postRouter.post('/deleteComment',deleteComment)

module.exports = postRouter