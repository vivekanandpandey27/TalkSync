import {Route,Routes} from 'react-router-dom'
import {HomePage } from './components/HomePage';
import { Signup } from './components/Signup';
import { LoginPage } from './components/LoginPage';
import { useSelector,useDispatch } from 'react-redux';
import { useState,useEffect } from 'react';
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';
import io from "socket.io-client"

function App() {
  const dispatch = useDispatch();
  const {authUser} =useSelector(store=>store.user);
  const {socket} = useSelector(store=>store.socket);
  const backend_url = process.env.REACT_APP_BACKEND_BASE_URL;
  useEffect(()=>{
     if(authUser){
       const socket=io(`${backend_url}`,{
        query:{
          userId:authUser.id
        }
    });
    //console.log("Auth User ID befire WS : FRONTEND : ", authUser.id);
       
       dispatch(setSocket(socket));
       
       socket?.on('getOnlineUsers', (onlineUsers)=>{
        console.log("Onlien Users : ",onlineUsers);
        dispatch(setOnlineUsers(onlineUsers))
      });

      return () => socket?.close();
     } else {
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
     }

  },[authUser]);


  return (
    <div className='h-screen flex flex-col justify-center items-center '>
       <Routes>
           <Route path = "/" element = {authUser ?  (<HomePage/>) : (<LoginPage/>)}/>
           <Route path = "/login" element = {<LoginPage/>}/>
           <Route path = "/signup" element = {<Signup/>}/>
       </Routes>
      

    </div>
  );
}

export default App;
