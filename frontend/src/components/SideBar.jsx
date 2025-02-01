import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import MultiUser from './MultiUser';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
const SideBar = () => {
    const dispatch=useDispatch();
    const {otherUsers}=useSelector(store=>store.user)
    const navigate = useNavigate();
    const [search,setsearch]=useState("")
    const REACT_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
    const logoutHandler = async()=>{
        try{
            axios.defaults.withCredentials = true;
            const res = axios.get(`${REACT_BASE_URL}/api/v1/user/logout`);
            console.log(res);
            navigate("/login");
            toast.success("LogOut Successfully !");
            dispatch(setAuthUser(null));
            dispatch(setOtherUsers(null));
            dispatch(setMessages(null));
        } catch(error) {
            console.log("LogOut Unsuccesfull !");
            console.log(error);

        }
           
    }
    const searchEngine= async(e)=>{
        e.preventDefault();
        const taregtuser=otherUsers?.find((user)=> user.fullName.toLowerCase().includes(search.toLowerCase()));
        if(taregtuser){
            dispatch(setOtherUsers([taregtuser]));
        }else{
            toast.error("User not found!");
        }
    }
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col min-w-[400px]'>
            <form onSubmit={searchEngine} action="" className='flex items-center gap-2'>
                <input
                    value={search}
                    onChange={(e)=>{setsearch(e.target.value)}}

                    className='input input-bordered rounded-md' type="text"
                    placeholder='Search...'
                />
                <button type='submit' className='btn bg-zinc-700 text-white'>
                    <BiSearchAlt2 className='w-6 h-6 outline-none'/>
                </button>
            </form>
            <div className="divider px-3"></div> 
            <MultiUser/>
            <div className='mt-2'>
                <button  className='btn btn-sm' onClick={logoutHandler}>Logout</button>
            </div>
        </div>
    )
}

export default SideBar