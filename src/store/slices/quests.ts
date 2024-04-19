import { createSlice } from '@reduxjs/toolkit';
import { fetchQuests } from '../api-actions';
import { TQuestsCard } from '../../types/quest';
import { NameSpace } from '../../const';

type QuestsSliceType = {
  cards: {
    cardsData: TQuestsCard[];
    loadingStatus: boolean;
    errorStatus: boolean;
  };
};

const initialState: QuestsSliceType = {
  cards: {
    cardsData: [],
    loadingStatus: false,
    errorStatus: false,
  },
};

export const QuestsSlice = createSlice({
  name: NameSpace.Quests,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuests.pending, (state) => {
        state.cards.errorStatus = false;
        state.cards.loadingStatus = true;
      })
      .addCase(fetchQuests.fulfilled, (state, action) => {
        state.cards.cardsData = action.payload;
        state.cards.loadingStatus = false;
      })
      .addCase(fetchQuests.rejected, (state) => {
        state.cards.loadingStatus = false;
        state.cards.errorStatus = true;
      });
  }});

export const questsReducer = QuestsSlice.reducer;
