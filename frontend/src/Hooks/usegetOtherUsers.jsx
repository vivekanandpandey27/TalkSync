import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";
const UseGetOtherUsers = () => {

  const dispatch = useDispatch();  
  
  const fetchUser = async () => {
    try {
      axios.defaults.withCredentials = true; 
      const otherUsers = await axios.get("http://localhost:8080/api/v1/user");
      console.log(otherUsers);
      dispatch(setOtherUsers(otherUsers.data));
    } catch (error) {
      console.log("Error While Fetching Other Users");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser(); 
  }, []); 


};

export default UseGetOtherUsers;
