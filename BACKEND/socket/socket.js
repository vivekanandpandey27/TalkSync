const http = require("http");
const { Server } = require("socket.io");
const express=require('express')
const app=express();
const server=http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:['http://localhost:3000'],
        methods:['GET', 'POST'],
    },
    
});


const getReceiverSocketId = (receiverId) => {
    return userSocketmap[receiverId];
}

const userSocketmap = {}; //for userID--->SocketID mapping

io.on('connection', (socket)=>{

    console.log("user connected",socket.id);

    const userId = socket.handshake.query.userId;
    console.log("WS user id : ",userId);
    if(userId !== undefined)
    {
        userSocketmap[userId] = socket.id;
    }
    
    io.emit("getOnlineUsers",Object.keys(userSocketmap));

    socket.on("disconnect",()=>{
        delete userSocketmap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketmap));
    })
    
    } )
   
 module.exports = { app, io ,server, getReceiverSocketId};
