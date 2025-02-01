import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import MessgeContainer from './MessgeContainer';
import SideBar from './SideBar';
const MobilePage = () => { 
  const dispatch = useDispatch();
  const {selectedUser} = useSelector(store=>store.user); 

  return (selectedUser !== null) ? (<MessgeContainer/>) : (<SideBar/>)
 
}

export default MobilePage