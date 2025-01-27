import React from 'react'
import Otherusers from './Otherusers'
import UsegetOtherUsers from '../Hooks/usegetOtherUsers'
import { useSelector } from 'react-redux'
const MultiUser = () => {
  UsegetOtherUsers();
  const {otherUsers} = useSelector(store=>store.user);
  if (!otherUsers) return; 
  // console.log(otherUsers);

  
  return (
    <div className='overflow-auto flex-1'>
    {
        otherUsers?.map((user)=>(<Otherusers key={user._id} user={user}/>))
    }
    
</div>
  )
}

export default MultiUser