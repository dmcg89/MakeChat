//  chat.js
module.exports = (io, socket, onlineUsers, channels) => {
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

  socket.on('new channel', (newChannel) => {
    // Save new channel to out channels object the array will hold the messages
    channels[newChannel] = [];
    // Have the socket join the new channel room
    socket.join(newChannel);
    // Inform all clients of the new channel
    io.emit('new channel', newChannel);
    // Emit to the client that made the new channel, to change their channel
    // they made
    socket.emit('user changed channel', {
      channel: newChannel,
      messages: channels[newChannel],
    });
  });

  // Have the socket join the room of the channel.
  socket.on('user changed channel', (newChannel) => {
    socket.join(newChannel);
    socket.emit('user changed channel', {
      channel: newChannel,
      messages: channels[newChannel],
    });
  });
};
