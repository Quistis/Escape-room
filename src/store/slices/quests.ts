import { createSlice } from '@reduxjs/toolkit';
import { fetchQuests, fetchQuestById } from '../api-actions';
import { TQuest, TQuestsCard } from '../../types/quest';
import { State } from '../../types/state';
import { NameSpace } from '../../const';

type QuestsSliceType = {
  cards: {
    cardsData: TQuestsCard[];
    loadingStatus: boolean;
    errorStatus: boolean;
  };
  currentQuest: {
    data: TQuest | null;
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
  currentQuest: {
    data: null,
    loadingStatus: false,
    errorStatus: false,
  }
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
      })

      .addCase(fetchQuestById.pending, (state) => {
        state.currentQuest.errorStatus = false;
        state.currentQuest.loadingStatus = true;
      })
      .addCase(fetchQuestById.fulfilled, (state, action) => {
        state.currentQuest.data = action.payload;
        state.currentQuest.loadingStatus = false;
      })
      .addCase(fetchQuestById.rejected, (state) => {
        state.currentQuest.loadingStatus = false;
        state.currentQuest.errorStatus = true;
      });
  }});

export const selectQuestCards = (state: State): TQuestsCard[] => state[NameSpace.Quests].cards.cardsData;
export const selectQuestCardsLoadingStatus = (state: State): boolean => state[NameSpace.Quests].cards.loadingStatus;
export const selectQuestCardsErrorStatus = (state: State): boolean => state[NameSpace.Quests].cards.errorStatus;

export const selectCurrentQuest = (state: State): TQuest | null => state[NameSpace.Quests].currentQuest.data;
export const selectCurrentQuestLoadingStatus = (state: State): boolean => state[NameSpace.Quests].currentQuest.loadingStatus;
export const selectCurrentQuestErrorStatus = (state: State): boolean => state[NameSpace.Quests].currentQuest.errorStatus;

export const questsReducer = QuestsSlice.reducer;
