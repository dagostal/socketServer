var WebSocketServer = require('websocket').server;
var http = require('http');
var port = process.env.PORT

var connections=[]

var location1={
  latitude:null,
  longitude:null
}

var location2={
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
    var messageData=JSON.parse(message.utf8Data)
    console.log(messageData)
    if(messageData.type==="parent"){
      console.log('parent connected',d)
      return;
    }
    else {
      location1=messageData.location1
      location2=messageData.location2

    if(messageData.location1!==location1||messageData.location2!==location2) {

      locationDataToParent={
        location1:location1,
        location2location2
      }

        var obj = {
                 text: message,
               };
        var json = JSON.stringify({ type:'message', data: locationDataToParent });

        connections.forEach((connect)=>{
            connect.sendUTF(json)
        })
    }
  }
  });

  connection.on('close', function(connection) {
    // close user connection
  });
});
