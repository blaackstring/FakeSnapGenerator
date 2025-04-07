import { createSlice } from "@reduxjs/toolkit";

const UserDetails = createSlice({
    name: "userdetails",
    initialState: {}, // ✅ Keep initial state as an object
    reducers: {
        UserInfo: (state, action) => {
            console.log(action.payload);
            return { ...state, ...action.payload, loggedin: true }; // ✅ Properly updating state
        },
        UserLogOut: () => {
            return {}; // ✅ Resets state to an empty object
        }
    }
});

export const { UserInfo, UserLogOut } = UserDetails.actions;
export default UserDetails.reducer;
