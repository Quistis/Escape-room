import { createSlice } from '@reduxjs/toolkit';
import { fetchQuestBookingInfoById } from '../api-actions';
import { TBookingData } from '../../types/booking';
import { State } from '../../types/state';
import { NameSpace } from '../../const';

type BookingSliceType = {
  bookingData: TBookingData[] | null;
  loadingStatus: boolean;
  errorStatus: boolean;
};

const initialState: BookingSliceType = {
  bookingData: null,
  loadingStatus: false,
  errorStatus: false,
};

export const BookingSlice = createSlice({
  name: NameSpace.Booking,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestBookingInfoById.pending, (state) => {
        state.errorStatus = false;
        state.loadingStatus = true;
      })
      .addCase(fetchQuestBookingInfoById.fulfilled, (state, action) => {
        state.bookingData = action.payload;
        state.loadingStatus = false;
      })
      .addCase(fetchQuestBookingInfoById.rejected, (state) => {
        state.loadingStatus = false;
        state.errorStatus = true;
      });
  }
});

export const selectBookingData = (state: State): TBookingData[] | null => state[NameSpace.Booking].bookingData;
export const selectBookingDataLoadingStatus = (state: State): boolean => state[NameSpace.Booking].loadingStatus;
export const selectBookingDataErrorStatus = (state: State): boolean => state[NameSpace.Booking].errorStatus;

export const bookingReducer = BookingSlice.reducer;
