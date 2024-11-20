const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.io = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log(`User ${socket.user.username} disconnected`);
    });

    socket.on('chat message', (msg) => {
      chatController.sendMessage(io, socket, socket.user, msg);
    });
  });
};

module.exports = router;
