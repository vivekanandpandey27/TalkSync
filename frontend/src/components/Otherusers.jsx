import React from 'react'

const Otherusers = ({user}) => {
  return (
    <>
            <div className={ 'flex gap-2 hover:text-black items-center hover:bg-zinc-200 rounded p-2 cursor-pointer'}>
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