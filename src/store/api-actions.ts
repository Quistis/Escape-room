import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import {saveToken, dropToken} from '../services/token';
import { AppDispatch, State } from '../types/state';
import { TQuest, TQuestsCard } from '../types/quest';
import { TBookingData, TQuestReservation, TQuestBookingFormInfo } from '../types/booking';
import { TUser, TAuthInfo } from '../types/user';
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

export const fetchQuestById = createAsyncThunk<TQuest, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'quests/fetchQuestById',
  async (id, {extra: api}) => {
    const {data} = await api.get<TQuest>(`${APIRoute.Quests}/${id}`);
    return data;
  }
);

export const fetchQuestBookingInfoById = createAsyncThunk<TBookingData[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'quests/fetchQuestBookingInfoById',
  async (id, {extra: api}) => {
    const {data} = await api.get<TBookingData[]>(`${APIRoute.Quests}/${id}/booking`);
    return data;
  }
);

export const fetchQuestsReservations = createAsyncThunk<TQuestReservation[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'quests/fetchQuestsReservations',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<TQuestReservation[]>(APIRoute.Reservation);
    return data;
  }
);

export const postQuestBookingInfo = createAsyncThunk<TQuestReservation, { formData: TQuestBookingFormInfo; questId: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'quests/postQuestBookingInfo',
  async({formData, questId}, {extra: api}) => {

    const {data} = await api.post<TQuestReservation>(`${APIRoute.Quests}/${questId}/booking`, formData);
    return data;

  }
);

export const deleteQuestBookingInfoById = createAsyncThunk<TBookingData[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'quests/deleteQuestBookingInfoById',
  async (id, {extra: api}) => {
    const {data} = await api.delete<TBookingData[]>(`${APIRoute.Reservation}/${id}`);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<TUser, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<TUser>(APIRoute.Login);
    return data;
  }
);

export const loginAction = createAsyncThunk<TUser, TAuthInfo, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/login',
  async ({email, password}, {extra: api}) => {
    const {data} = await api.post<TUser>(APIRoute.Login, {email, password});
    saveToken(data.token);
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);
