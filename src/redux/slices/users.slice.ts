import { getStorageValue } from "@app-utils/storageUtils";
import { createSlice } from "@reduxjs/toolkit";
// import { setStorageValue } from "@app-utils";
export interface UserDataState {
    email:string;
    userName:string;
    level:string;
    wins:number;
    loses:number;
    role:string;
    avatar:string;
}

interface UserDataStateType {
    user_profile: UserDataState[];
}

const initialState: UserDataStateType = {
    user_profile: []
}

export const userSlice = createSlice({
    name: "user_data",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            // state.user_profile = action.payload;
            state.user_profile = action.payload;
        },
        getUseData: () => {
            return getStorageValue("user_info");
        }
    }
})

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;