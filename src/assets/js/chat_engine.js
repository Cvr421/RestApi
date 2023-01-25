console.log("Chat engine On!!");

class ChatEngine {
    constructor(chatBox, userEmail) {
        this.chatBox = $(`#${chatBox}`);
        this.userEmail = userEmail;
        this.socket = io.connect('http://localhost:3001');
        if(this.userEmail) {
            this.connectionHandler();
        }
    }

    connectionHandler() {
        let self = this;

        this.socket.on('connect', function() {
            console.log('connection established with backend');

          
            self.socket.emit('join_room', {// we are creating the room for all the user in one room
                userEmail: self.userEmail,// setting up  email for user singed in
                chatroom: 'twitter' // name of the chat room
             
            });
            self.socket.on('user_joined', function(data) {// sending the message on the frontend tha new user has joined
                console.log('New user in the house', data);
            });


            self.socket.on('new_message', function(data) {
                console.log('Message data', data);
                let newMessage = $('<li>');// Here we are storing the new message in li tags
                let messageType = "others-message";// Here is other message
                if(data.userEmail == self.userEmail) {// Here we are checking tha if the message user id is equal to user login id then it's own massage
                    let messageType = "own-message";    
                }
                let span = $('<span>').text(data.userEmail);// Here are pringting the useremail in span tag
                let p = $('<p>').text(data.message);// Here are storing the message data in paragrapha tag
                newMessage.append(span);// Here we are storing the span tag message to newMessge list
                newMessage.append(p);//storing the message of user 
                newMessage.addClass(messageType);// Here we are adding the class messageType of frontend
                $('#message-list').append(newMessage);// Here its a  kind of loop that we are keep adding the messages and email into the message list class
            });


            $('#send-message').click(function() {// Here we are triggering the event of button id to send the message
                let message = $('#message-input').val();// Here we are getting input message from user 
                if(message != '') {// if the  value is not empty then 
                    self.socket.emit('send_message', {// emit the the socket button id 
                        message: message,// with message 
                        userEmail: self.userEmail,// with user email
                        chatroom: 'twitter'// and in which room
                    });
                }
                $('#message-input').val('');
            })
        });
    }
}



