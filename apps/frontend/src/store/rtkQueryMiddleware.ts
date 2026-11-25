import { api as homeApi } from "app/pages/Home/slice";
import { api as loginApi } from "app/pages/Login/slice";
import { api as adminApi } from "app/pages/User/slice";
import { api as userApi } from "app/pages/User/slice";
import { api as portfolioApi } from "app/pages/Portfolio/slice";
import { api as settingsApi } from "app/pages/Settings/slice";

import { api as globalApi } from "app/slice";

export const rtkQueryMiddleware = [
	globalApi.middleware,
	homeApi.middleware,
	loginApi.middleware,
	adminApi.middleware,
	userApi.middleware,
	portfolioApi.middleware,
	settingsApi.middleware,
];
