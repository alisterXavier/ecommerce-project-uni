import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';
import { HYDRATE } from 'next-redux-wrapper';
import { SupabaseClient, User } from '@supabase/auth-helpers-nextjs';
import { AuthError } from '@supabase/supabase-js';

export interface AuthState {
  authState: {
    data: {
      user: User | null;
    };
    error: null | AuthError;
  } | null;
  isLoadingUser: boolean;
}

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (auth: SupabaseClient<any, 'public', any> | null) => {
    if (auth) {
      const user = await auth.auth.getUser();
      return user.data.user ? user : null;
    }
    return null;
  }
);

// Initial state
const initialState: AuthState = {
  authState: {
    data: {
      user: null,
    },
    error: null,
  },
  isLoadingUser: false,
};

// Actual Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      const hyrdateAction = action as PayloadAction<
        SupabaseClient,
        string,
        any,
        any
      >;
      return { ...state, ...hyrdateAction.payload.auth };
    });

    builder.addCase(fetchUser.pending, (state, action) => {
      state.isLoadingUser = true;
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.authState = action.payload;
      state.isLoadingUser = false;
    });
  },
});

// export const { setAuthState } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;
export const selectUserLoadingState = (state: AppState) =>
  state.auth.isLoadingUser;

export default authSlice.reducer;
