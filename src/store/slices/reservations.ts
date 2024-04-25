import { createSlice } from '@reduxjs/toolkit';
import { fetchQuestsReservations } from '../api-actions';
import { TQuestReservation } from '../../types/booking';
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

export const reservationsReducer = ReservationsSlice.reducer;
