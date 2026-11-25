import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer } from "utils/redux-injectors";
import { State } from "./types";
import { createApi } from "@reduxjs/toolkit/query/react";
import { endpoints, baseQuery, formatErrors } from "utils/api/endpoints";

export const initialState: State = {};

const slice = createSlice({
	name: "loginSlice",
	initialState,
	reducers: {
		someAction(state, action: PayloadAction<any>) {},
	},
});

export const api = createApi({
	reducerPath: "loginApi",
	baseQuery,
	endpoints: (build) => ({
		login: build.mutation<any, any>({
			query: (body) => {
				return {
					...endpoints.login,
					body,
				};
			},
			transformErrorResponse(baseQueryReturnValue, meta, arg) {
				return formatErrors(baseQueryReturnValue);
			},
		}),
	}),
});

export const { actions: Actions } = slice;

export const useSlice = () => {
	useInjectReducer({ key: slice.name, reducer: slice.reducer });
	useInjectReducer({ key: api.reducerPath, reducer: api.reducer });
	return { ...api, actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
