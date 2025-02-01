import React from 'react'
import Message from './Message'
import useGetMessages from '../Hooks/useGetMessages'
import { useSelector } from 'react-redux'
import useGetRealTimeMessage from '../Hooks/getRTM'
const Messages = () => {
  useGetMessages();
  useGetRealTimeMessage();
  const { messages } = useSelector(store => store.message);

if(!messages) return;

  return (
       
    
      <div className='px-4 flex-1  overflow-auto mb-24'>
          {
             messages && messages?.map((message) => {
                  return (
                      <Message key={message._id} message={message} />
                  )
              })
          }

      </div>


  )
}
export default Messages