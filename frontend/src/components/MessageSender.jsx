import React from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { useState } from "react";
import {useDispatch,useSelector} from "react-redux";
import { setMessages } from "../redux/messageSlice";
import axios from "axios";

function MessageSender() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const {selectedUser} = useSelector(store=>store.user);
  const {messages} = useSelector(store=>store.message);
  const REACT_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${REACT_BASE_URL}/api/v1/message/send/${selectedUser?._id}`,
                  { message },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                    withCredentials: true,
                  }
      );
      console.log(res);
      dispatch(setMessages([...messages, res?.data?.newMessage]));
    } catch (error) {
      console.log(error);
    }
    setMessage("");
  };

  return (
    <div className="border-slate-500 p-3 flex flex-row w-full relative bg-zinc-900 fixed w-full z-50">
      <form onSubmit={onSubmitHandler} className="flex items-center w-full">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className=" input input-bordered rounded-md w-full"
          type="text"
          placeholder="Type Your Message......"
        />
        <RiSendPlane2Fill
          type="submit"
          className="absolute right-7  scale-120"
        />
      </form>
    </div>
  );
}

export default MessageSender;
