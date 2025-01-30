import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
const Message = ({message}) => {
  const scroll =useRef();
  const {authUser,selectedUser} = useSelector(store=>store.user);
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior:"smooth"});
   
},[message]);
 
  function print(){
    console.log("Auth User from Redux:", authUser);
    console.log("Auth User from Redux:", authUser);
   

    console.log("selected User from Redux:", selectedUser);
    console.log('Message:', message);
    console.log('Sender ID:', message?.senderID);
   console.log('Auth User ID:', authUser?.userId);
   console.log('Is Auth User:', message?.senderID === authUser?.id);

  }
  print();
  
  return (
    <div ref={scroll} className={`chat ${message?.senderID === authUser?.id ? 'chat-end' : 'chat-start'}`}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        
        src= {message?.senderID === authUser?.id ? authUser?.profilePhoto:selectedUser?.profilePhoto } alt="Tailwind CSS chat bubble component"/>
    </div>
  </div>
  <div className="chat-header">
    <time className="text-xs opacity-50">12:45</time>
  </div>
  <div className="chat-bubble">{message?.message}</div>

</div>
  )
}

export default Message