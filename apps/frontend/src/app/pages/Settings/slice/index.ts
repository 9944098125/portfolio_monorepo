import { PayloadAction } from "@reduxjs/toolkit";
import { createApi, createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer } from "utils/redux-injectors";
import { State } from "./types";
import { endpoints, baseQuery, formatErrors } from "utils/api/endpoints";

export const initialState: State = {};

const slice = createSlice({
  name: "settingsSlice",
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
  },
});

export const api = createApi({
  reducerPath: "settingsApi",
  baseQuery,
  endpoints: (build) => ({
    changeUserTheme: build.mutation<any, any>({
      query: (body) => {
        return {
          url:endpoints.changeUserTheme.url + '/' + body.userId,
          method: endpoints.changeUserTheme.method,
          body,
        }
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue);
      },
    }),
    changePassword: build.mutation<any, any>({
      query: (body) => {
        return {
          url:endpoints.changePassword.url + '/' + body.userId,
          method: endpoints.changePassword.method,
          body,
        }
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue);
      },
    }),
  }),
})

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
