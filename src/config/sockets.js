const socket = function(socketServer) {
    let io = require('socket.io')(socketServer, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
          }
    });
    io.sockets.on('connection', function(socket) {
        console.log('New socket connection received', socket.id);
        socket.on('disconnect', function() {
            console.log('Socket disconnected ', socket.id);
        })


        socket.on('join_room', function(data) {// Here  we are sending  the req for joining room
            console.log('Joining req received...', data);
            socket.join(data.chatroom);// Request
            io.in(data.chatroom).emit('user_joined', data);// Here joining the room
        });
        
        socket.on('send_message', function(data) {// Here we are sending the data in the room
            io.in(data.chatroom).emit('new_message', data);
        });



    });

   

} 

module.exports = {socket};