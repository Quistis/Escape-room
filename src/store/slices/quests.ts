import { createSlice } from '@reduxjs/toolkit';
import { TQuestsCard } from '../../types/quest';
import { NameSpace } from '../../const';

type QuestsSliceType = {
  cards: {
    cardsData: TQuestsCard[];
  };
};

const initialState: QuestsSliceType = {
  cards: {
    cardsData: [],
  },
};

export const QuestsSlice = createSlice({
  name: NameSpace.Quests,
  initialState,
  reducers: {},
});

export const questsReducer = QuestsSlice.reducer;
