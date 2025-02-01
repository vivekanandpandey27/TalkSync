import React, { useEffect } from 'react'
import MessageSender from './MessageSender'
import Messages from './Messages'
import useGetMessages from '../Hooks/useGetMessages'
import { useSelector,useDispatch } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice'
import SideBar from './SideBar'
import { useNavigate } from 'react-router-dom'

const MessgeContainer = () => {

    const navigate = useNavigate();
    const { authUser,selectedUser } = useSelector(store => store.user);
    const dispatch=useDispatch();
    const {onlineUsers} = useSelector(store => store.user);  
    const isOnline = onlineUsers?.includes(selectedUser._id);

  const ClickHandler = ()=>{
    dispatch(setSelectedUser(null));
    navigate("/");
  } 
  useGetMessages();  
  return (
      <>
       {/* <SideBar /> */}
       {/*  */}
       {selectedUser!==null?(
        <div className=' flex min-w-[400px] h-[830px] sm:min-w-[600px] md:min-w-[700px] flex-col relative'>
            
            <div className={ 'flex gap-2  items-center bg-black text-white px-4 py-2 mb-2 fixed w-full z-50'}>
            {/* bg-zinc-800 */}
                <button className="text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={ClickHandler}
                  className="h-7 w-7 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path  
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                </button>

                <div className={''}>
                    <div className={`w-12 rounded-full avatar ${isOnline ?  'online' : 'offline'}` }>
                        <img src={selectedUser?.profilePhoto} alt="user-profile" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between gap-2 '>
                        <p>{selectedUser?.fullName}</p>
                    </div>
                </div>
            </div>

            <Messages />
            <div className='absolute bottom-1 w-full'>
              <MessageSender/>
            </div>
            
                 
        </div>
        ):(
            <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
            <h1 className='text-4xl text-white font-bold'>Hi,{authUser?.userName} </h1>
            <h1 className='text-2xl text-white'>Let's start conversation</h1>

        </div>
        )}
      </>

    

  )
}

export default MessgeContainer