import React from 'react'
import SideBar from './SideBar'
import MessgeContainer from './MessgeContainer'
import Message_Home from './Message_Home'

export const HomePage = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      {/* <SideBar /> */}
      {/* < MessgeContainer /> */}
      <Message_Home/>
    </div>
  )
  
}
