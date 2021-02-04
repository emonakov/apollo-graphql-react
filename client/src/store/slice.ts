import { createSlice /* PayloadAction */ } from '@reduxjs/toolkit';

// import { AppThunk, RootState } from './store'

const initialState = {};

export const slice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    success: (state: any, action: any) => {
      state.error = undefined;
      state.item = action.payload;
      state.loading = false;
    },
    failure: (state: any, action: any) => {
      state.error = action.payload.error;
      state.loading = false;
      state.loading = true;
    },
    request: (state: any) => {
      state.loading = true;
    },
  },
});

export const { success, request, failure } = slice.actions;

export default slice.reducer;
