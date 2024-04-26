import { createSlice } from '@reduxjs/toolkit';
import { fetchQuestsReservations } from '../api-actions';
import { TQuestReservation } from '../../types/booking';
import { State } from '../../types/state';
import { NameSpace } from '../../const';


type ReservationsSliceType = {
  reservationsData: TQuestReservation[] | null;
  loadingStatus: boolean;
  errorStatus: boolean;
};

const initialState: ReservationsSliceType = {
  reservationsData: null,
  loadingStatus: false,
  errorStatus: false,
};

export const ReservationsSlice = createSlice({
  name: NameSpace.Reservations,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestsReservations.pending, (state) => {
        state.errorStatus = false;
        state.loadingStatus = true;
      })
      .addCase(fetchQuestsReservations.fulfilled, (state, action) => {
        state.reservationsData = action.payload;
        state.loadingStatus = false;
      })
      .addCase(fetchQuestsReservations.rejected, (state) => {
        state.loadingStatus = false;
        state.errorStatus = true;
      });
  }
});

export const selectReservationsData = (state: State): TQuestReservation[] | null => state[NameSpace.Reservations].reservationsData;
export const selectReservationsLoadingStatus = (state: State): boolean => state[NameSpace.Reservations].loadingStatus;
export const selectReservationsErrorStatus = (state: State): boolean => state[NameSpace.Reservations].errorStatus;

export const reservationsReducer = ReservationsSlice.reducer;
