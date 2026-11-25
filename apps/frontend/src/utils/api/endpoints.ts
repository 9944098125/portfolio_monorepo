import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from 'types';

const baseUrl =
  process.env.REACT_APP_API_URL ||
  'https://portfoliomonorepo-production.up.railway.app/api';

const defaultHeaders = {
  Accept: 'application/json',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

const prepareHeaders = (headers: any, { getState }) => {
  const token = (getState() as RootState)?.globalSlice?.token;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};
const originalBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders,
  headers: defaultHeaders,
});
export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await originalBaseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    localStorage.removeItem('asp-portfolios-user');
    localStorage.removeItem('asp-portfolios-token');
    sessionStorage.removeItem('asp-portfolios-user');
    sessionStorage.removeItem('asp-portfolios-token');
    window.location.href = '/login';
  }
  return result;
};

export const formatErrors = (errors: any) => {
  console.log('formatErrors', errors);
  if (errors?.data?.message) {
    return errors?.data?.message;
  } else {
    return errors?.messages || 'Something went wrong';
  }
};

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const endpoints = {
  baseUrl,
  getAllUsers: {
    url: '/auth/get-users',
    method: HTTP_METHODS.GET,
  },
  contactAdmin: {
    url: '/contacts/contact-admin',
    method: HTTP_METHODS.POST,
  },
  login: {
    url: '/auth/login',
    method: HTTP_METHODS.POST,
  },
  createUser: {
    url: '/auth/register',
    method: HTTP_METHODS.POST,
  },
  register: {
    url: '/auth/register',
    method: HTTP_METHODS.POST,
  },
  updateUser: {
    url: '/auth/update-user',
    method: HTTP_METHODS.POST,
  },
  getUser: {
    url: '/auth/get-user',
    method: HTTP_METHODS.GET,
  },
  createSkill: {
    url: '/skills/create-skill',
    method: HTTP_METHODS.POST,
  },
  getSkillById: {
    url: '/skills/get-skill',
    method: HTTP_METHODS.GET,
  },
  updateSkill: {
    url: '/skills/update-skill',
    method: HTTP_METHODS.POST,
  },
  deleteSkill: {
    url: '/skills/delete-skill',
    method: HTTP_METHODS.DELETE,
  },
  deleteUser: {
    url: '/auth/delete-user',
    method: HTTP_METHODS.DELETE,
  },
  createProject: {
    url: '/projects/create-project',
    method: HTTP_METHODS.POST,
  },
  updateProject: {
    url: '/projects/update-project',
    method: HTTP_METHODS.POST,
  },
  deleteProject: {
    url: '/projects/delete-project',
    method: HTTP_METHODS.DELETE,
  },
  getProjectById: {
    url: '/projects/get-project',
    method: HTTP_METHODS.GET,
  },
  createEducationalDetails: {
    url: '/educational-details/create-educational-details',
    method: HTTP_METHODS.POST,
  },
  getEducationalDetailById: {
    url: '/educational-details/get-educational-detail',
    method: HTTP_METHODS.GET,
  },
  updateEducationalDetails: {
    url: '/educational-details/update-educational-details',
    method: HTTP_METHODS.POST,
  },
  deleteEducationalDetails: {
    url: '/educational-details/delete-educational-details',
    method: HTTP_METHODS.DELETE,
  },
  createContact: {
    url: '/contacts/create-contact',
    method: HTTP_METHODS.POST,
  },
  getContactById: {
    url: '/contacts/get-contact',
    method: HTTP_METHODS.GET,
  },
  updateContact: {
    url: '/contacts/update-contact',
    method: HTTP_METHODS.POST,
  },
  deleteContact: {
    url: '/contacts/delete-contact',
    method: HTTP_METHODS.POST,
  },
  createTheme: {
    url: '/themes/create-theme',
    method: HTTP_METHODS.POST,
  },
  getThemeById: {
    url: '/themes/get-theme',
    method: HTTP_METHODS.GET,
  },
  updateTheme: {
    url: '/themes/update-theme',
    method: HTTP_METHODS.PUT,
  },
  deleteTheme: {
    url: '/themes/delete-theme',
    method: HTTP_METHODS.DELETE,
  },
  changeUserTheme: {
    url: '/auth/change-theme',
    method: HTTP_METHODS.POST,
  },
  changePassword: {
    url: '/auth/change-password',
    method: HTTP_METHODS.POST,
  },
};
