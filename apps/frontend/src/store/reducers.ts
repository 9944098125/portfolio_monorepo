/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "@reduxjs/toolkit";

import { InjectedReducersType } from "utils/types/injector-typings";

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
	// Always return a combined reducer. If no injected reducers are present,
	// combineReducers({}) will return a reducer that returns an empty object as state
	// instead of `undefined`. This prevents selectors from receiving `undefined`
	// root state and avoids runtime errors like reading `state.globalSlice`.
	return combineReducers({
		...injectedReducers,
	});
}
