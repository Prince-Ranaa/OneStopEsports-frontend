import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Tournament {
  _id: string;
  tournamentName: string;
  prizePool?: number;
  thumbnail?: string;
  entryFees?: number;
  howToApply?: string;
  rules?: string;
  spots: number;
  createdDate?: string;
  startDate: string;
  status?: string;
  game?: String;
  createdBy: String;
  totalTeamRegistered: number;
  registeredTeams: any;
}

interface TournamentState {
  tournaments: Tournament[];
  selectedTournament: Tournament | any;
}

const initialState: TournamentState = {
  tournaments: [],
  selectedTournament: null,
};

const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    setTournaments(state, action: PayloadAction<Tournament[]>) {
      state.tournaments = action.payload;
    },
    setSelectedTournament(state, action: PayloadAction<Tournament>) {
      state.selectedTournament = action.payload;
    },
    addTournament(state, action: PayloadAction<Tournament>) {
      state.tournaments.push(action.payload);
    },
    removeTournament(state, action: PayloadAction<string>) {
      state.tournaments = state.tournaments.filter(
        (t) => t._id !== action.payload
      );
    },
    updateTournament(state, action: PayloadAction<Tournament>) {
      const updated = action.payload;
      const index = state.tournaments.findIndex((t) => t._id === updated._id);
      if (index !== -1) {
        state.tournaments[index] = updated;
      }
    },
    clearTournaments(state) {
      state.tournaments = [];
    },
  },
});

export const {
  setTournaments,
  addTournament,
  removeTournament,
  updateTournament,
  setSelectedTournament,
  clearTournaments,
} = tournamentSlice.actions;

export default tournamentSlice.reducer;
