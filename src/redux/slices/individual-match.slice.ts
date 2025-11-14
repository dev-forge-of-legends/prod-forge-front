import { getStorageValue, setStorageValue } from "@app-utils/storageUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IndividualMatchState {
  matchId: string;
}

const matchId = getStorageValue("matchId");

const initialState: IndividualMatchState = {
  matchId: matchId || "",
};

export const individualMatchSlice = createSlice({
  name: "individualMatch",
  initialState,
  reducers: {
    setMatchId: (state, action: PayloadAction<string>) => {
      state.matchId = action.payload;
      setStorageValue("matchId", action.payload);
    },
  },
});

export const { setMatchId } = individualMatchSlice.actions;
export default individualMatchSlice.reducer;
