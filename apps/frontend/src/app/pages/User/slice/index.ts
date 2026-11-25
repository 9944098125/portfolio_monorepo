import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer } from "utils/redux-injectors";
import { State } from "./types";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
	endpoints,
	formatErrors,
	baseQuery,
	HTTP_METHODS,
} from "utils/api/endpoints";

export const initialState: State = {};

const slice = createSlice({
	name: "adminSlice",
	initialState,
	reducers: {
		someAction(state, action: PayloadAction<any>) {},
	},
});

export const api = createApi({
	reducerPath: "adminApi",
	baseQuery,
	endpoints: (build) => ({
		register: build.mutation<any, any>({
			query: (body) => {
				return {
					...endpoints.createUser,
					body,
				};
			},
			transformErrorResponse(baseQueryReturnValue, meta, arg) {
				return formatErrors(baseQueryReturnValue);
			},
		}),
		updateUser: build.mutation<any, any>({
			query: (body) => {
				return {
					url: `${endpoints.updateUser.url}/${body.userId}`,
					method: endpoints.updateUser.method,
					body,
				};
			},
			transformErrorResponse(baseQueryReturnValue, meta, arg) {
				return formatErrors(baseQueryReturnValue);
			},
		}),
		getUser: build.query<any, any>({
			query: (params) => {
				return {
					url: `${endpoints.getUser.url}/${params.userId}`,
					method: endpoints.getUser.method,
				};
			},
			transformErrorResponse(baseQueryReturnValue, meta, arg) {
				return formatErrors(baseQueryReturnValue);
			},
		}),
		createSkill: build.mutation<any, any>({
			query: (body) => {
				return {
					url: `${endpoints.createSkill.url}/${body.userId}`,
					method: endpoints.createSkill.method,
					body,
				};
			},
			transformErrorResponse(baseQueryReturnValue, meta, arg) {
				return formatErrors(baseQueryReturnValue);
			},
		}),
		getSkill: build.query<any, any>({
			query: (params) => {
				return {
					url: `${endpoints.getSkillById.url}/${params.skillId}`,
					method: endpoints.getSkillById.method,
				};
			},
			transformErrorResponse(baseQueryReturnValue, meta, arg) {
				return formatErrors(baseQueryReturnValue);
			},
		}),
		updateSkill: build.mutation<any, any>({
			query: (body) => {
				return {
					url: `${endpoints.updateSkill.url}/${body.skillId}`,
					method: endpoints.updateSkill.method,
					body,
				};
			},
			transformErrorResponse(baseQueryReturnValue, meta, arg) {
				return formatErrors(baseQueryReturnValue);
			},
		}),
		deleteSkill: build.mutation<any, any>({
			query: (params) => {
				return {
					url: `${endpoints.deleteSkill.url}/${params.skillId}`,
					method: endpoints.deleteSkill.method,
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
		createProject: build.mutation<any, any>({
			query: (body) => {
				return {
					url: `${endpoints.createProject.url}/${body.userId}`,
					method: endpoints.createProject.method,
					body,
				};
			},
			transformErrorResponse(baseQueryReturnValue, meta, arg) {
				return formatErrors(baseQueryReturnValue);
			},
		}),
		updateProject: build.mutation<any, any>({
			query: (body) => {
				return {
					url: `${endpoints.updateProject.url}/${body.projectId}`,
					method: endpoints.updateProject.method,
					body,
				};
			},
			transformErrorResponse(baseQueryReturnValue, meta, arg) {
				return formatErrors(baseQueryReturnValue);
			},
		}),
		deleteProject: build.mutation<any, any>({
			query: (params) => {
				return {
					url: `${endpoints.deleteProject.url}/${params.projectId}`,
					method: endpoints.deleteProject.method,
				};
			},
			transformErrorResponse(baseQueryReturnValue, meta, arg) {
				return formatErrors(baseQueryReturnValue);
			},
		}),
		getProject: build.query<any, any>({
			query: (params) => {
				return {
					url: `${endpoints.getProjectById.url}/${params.projectId}`,
					method: endpoints.getProjectById.method,
				};
			},
			transformErrorResponse(baseQueryReturnValue, meta, arg) {
				return formatErrors(baseQueryReturnValue);
			},
		}),
		createEducationalDetails: build.mutation<any, any>({
			query: (body) => {
				return {
					url: `${endpoints.createEducationalDetails.url}/${body.userId}`,
					method: endpoints.createEducationalDetails.method,
					body,
				};
			},
			transformErrorResponse(baseQueryReturnValue, meta, arg) {
				return formatErrors(baseQueryReturnValue);
			},
		}),
		getEducationalDetail: build.query<any, any>({
			query: (params) => {
				return {
					url: `${endpoints.getEducationalDetailById.url}/${params.edId}`,
					method: endpoints.getEducationalDetailById.method,
				};
			},
			transformErrorResponse(baseQueryReturnValue, meta, arg) {
				return formatErrors(baseQueryReturnValue);
			},
		}),
		updateEducationalDetails: build.mutation<any, any>({
			query: (body) => {
				return {
					url: `${endpoints.updateEducationalDetails.url}/${body.educationId}`,
					method: endpoints.updateEducationalDetails.method,
					body,
				};
			},
			transformErrorResponse(baseQueryReturnValue, meta, arg) {
				return formatErrors(baseQueryReturnValue);
			},
		}),
		deleteEducationalDetails: build.mutation<any, any>({
			query: (params) => {
				return {
					url: `${endpoints.deleteEducationalDetails.url}/${params.educationId}`,
					method: endpoints.deleteEducationalDetails.method,
				};
			},
			transformErrorResponse(baseQueryReturnValue, meta, arg) {
				return formatErrors(baseQueryReturnValue);
			},
		}),
		createContact: build.mutation<any, any>({
			query: (body) => {
				return {
					url: `${endpoints.createContact.url}/${body.userId}`,
					method: endpoints.createContact.method,
					body,
				};
			},
			transformErrorResponse(baseQueryReturnValue, meta, arg) {
				return formatErrors(baseQueryReturnValue);
			},
		}),
		getContact: build.query<any, any>({
			query: (params) => {
				return {
					url: `${endpoints.getContactById.url}/${params.contactId}`,
					method: endpoints.getContactById.method,
				};
			},
			transformErrorResponse(baseQueryReturnValue, meta, arg) {
				return formatErrors(baseQueryReturnValue);
			},
		}),
		updateContact: build.mutation<any, any>({
			query: (body) => {
				return {
					url: `${endpoints.updateContact.url}/${body.contactId}`,
					method: endpoints.updateContact.method,
					body,
				};
			},
			transformErrorResponse(baseQueryReturnValue, meta, arg) {
				return formatErrors(baseQueryReturnValue);
			},
		}),
		deleteContact: build.mutation<any, any>({
			query: (params) => {
				return {
					url: `${endpoints.deleteContact.url}/${params.contactId}`,
					method: endpoints.deleteContact.method,
				};
			},
			transformErrorResponse(baseQueryReturnValue, meta, arg) {
				return formatErrors(baseQueryReturnValue);
			},
		}),
		createTheme: build.mutation<any, any>({
			query: (body) => {
				return {
					url: `${endpoints.createTheme.url}/${body.userId}`,
					method: endpoints.createTheme.method,
					body,
				};
			},
			transformErrorResponse(baseQueryReturnValue, meta, arg) {
				return formatErrors(baseQueryReturnValue);
			},
		}),
		getTheme: build.query<any, any>({
			query: (params) => {
				return {
					url: `${endpoints.getThemeById.url}/${params.themeId}`,
					method: endpoints.getThemeById.method,
				};
			},
			transformErrorResponse(baseQueryReturnValue, meta, arg) {
				return formatErrors(baseQueryReturnValue);
			},
		}),
		updateTheme: build.mutation<any, any>({
			query: (body) => {
				return {
					url: `${endpoints.updateTheme.url}/${body.themeId}`,
					method: endpoints.updateTheme.method,
					body,
				};
			},
			transformErrorResponse(baseQueryReturnValue, meta, arg) {
				return formatErrors(baseQueryReturnValue);
			},
		}),
		deleteTheme: build.mutation<any, any>({
			query: (params) => {
				return {
					url: `${endpoints.deleteTheme.url}/${params.themeId}`,
					method: endpoints.deleteTheme.method,
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
