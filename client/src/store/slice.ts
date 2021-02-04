import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StateInterface } from '../types/StateInterface';

import { /* AppThunk, */ RootState } from './store';

const initialState: StateInterface = {
  loggedIn: false,
};

export const slice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    addItem: (
      state: StateInterface,
      action: PayloadAction<Partial<StateInterface>>
    ) => {
      state.error = undefined;
      state.items = [
        ...(state.items ? state.items : []),
        ...(action.payload.items ? action.payload.items : []),
      ];
      state.loading = false;
    },
    failure: (
      state: StateInterface,
      action: PayloadAction<Partial<StateInterface>>
    ) => {
      state.error = action.payload.error;
      state.loading = false;
    },
    request: (state: StateInterface) => {
      state.loading = true;
    },
    logIn: (state: StateInterface, action: PayloadAction<StateInterface>) => {
      state.loggedIn = action.payload.loggedIn;
    },
    deleteItems: (
      state: StateInterface,
      action: PayloadAction<Partial<StateInterface>>
    ) => {
      if (state.items && action.payload.items) {
        const [itemToRemove] = action.payload.items;
        const newItems = state.items.filter((item) => item !== itemToRemove);
        state.items = newItems;
      }
    },
  },
});

export const { addItem, request, failure, logIn, deleteItems } = slice.actions;

export const selectItems = (state: RootState) => state.main?.items;
export const selectLoading = (state: RootState) => state.main?.loading;
export const selectError = (state: RootState) => state.main?.error;
export const selectLoggedIn = (state: RootState) => state.main.loggedIn;

export default slice.reducer;
