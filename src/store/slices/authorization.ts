import { createSlice } from '@reduxjs/toolkit';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { NameSpace, AuthorizationStatus } from '../../const';

type AuthSliceType = {
  authStatus: AuthorizationStatus;
  userEmail: string;
  loadingStatus: boolean;
  errorStatus: boolean;
};

const initialState: AuthSliceType = {
  authStatus: AuthorizationStatus.Unknown,
  userEmail: '',
  loadingStatus: false,
  errorStatus: false,
};

export const AuthSlice = createSlice({
  name: NameSpace.Filters,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.userEmail = action.payload.email;
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
      });
  },
});

export const authReducer = AuthSlice.reducer;
