import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "types";
import { initialState } from ".";

const selectSlice = (state: RootState) => state.settingsSlice || initialState;
export const select = createSelector([selectSlice], (state) => state);
