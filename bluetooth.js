var WebSocketServer = require('websocket').server;
var http = require('http');
var port = process.env.PORT

var bluetoothConnections=[]


var server = http.createServer(function(request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});
server.listen(port, function() { console.log("socket server is on listneing on port..",port)});

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


    var existingConnection = bluetoothConnections.find(function(connection) {
      return connection.tagId === obj.tagId;
    });

    if(existingConnection){ //if this connection already exists...
      console.log("connection exists!")
      connection.count=0;
      return;
    } else {   //if there is no exisitng connection...
      console.log("connection does not exist!")
      bluetoothConnections.push(obj)
      //send alert to child-on-bus route
    }
  })
});

  connection.on('close', function(connection) {
    // close user connection
    console.log("socket server was closed...")
  });

var incrementConnections=function(){
  bluetoothConnections.forEach((connection,i)=>{
    connection.count++
    if(connection.count>21){
      bluetoothConnections.splice(i,1)
      //we have not scaned the child in 40 seconds...he must be off the bus...
      //remove from connectionList and alert off-bus route
    }
  })
}







//
