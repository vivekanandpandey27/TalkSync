import React from 'react'
import MessageSender from './MessageSender'
import Messages from './Messages'
import useGetMessages from '../Hooks/useGetMessages'
import { useSelector } from 'react-redux'
const MessgeContainer = () => {
    const { selectedUser } = useSelector(store => store.user);
  useGetMessages();  
  return (
    <div className='md:min-w-[550px] flex flex-col relative'>
            <div className={ 'flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'}>
                <div className={'avatar online'}>
                    <div className='w-12 rounded-full'>
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

  )
}

export default MessgeContainer