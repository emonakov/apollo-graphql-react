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
      state.items = [
        ...(state.items ? state.items : []),
        ...(action.payload.items ? action.payload.items : []),
      ];
    },
    logIn: (
      state: StateInterface,
      action: PayloadAction<Partial<StateInterface>>
    ) => {
      state.loggedIn = action.payload.loggedIn;
    },
    deleteItems: (
      state: StateInterface,
      action: PayloadAction<Partial<StateInterface>>
    ) => {
      if (state.items && action.payload.items) {
        const [itemToRemove] = action.payload.items;
        const newItems = state.items.filter(
          (item) => item.id !== itemToRemove.id
        );

        state.items = newItems;
      }
    },
    clearItems: (state: StateInterface) => {
      state.items = [];
    },
  },
});

export const { addItem, logIn, deleteItems, clearItems } = slice.actions;

export const selectItems = (state: RootState) => state.main?.items;
export const selectLoggedIn = (state: RootState) => state.main.loggedIn;

export default slice.reducer;
