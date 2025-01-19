const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");


exports.sendMessage= async (req,res)=>{
    try{
       const senderID= req.ID;
       const receiverID=req.params.id;
       const {message}=req.body;
       let Participants=await Conversation.findOne({
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
       Participants.save();
       return res.status(201).json({
        message:"message send successfully"
       })

       // socket.io
    }
    catch(err){
        console.log(err);
    }
}