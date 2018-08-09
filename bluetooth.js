var WebSocketServer = require('websocket').server;
var http = require('http');
var port = process.env.PORT

var bluetoothConnections=[]

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



  connection.on('message', function(message) {
    console.log('message received!')
    var data=JSON.parse(message.utf8Data)
    console.log(data)

    var obj={
      tagId:data.uuid,
      count:0
    }
    if(bluetoothConnections.indexOf(obj.tagId)===-1){
      console.log("child is not on the bus")
    } else {
      console.log("child is on the bus")
    }
  })
  });

//   connection.on('close', function(connection) {
//     // close user connection
//   });
// // });
