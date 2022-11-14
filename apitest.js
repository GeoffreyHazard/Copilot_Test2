//Express server on port 3000
var express = require('express');
var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var db = mongoose.connection;
var dbURI = 'mongodb://localhost:27017/test';
mongoose.connect(dbURI);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to database');
}
);
var userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    date: { type: Date, default: Date.now }
});
var User = mongoose.model('User', userSchema);
var user = new User({
    username: 'test',
    password: 'test',
    email: 'test'
});
user.save(function(err, user) {
    if (err) return console.error(err);
    console.log(user.username + ' saved to users collection.');
});
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
}
);
app.post('/upload', upload.single('file'), function(req, res, next) {
    console.log(req.file);
    res.send(req.file);
}
);
app.get('/users', function(req, res) {
    User.find(function(err, users) {
        if (err) return console.error(err);
        res.send(users);
    }
    );
}
);
app.post('/users', function(req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });
    user.save(function(err, user) {
        if (err) return console.error(err);
        res.send(user);
    }
    );
}
);
app.get('/users/:id', function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) return console.error(err);
        res.send(user);
    }
    );
}
);
app.put('/users/:id', function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
        if (err) return console.error(err);
        res.send(user);
    }
    );
}
);
app.delete('/users/:id', function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if (err) return console.error(err);
        res.send(user);
    }
    );
}
);
io.sockets.on('connection', function(socket) {
    console.log('New client: ' + socket.id);
    socket.on('mouse', mouseMsg);
    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data);
        console.log(data);
    }
}
);

// Return the current date and time
// in the format: yyyy-mm-dd hh:mm:ss
function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
}