import React from 'react'
import MessageSender from './MessageSender'
import Messages from './Messages'
import useGetMessages from '../Hooks/useGetMessages'

const MessgeContainer = () => {

  useGetMessages();  
  return (
    <div className='md:min-w-[550px] flex flex-col relative'>
            <div className={ 'flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'}>
                <div className={'avatar online'}>
                    <div className='w-12 rounded-full'>
                        <img src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg" alt="user-profile" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between gap-2 '>
                        <p>ajay</p>
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