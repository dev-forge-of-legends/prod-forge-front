import { createSlice } from "@reduxjs/toolkit";
export interface MatchDataState {
  game_response:Array<GameResponse>
}

interface MatchDataStateType {
  playerData : MatchDataState[]; 
}

interface User {
    userName: string;
    avatar: string;
    level: number;
}

interface Player {
    userId: string;
    status: 'joined' | 'playing'; // Assuming these are the only possible statuses
    invited: boolean;
    color: 'red' | 'blue' | 'green' | 'yellow'; // Add more colors if needed
    nowMoving: boolean;
    user: User;
}

interface Pawn {
    id: string;
    color: 'red' | 'blue' | 'green' | 'yellow'; // Add more colors if needed
    basePos: number;
    position: number;
}

interface GameResponse {
  avatar:string,
  betCoins:number,
  createrId:string,
  endTime:string,
  id:string,
  isPublic:boolean,
  mode:string,
  name:string,
  pawns:Array<Pawn>,
  players:Array<Player>,
  startTime:string,
  status:'inprogress' | 'completed' | 'pending' | 'joined' | 'waiting',
  timeLimit:string,
  winnerId:string
}


const initialState: MatchDataStateType = {
  // matchData: [ {playerInfo: [{id:"", mode:"sd", players:[], pawns:[], status:"waiting", userId:"", winnerId:""}]}]
  playerData:[{game_response:[]}]
};

export const matchSlice = createSlice({
  name: "match_data",
  initialState,
  reducers: {
    setAllMatchData: (state , { payload }) => {
      console.log("success_big", state.playerData);
      state.playerData = payload;
    }
  },
});

export const { setAllMatchData } = matchSlice.actions;
export default matchSlice.reducer;