import { getStorageValue, setStorageValue } from "@app-utils/storageUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TeamMatchState {
  teamMatchId: string;
}

const matchId = getStorageValue("teamMatchId");

const initialState: TeamMatchState = {
  teamMatchId: matchId || "",
};

export const TeamMatchSlice = createSlice({
  name: "teamMatchId",
  initialState,
  reducers: {

    setTeamMatchId: (state, action: PayloadAction<string>) => {
      state.teamMatchId = action.payload;
      setStorageValue("teamMatchId", action.payload);
    },
  },
});

export const { setTeamMatchId } = TeamMatchSlice.actions;
export default TeamMatchSlice.reducer;
