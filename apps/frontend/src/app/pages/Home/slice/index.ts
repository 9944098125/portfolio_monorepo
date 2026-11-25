import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer } from "utils/redux-injectors";
import { State } from "./types";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, endpoints, formatErrors } from "utils/api/endpoints";

export const initialState: State = {};

const slice = createSlice({
  name: "homeSlice",
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
  },
});

export const api = createApi({
  reducerPath: "homeApi",
  baseQuery,
  tagTypes: ["Users"],
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
      providesTags: ["Users"],
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
      invalidatesTags: ["Users"],
    }),
    contactAdmin: build.mutation<any, any>({
      query: (body) => {
        return {
          ...endpoints.contactAdmin,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue);
      },
    }),
    deleteUser: build.mutation<any, any>({
      query: (params) => {
        return {
          url: `${endpoints.deleteUser.url}/${params.userId}`,
          method: endpoints.deleteUser.method,
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
