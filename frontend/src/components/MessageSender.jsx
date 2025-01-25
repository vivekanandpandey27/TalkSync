import React from "react";
import { RiSendPlane2Fill } from "react-icons/ri";

function MessageSender() {
  return (
    <div className="border-slate-500 p-4 flex flex-row w-full relative bg-zinc-900">
      <form action="" className="flex items-center w-full">
        <input
          className=" input input-bordered rounded-md w-full"
          type="text"
          placeholder="Type Your Message......"
        />
      </form>
      <RiSendPlane2Fill className="absolute right-6 mt-4 scale-120"/>
    </div>
  );
}

export default MessageSender;
