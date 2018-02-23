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


  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function(message) {
    console.log('message received!')
    console.log(message)

        var obj = {
                 text: "nice to meet u, this is the server",
               };
        var json = JSON.stringify({ type:'message', data: obj });

        connection.sendUTF(json)
  });

  connection.on('close', function(connection) {
    // close user connection
  });
});
