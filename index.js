var WebSocketServer = require('websocket').server;
var http = require('http');
var port = process.env.PORT

var connections=[]
var location={
  latitude:null,
  longitude:null
}

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
  connections.push(connection)

  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function(message) {
    console.log('message received!')
    var d=JSON.parse(message.utf8Data)
    if(d.latitude!==location.latitude||d.longitude!==location.longitude) {
      console.log('location change')
      console.log("new location",d)
      console.log("current location array",location)
      location={
        latitude:d.latitude,
        longitude:d.longitude
      }
      console.log("updates location array",location)


        var obj = {
                 text: message,
               };
        var json = JSON.stringify({ type:'message', data: obj });

        connections.forEach((connect)=>{
            connect.sendUTF(json)
        })
    }
  });

  connection.on('close', function(connection) {
    // close user connection
  });
});
