import React, { useEffect } from 'react'
import MessageSender from './MessageSender'
import Messages from './Messages'
import useGetMessages from '../Hooks/useGetMessages'
import { useSelector,useDispatch } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice'
import SideBar from './SideBar'
const DesktopPage = () => {

    const { authUser,selectedUser } = useSelector(store => store.user);
    const dispatch=useDispatch();
    const {onlineUsers} = useSelector(store => store.user);  
    const isOnline = onlineUsers?.includes(selectedUser?._id);

   
  useGetMessages();  
  return (
      <>
       <SideBar />
       {selectedUser!==null?(<div className='md:min-w-[550px] flex flex-col relative'>
            <div className={ 'flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'}>
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
                
         
        </div>):(
            <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
            <h1 className='text-4xl text-white font-bold'>Hi,{authUser?.userName} </h1>
            <h1 className='text-2xl text-white'>Let's start conversation</h1>

        </div>
        )}
      </>

    

  )
}

export default DesktopPage