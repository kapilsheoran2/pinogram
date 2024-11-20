const express = require('express');

const userRouter = express.Router();

const { getAllUser, postUsers, updateUser, getSearch, followUser, getUser, loginUser, resetPassword } = require('../controllers/users')

userRouter.get('/', getAllUser)
userRouter.get('/user/:id', getUser)
userRouter.post('/', postUsers)
userRouter.put('/update/:id', updateUser)
userRouter.get('/search', getSearch)
userRouter.post('/login', loginUser)

userRouter.post('/follow', followUser)
userRouter.put('/reset-password', resetPassword)

module.exports = userRouter