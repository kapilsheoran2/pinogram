const Message = require('../models/messages');

exports.sendMessage = async (io, socket, user, message) => {
  try {
    console.log(`Message received from ${user.username}: ${message}`);

    const newMessage = new Message({ text: message, userId: user._id });
    await newMessage.save();

    io.emit('chat message', { user: user.username, message });
  } catch (err) {
    console.error('Error sending message:', err);
  }
};
