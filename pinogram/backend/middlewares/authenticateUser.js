const authenticateUser = (socket, next) => {
  const user = getUserFromToken(socket.handshake.query.token);
  
  if (user) {
    socket.user = user;
    next();
  } else {
    next(new Error('Authentication failed'));
  }
};

module.exports = authenticateUser;
