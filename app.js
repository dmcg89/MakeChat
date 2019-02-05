const express = require('express');
const app = express();
//Socket.io connect to http server
const server =  require('http').Server(app);

//express view engine for handlbars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) =>{
    res.render('index.handlebars');
})

server.listen('3000', () => {
    console.log('server listening on Port 3000')
})
