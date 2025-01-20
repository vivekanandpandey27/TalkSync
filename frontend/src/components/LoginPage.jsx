import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
export const LoginPage = () => {
  const [FormData,SetformData] = useState({UserName : "",Password : ""});
    function changeHandler(event)
    {
        const {name,type,value,isChecked} = event.target;
  
        SetformData(prevFormData=>{
          return {
            ...prevFormData,
            [name] : (type==="checkbox") ? isChecked : value,
          }
        })
    }  
    function onSubmitHandler(event)
    {
      console.log("Login Details : ",FormData);
      event.preventDefault();
      
      SetformData({UserName : "",Password : ""});
    }

  return (
    <div className = 'flex-col justify-center items-center'>
        <div className='text-center text-orange-600 text-2xl mt-2 mb-3 font-bold'>Login</div>

        <form className='flex flex-col relative min-w-[23rem] bg-white/20 rounded-lg backdrop-blur-sm border border-white/5 p-8 shadow-sm shadow-orange-600'>

            <label htmlFor= "UserName" className='block  text-white text-sm mt-3 font-bold'>
                UserName
            </label>
            <input id = "UserName" name = "UserName" type ="text"
            onChange={changeHandler}
            value = {FormData.UserName}
            placeholder="Enter UserName" className='w-full h-12 bg-white/10 rounded-md mt-2 px-4 text-white text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-600'/>


            <label htmlFor= "Password" className='block text-white text-sm mt-3 font-bold'>
                Password
            </label>
            <input id = "Password" name = "Password" type = "password"
            onChange={changeHandler}
            value = {FormData.Password}
            placeholder="Enter Password" className='w-full h-12 bg-white/10 rounded-md mt-2 px-4 text-white text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-600'/>

            <Link to= "/signup" className='mt-4 text-center underline text-white/40'> Don't Have a Account ?</Link>

            <button onClick ={onSubmitHandler} type="submit" className="mt-3 w-36 mx-auto bg-gray-400 text-[#080710] py-[0.3rem] rounded-md text-lg font-semibold hover:bg-orange-600 transition-all duration-200">
               Login
            </button>
            
        </form>

    </div>
  )
}
