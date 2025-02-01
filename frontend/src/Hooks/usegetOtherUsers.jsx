import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

const UseGetOtherUsers = () => {

  const dispatch = useDispatch();  
  const backend_url = process.env.REACT_APP_BACKEND_BASE_URL;
  const fetchUser = async () => {
    try {
      axios.defaults.withCredentials = true; 
      console.log(backend_url);
      console.log(`${backend_url}/api/v1/user`);
      const otherUsers = await axios.get(`${backend_url}/api/v1/user`);
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
