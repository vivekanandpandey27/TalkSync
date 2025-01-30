import {Route,Routes} from 'react-router-dom'
import {HomePage } from './components/HomePage';
import { Signup } from './components/Signup';
import { LoginPage } from './components/LoginPage';
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import io from "socket.io-client"
function App() {
  const {authUser} =useSelector(store=>store.user);
  const [socket,setSocket]=useState(null);
  useEffect(()=>{
     if(authUser){
       const socket=io('http://localhost:8080',{
        transports: ['websocket','polling']
       });
       setSocket(socket);
     }
  },[authUser]);


  return (
    <div className='h-screen flex flex-col justify-center items-center '>
       <Routes>
           <Route path = "/" element = {<HomePage/>}/>
           <Route path = "/login" element = {<LoginPage/>}/>
           <Route path = "/signup" element = {<Signup/>}/>
       </Routes>
      

    </div>
  );
}

export default App;
