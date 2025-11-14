import { createSlice } from "@reduxjs/toolkit";
export interface MatchDataState {
  matchName: string;
  time: string;
  join_num: number;
  coin: number;
  matchId:string;
  createrId:string;
  isPublic:boolean;
  // matcherData:Array<GameResponse>
}

interface MatchDataStateType {
  match_data: MatchDataState[];
}

const initialState: MatchDataStateType = {
  match_data: [{ matchName: "", time: "", join_num: 0, coin: 0, matchId:"", createrId:"" , isPublic:true}],
};

export const matchSlice = createSlice({
  name: "match_data",
  initialState,
  reducers: {
    setMatchData: (state , { payload }) => {
      console.log("success", state.match_data);
      state.match_data = payload;
    }
  },
});

export const { setMatchData } = matchSlice.actions;
export default matchSlice.reducer;
