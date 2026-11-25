/** * * Asynchronously loads the component for
Admin
* */ import { lazyLoad } from "utils/loadable";
export const User = lazyLoad(
	() => import("./index"),
	(module) => module.User
);
