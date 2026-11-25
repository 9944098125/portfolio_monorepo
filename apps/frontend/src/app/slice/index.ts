import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer } from "utils/redux-injectors";
import { State } from "./types";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, endpoints, formatErrors } from "utils/api/endpoints";

export const initialState: State = {
  token: (() => {
    const stored =
      localStorage.getItem("asp-portfolios-token") ??
      sessionStorage.getItem("asp-portfolios-token");
    return stored || null;
  })(),
  user: (() => {
    const stored =
      localStorage.getItem("asp-portfolios-user") ??
      sessionStorage.getItem("asp-portfolios-user");
    return stored ? JSON.parse(stored) : null;
  })(),
  rememberMe: false,
};

const slice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    setUserWithStorage(state, action: PayloadAction<any>) {
      const { user, rememberMe, token } = action.payload;
      if (rememberMe) {
        state.user = user;
        state.rememberMe = true;
        state.token = token;
        localStorage.setItem("asp-portfolios-user", JSON.stringify(user));
        localStorage.setItem("asp-portfolios-token", token);
      } else {
        state.user = user;
        state.rememberMe = false;
        state.token = token;
        sessionStorage.setItem("asp-portfolios-user", JSON.stringify(user));
        sessionStorage.setItem("asp-portfolios-token", token);
      }
    },
    logout(state) {
      localStorage.removeItem("asp-portfolios-user");
      localStorage.removeItem("asp-portfolios-token");
      sessionStorage.removeItem("asp-portfolios-user");
      sessionStorage.removeItem("asp-portfolios-token");
      state.user = null;
      state.token = null;
    },
  },
});

export const api = createApi({
  reducerPath: "globalApi",
  baseQuery,
  endpoints: (build) => ({
    getAllUsers: build.query<any, any>({
      query: (params) => {
        return {
          ...endpoints.getAllUsers,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue);
      },
    }),
    register: build.mutation<any, any>({
      query: (body) => {
        return {
          ...endpoints.register,
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

export const useGlobalSlice = () => {
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
