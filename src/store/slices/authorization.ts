import { createSlice } from '@reduxjs/toolkit';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { State } from '../../types/state';
import { NameSpace, AuthorizationStatus } from '../../const';

type AuthSliceType = {
  authStatus: AuthorizationStatus;
  userEmail: string;
  authChecked: boolean;
  loadingStatus: boolean;
  errorStatus: boolean;
};

const initialState: AuthSliceType = {
  authStatus: AuthorizationStatus.Unknown,
  userEmail: '',
  authChecked: false,
  loadingStatus: false,
  errorStatus: false,
};

export const AuthSlice = createSlice({
  name: NameSpace.Filters,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.authChecked = false;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.userEmail = action.payload.email;
        state.authChecked = true;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      })

      .addCase(loginAction.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loadingStatus = false;
        state.errorStatus = false;
        state.authStatus = AuthorizationStatus.Auth;
        state.userEmail = action.payload.email;
      })
      .addCase(loginAction.rejected, (state) => {
        state.loadingStatus = false;
        state.errorStatus = true;
        state.authStatus = AuthorizationStatus.NoAuth;
      })

      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
        state.userEmail = '';
      });
  },
});

export const selectAuthStatus = (state: State): AuthorizationStatus => state[NameSpace.Auth].authStatus;

export const authReducer = AuthSlice.reducer;
