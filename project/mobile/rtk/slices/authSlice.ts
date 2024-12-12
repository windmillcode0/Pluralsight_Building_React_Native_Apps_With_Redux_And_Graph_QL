import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthPayload } from '../service/generated';

type AuthState = {
  user: AuthPayload['user'] | null;
  token?: string | null;
};

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<AuthPayload>) => {

      state.token = payload.token;
      state.user = payload.user;
    },
    removeCredentials: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});
export default slice.reducer;

export const { setCredentials, removeCredentials } = slice.actions;
