var WebSocketServer = require('websocket').server;
var http = require('http');
var port = process.env.PORT

var server = http.createServer(function(request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});
server.listen(port, function() { });

// create the server
wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
  console.log('connection requested')

  var connection = request.accept(null, request.origin);

    var obj = {
             text: "message from server",
           };
    var json = JSON.stringify({ type:'message', data: obj });
  connection.sendUTF(json)

  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function(message) {
    console.log('message received!')


  });

  connection.on('close', function(connection) {
    // close user connection
  });
});
