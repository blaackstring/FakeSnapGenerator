import { configureStore } from "@reduxjs/toolkit";
import   Userinformation from './userdetails.js'
import chats from './chats.js'

const store = configureStore({
  reducer: {
    UserDetails:Userinformation,
    chatsInfo:chats
  },
});

export default store; 
