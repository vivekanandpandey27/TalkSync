import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {
        authUser : null,
        otherUsers : null,
        selectedUser : null,
        onlineUsers:null,
    },
    reducers : {
        setAuthUser : (state,action) =>{
        console.log("Dispatching setAuthUser with payload:", action.payload); 
        state.authUser = action.payload
        console.log("Updated state.authUser:", state.authUser);
        },
        setOtherUsers : (state,action) => {
            state.otherUsers = action.payload
        },
        setSelectedUser : (state,action) => {
            state.selectedUser = action.payload
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers = action.payload;
        },
    }
});

export const{setAuthUser,setOtherUsers,setSelectedUser,setOnlineUsers} = userSlice.actions;
export default userSlice.reducer; 