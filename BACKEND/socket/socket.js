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
    transports: ['websocket','polling'], // Force WebSockets
});


io.on('connection', (socket)=>{
    console.log("user connected",socket.id);
    
    } )
   
 module.exports = { app, io ,server};
