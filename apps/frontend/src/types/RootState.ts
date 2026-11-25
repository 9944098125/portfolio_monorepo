/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
import { State as GlobalState } from "app/slice/types";
import { State as HomeState } from "app/pages/Home/slice/types";
import { State as LoginState } from "app/pages/Login/slice/types";
import { State as AdminState } from "app/pages/User/slice/types";
import { State as UserState } from "app/pages/User/slice/types";
import { State as PortfolioState } from "app/pages/Portfolio/slice/types";
import {State as SettingsState} from "app/pages/Settings/slice/types";

export interface RootState {
	globalSlice: GlobalState;
	globalApi: any;
	homeSlice: HomeState;
	homeApi: any;
	loginSlice: LoginState;
	loginApi: any;
	adminSlice: AdminState;
	adminApi: any;
	userSlice: UserState;
	userApi: any;
	portfolioSlice: PortfolioState;
	portfolioApi: any;
	settingsSlice: SettingsState;
	settingsApi: any;
}
