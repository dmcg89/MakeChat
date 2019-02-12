//  chat.js
module.exports = (io, socket, onlineUsers) => {
  socket.on('new user', (username) => {
    //  Save the username as key to access user's socket id
    onlineUsers[username] = socket.id;
    //  save the username to socket as well
    socket.username = socket.id;
    console.log(`✋ ${username} has joined the chat! ✋`);
    io.emit('new user', username);
  });

  //  Listen for new messages
  socket.on('new message', (data) => {
  // Send that data back to ALL clients
    console.log(`🎤 ${data.sender}: ${data.message} 🎤`);
    io.emit('new message', data);
  });

  socket.on('get online users', () => {
    socket.emit('get online useres', onlineUsers);
  });

  socket.on('new channel', (newChannel) => {
    console.log(newChannel);
  });
};
