import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice'

const Otherusers = ({user}) => {

  const { selectedUser } = useSelector(store => store.user);

  const dispatch = useDispatch();

  const clickHandler = (user) => {
        dispatch(setSelectedUser(user));
  }  
  return (
    <>
            <div onClick={()=>{clickHandler(user)}} className={ `flex gap-2 hover:text-black ${(selectedUser?._id === user?._id) ? ('bg-zinc-200 text-black font-bold') : ('text-white')} items-center hover:bg-zinc-200 rounded p-2 cursor-pointer`}>
                <div className={'avatar online'}>
                    <div className='w-12 rounded-full'>
                        <img src = {user?.profilePhoto} alt="user-profile" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between gap-2 '>
                        <p>{user.fullName}</p>
                    </div>
                </div>
            </div>
            <div className='divider my-0 py-0 h-1'></div>
        </>
  )
}

export default Otherusers