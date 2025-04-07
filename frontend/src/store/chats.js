    import { createSlice } from "@reduxjs/toolkit";


    const Chats=createSlice({
        name:"chats",
        initialState:{
            image:{}
        },
        reducers:{
            chatsInfo:(state,action)=>{
                return {...state ,image:action.payload.image,...action.payload}
            }
        }
    })


    export const  {chatsInfo}=Chats.actions

    export default Chats.reducer