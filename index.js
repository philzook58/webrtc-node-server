
var express = require('express')
var app =  express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname,  'peerconnection.html'))
});

app.get('/receive', function(req, res){
	res.sendFile(path.join(__dirname,  'peerconnection_receive.html'))
});

app.use(express.static('node_modules'));

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on("icecandidate", function(candidate){
  		console.log("received candidate")
  //socket.broadcast.emit('offer', candidate);
  		io.sockets.emit('icecandidate', candidate);
	});

	socket.on('offer', function(offer){
		console.log('received offer');
  		//socket.broadcast.emit('offer', offer);
  		io.sockets.emit('offer', offer);
	});


	socket.on("answer", function(answer){
		console.log('received answe')
  			io.sockets.emit('answer', answer);
});
});









http.listen(3000, function(){
  console.log('listening on *:3000');
});


