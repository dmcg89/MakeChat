const express = require('express');
const app = express();
//Socket.io connect to http server
const server =  require('http').Server(app);

//Socket.io
const io = require('socket.io')(server);
io.on("connection", (socket) => {
  console.log("New user connected!");
})

//express view engine for handlbars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//establish public folder
app.use('/public', express.static('public'));

app.get('/', (req, res) =>{
    res.render('index.handlebars');
})

server.listen('3000', () => {
    console.log('server listening on Port 3000')
})
