import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import playerReducer from "./slices/allmatch.slice";
import individualMatchReducer from "./slices/individual-match.slice";
import matchReducer from "./slices/match.slice";
import redirectSlice from "./slices/redirect.slice";
import userReducer from "./slices/user.slice";
import usersReducer from "./slices/users.slice";
import walletReducer from "./slices/wallet.slice";
import teamMatchReducer from "./slices/team-match.slice"
import teamMatchDataReducer from "./slices/teamMatchData.slice"
export const store = configureStore({
  reducer: {
    user: userReducer,
    wallet: walletReducer,
    redirect: redirectSlice,
    userdata:usersReducer,
    matchdata:matchReducer,
    playerInfo: playerReducer,
    individualMatch: individualMatchReducer,
    teamMatch:teamMatchReducer,
    teamMatchDataReducer:teamMatchDataReducer
  },
});

type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
