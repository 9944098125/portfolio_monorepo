import { RootStateKeyType } from '../types/injector-typings';
import {
  createSlice as createSliceOriginal,
  SliceCaseReducers,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import {
  CreateApi,
  createApi as createApiOriginal,
  reactHooksModule,
  reactHooksModuleName,
} from '@reduxjs/toolkit/query/react';

/* Wrap createSlice with stricter Name options */

/* istanbul ignore next */
export const createSlice = <
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends RootStateKeyType,
>(
  options: CreateSliceOptions<State, CaseReducers, Name>,
) => {
  return createSliceOriginal(options);
};

export const createApi = createApiOriginal;
