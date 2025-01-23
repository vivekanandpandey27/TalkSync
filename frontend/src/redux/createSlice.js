import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
      autherisedUser: null,
    },
    reducers: {
        setUser:(state,action)=>{
            state.autherisedUser=action.payload;
        }
    }
  })

  export const {setUser}=userSlice.actions;
  export default  userSlice.reducer;