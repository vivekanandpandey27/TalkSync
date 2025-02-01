import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
function useGetMessages() {
  const { selectedUser} = useSelector(store=> store.user);
  const dispatch = useDispatch();
  const backend_url = process.env.REACT_APP_BACKEND_BASE_URL;
  const getMessages = async () => {
    try {
      console.log(selectedUser);
      axios.defaults.withCredentials = true;
      const allMessages = await axios.get(
        `${backend_url}/api/v1/message/${selectedUser?._id}`
      );
      dispatch(setMessages(allMessages.data));
      console.log(allMessages.data)
    } catch (error) {
      console.log("Error While Fetching Messages ");
      console.log(error);
    }
  };

  useEffect(()=>{getMessages();},[selectedUser]);
}

export default useGetMessages;
