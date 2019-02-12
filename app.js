const express = require('express');

const app = express();
//  Socket.io connect to http server
const server = require('http').Server(app);

//  Socket.io
const io = require('socket.io')(server);

const onlineUsers = {};
// save the channels in this object
let channels = {'General' : []}

io.on('connection', (socket) => {
  console.log('🔌 New user connected! 🔌');
  require('./sockets/chat.js')(io, socket, onlineUsers, channels);
});

//  express view engine for handlbars
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//  establish public folder
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.render('index.handlebars');
});

server.listen('3000', () => {
  console.log('server listening on Port 3000');
});
