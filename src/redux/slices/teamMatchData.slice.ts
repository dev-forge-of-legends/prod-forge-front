import { getStorageValue, setStorageValue } from "@app-utils/storageUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TeamMatchState {
  matchId: string,
  timeLimit:string,
  matchName:string,
  createrId:string,
  betConis:number,
  matchTeams:Array<MatchTeamsType>
}

interface MatchTeamsType {
  teamId: string,
  status:string,
  invited:string,
  color:string,
  nowMoving:boolean,
  members:Array<object>
}


const matchId = getStorageValue("matchId");

const initialState: TeamMatchState = {
  matchId: matchId || "",
  timeLimit:"",
  matchName:"",
  createrId:"",
  betConis:0,
  matchTeams:[],
};

export const TeamMatchSlice = createSlice({
  name: "TeamMatch",
  initialState,
  reducers: {
    setMatchId: (state, action: PayloadAction<string>) => {
      state.matchId = action.payload;
      setStorageValue("matchId", action.payload);
    },
  },
});
export const { setMatchId } = TeamMatchSlice.actions;
export default TeamMatchSlice.reducer;
