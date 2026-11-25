import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "types";
import { initialState } from ".";

const selectSlice = (state: RootState) => state.globalSlice || initialState;

export const selectGlobal = createSelector([selectSlice], (state) => state);
export const selectUser = createSelector([selectSlice], (state) => state.user);
export const selectToken = createSelector(
	[selectSlice],
	(state) => state.token
);
export const selectRememberMe = createSelector(
	[selectSlice],
	(state) => state.rememberMe
);
