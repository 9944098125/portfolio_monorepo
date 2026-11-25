import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, createApi } from "utils/@reduxjs/toolkit";
import { useInjectReducer } from "utils/redux-injectors";
import { State } from "./types";
import { endpoints, formatErrors, baseQuery } from "utils/api/endpoints";

export const initialState: State = {};

const slice = createSlice({
	name: "portfolioSlice",
	initialState,
	reducers: {
		someAction(state, action: PayloadAction<any>) {},
	},
});

export const api = createApi({
	reducerPath: "portfolioApi",
	baseQuery,
	endpoints: (build) => ({
		getPortfolio: build.query<any, any>({
			query: (params) => {
				return {
					url: endpoints.getUser.url + "/" + params.userId,
					method: endpoints.getUser.method,
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
