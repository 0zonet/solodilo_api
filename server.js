const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./lib/config/config')


mongoose.connect(config.database);

//Routes
const post = require('./routes/post');
const user = require('./routes/user');
const auth = require('./routes/auth');

//port
const port = 3000;

var app = express();

//View Engine
//app.set('views',path.join(__dirname,'views'));
//app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);

// Set static folder
//app.use(express.static(path.join(__dirname,'client')));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.use('/post', post);
app.use('/user',user);
app.use('/auth',auth)

app.listen(port, function(){
    console.log('Server started on port '+port);
});