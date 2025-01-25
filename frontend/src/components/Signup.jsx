import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
export const Signup = () => {

 const [FormData,SetformData] = useState({fullName : "",userName : "",password : "",confirmPassword : "",gender:"Male" });
 const navigate=useNavigate();
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

   async function onSubmitHandler(event)
  {
    
    event.preventDefault();
    const normalizedGender = FormData.gender.toLowerCase();
    const formDataToSend = {
      ...FormData,
      gender: normalizedGender,
    };
     try{
      const res= await axios.post("http://localhost:8080/api/v1/user/register",formDataToSend,{
      headers:{
        'Content-Type':'application/json'
      },
      withCredentials:true
    });
    if(res.data.success){
      navigate('/login');
      toast.success(res.data.message);
      SetformData({fullName : "",userName : "",password : "",confirmPassword : "",gender:"" });
    }
  }
  catch(error){
    toast.error(error.response.data.message);
    console.log(error);
  }
   
  }
  
  
  return (
    <div className = 'flex-col justify-center items-center'>
        <div className='text-center text-orange-600 text-2xl mt-2 mb-3 font-bold'>SignUp</div>

        <form className='flex flex-col relative min-w-[23rem] bg-white/20 rounded-lg backdrop-blur-sm border border-white/5 p-8 shadow-sm shadow-orange-600'>

            <label htmlFor= "fullName" className='block text-white text-sm mt-1 font-bold'>
                Full Name 
            </label>
            <input id = "fullName" name = "fullName" type ="text" 
            onChange={changeHandler}
            value = {FormData.fullName}
            placeholder="Enter Full Name" className='w-full h-12 bg-white/10 rounded-md mt-2 px-4 text-white text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-600'/>

            <label htmlFor= "userName" className='block  text-white text-sm mt-3 font-bold'>
                UserName
            </label>
            <input id = "userName" name = "userName" type ="text" 
             onChange={changeHandler}
             value = {FormData.userName}
            placeholder="Enter UserName" className='w-full h-12 bg-white/10 rounded-md mt-2 px-4 text-white text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-600'/>


            <label htmlFor= "password" className='block text-white text-sm mt-3 font-bold'>
                Password
            </label>
            <input id = "password" name = "password" 
             onChange={changeHandler}
             value = {FormData.password}
            type = "password" placeholder="Enter Password" className='w-full h-12 bg-white/10 rounded-md mt-2 px-4 text-white text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-600'/>


            <label htmlFor= "confirmPassword" className='block text-white text-sm mt-3 font-bold'>
                Confirm Password 
            </label>
            <input id = "confirmPassword" name = "confirmPassword" type = "password" 
             onChange={changeHandler}
             value = {FormData.confirmPassword}
            placeholder="Enter ConfirmPassword" className='w-full h-12 bg-white/10 rounded-md mt-2 px-4 text-white text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-600'/>
        
            <label htmlFor="gender" className="block text-white text-sm  mt-3 font-bold" >
                Gender
            </label>
        
            <select
              name = "gender"
              id = "gender"
              className="bg-white/10 mt-2 rounded-md p-1"
              onChange={changeHandler}
              value = {FormData.gender}
            >
          
            <option value = "Male" className="bg-white/10">Male</option>
            <option value = "Female" className="bg-white/10">Female</option>

            </select>

            <Link to= "/login" className='mt-4 text-center underline text-white/40'> Already Have a Account ?</Link>

            <button onClick ={onSubmitHandler} type="submit" className="mt-3 w-36 mx-auto bg-gray-400 text-[#080710] py-[0.3rem] rounded-md text-lg font-semibold hover:bg-orange-600 transition-all duration-200">
               SignUp
            </button>
            
        </form>

    </div>
  )
}
