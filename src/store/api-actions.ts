import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
// import { toast } from 'react-toastify';
// import {saveToken, dropToken} from '../services/token';
import { AppDispatch, State } from '../types/state';
import { TQuestsCard } from '../types/quest';
import { APIRoute } from '../const';

export const fetchQuests = createAsyncThunk<TQuestsCard[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'quests/fetchQuests',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<TQuestsCard[]>(APIRoute.Quests);

    return data;
  }
);
