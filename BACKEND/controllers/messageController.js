const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const {getReceiverSocketId} = require("../socket/socket");
const {io } = require("../socket/socket.js");


exports.sendMessage= async (req,res)=>{
    try{
       const senderID= req.ID;
       const receiverID=req.params.id;
       const {message}=req.body;
       
       let Participants = await Conversation.findOne({
        participants:{$all:[senderID,receiverID]}
       })

       if(!Participants){
        Participants=await Conversation.create({
            participants:[senderID,receiverID]
             })
       }
       const newmessage=await Message.create({
           senderID,
           receiverID,
           message
       });

       if(newmessage){
        Participants.messages.push(newmessage._id)
       }

       await Promise.all([Participants.save(), newmessage.save()]);
       //await Participants.save();
       //console.log("getReceiverSocketId:", getReceiverSocketId);

       // SOCKET IO
       const receiverSocketId = getReceiverSocketId(receiverID);
       if(receiverSocketId){
           io.to(receiverSocketId).emit("newMessage", newmessage);
       }

       return res.status(201).json({
        newMessage:newmessage,
       })

       // socket.io
    }
    catch(err){
        console.log(err);
    }
}

exports.getMessage = async (req,res) => {
    try {
        const receiverID = req.params.id;
        const senderID = req.ID;
        console.log(receiverID,senderID);
        const conversations = await Conversation.findOne({
            participants:{$all : [senderID, receiverID]}
        }).populate("messages"); 
        
        return res.status(200).json(conversations?.messages);

    } catch (error) {
        console.log(error);
    }
}