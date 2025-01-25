import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
function useGetMessages() {
  const { authUser } = useSelector((store) => store.user);
  console.log("AUTH USER IS : ", authUser);

  const getMessages = async () => {
    try {
      axios.defaults.withCredentials = true;
      const allMessages = await axios.get(
        `http://localhost:8080/api/v1/message/678c00757648560e323c727e`
      );
      console.log(allMessages.data);
    } catch (error) {
      console.log("Error While Fetching Messages ");
      console.log(error);
    }
  };

  useEffect(()=>{getMessages();},[]);
}

export default useGetMessages;
