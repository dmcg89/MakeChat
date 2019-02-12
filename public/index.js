//index.js
$(document).ready(()=>{
  const socket = io.connect();

  //Keep track of the current user
  let currentUser;
  //  Get the online users from server
  socket.emit('get online users');

  $('#createUserBtn').click((e)=>{
    e.preventDefault();
    if($('#usernameInput').val().length > 0) {
      socket.emit('new user', $('#usernameInput').val());
      // Save the current user when created
      currentUser = $('#usernameInput').val();
      $('.usernameForm').remove();
      $('.mainContainer').css('display', 'flex');
    }
  });

  $('#sendChatBtn').click((e) => {
    e.preventDefault();
    // Get the message text value
    const message = $('#chatInput').val();
    // Make sure it's not empty
    if(message.length > 0){
      // Emit the message with the current user to the server
      socket.emit('new message', {
        sender : currentUser,
        message : message,
      });
      $('#chatInput').val('');
    }
  });

  $('#newChannelBtn').click( () => {
  let newChannel = $('#newChannelInput').val();

  if(newChannel.length > 0){
    // Emit the new channel to the server
    socket.emit('new channel', newChannel);
    $('#newChannelInput').val("");
  }
})

  //socket listeners
  socket.on('new user', (username) => {
    console.log(`${username} has joined the chat`);
    $('.usersOnline').append(`<div class="userOnline">${username}</div>`);
  })
  //Output the new message
  socket.on('new message', (data) => {
    // Only append the message if the user is in chat.
    const currentChannel = $('.channel-current').text();
    if (currentChannel == data.channel) {
    $('.messageContainer').append(`
      <div class='message'>
        <p class='messageUser'>${data.sender}:</p>
        <p class-'messageText'>${data.message}</p>
      </div>
    `);
  }
  });
  //  get online users socket listener
  socket.on('get online users', (onlineUsers) => {
      for (const username in onlineUsers){
          $('.usersOnline').append(`<p class="userOnline">${username}</p>`)
      }
  });
  //Refresh the online user list
socket.on('user has left', (onlineUsers) => {
  $('.usersOnline').empty();
  for(const username in onlineUsers) {
    $('.usersOnline').append(`<p>${username}</p>`);
  }
});

})
