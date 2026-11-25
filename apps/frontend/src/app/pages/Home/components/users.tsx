import React, { useEffect } from "react";
import { useSlice } from "../slice";
import { UserItem } from "./user-item";
import { toast } from "app/components/ui/use-toast";
import { UserItemSkeleton } from "./user-item-skeleton";
import { NoUsers } from "./no-users";

export const Users = () => {
	const { useLazyGetAllUsersQuery } = useSlice();

	const [getAllUsers, { data: users, isLoading, isError, error }] =
		useLazyGetAllUsersQuery();

	useEffect(() => {
		getAllUsers({});
	}, []);

	useEffect(() => {
		if (isError || error) {
			toast({
				title: "Error",
				variant: "destructive",
				description: error as string,
			});
		}
	}, [isError, error]);

	return (
		<React.Fragment>
			<div className="my-6 p-4 bg-white shadow-lg rounded-2xl">
				<h4 className="text-[2.4rem] md:text-[4.1rem] font-dancing font-[800] bg-gradient-to-r from-teal-600 via-yellow-500 to-pink-600 text-transparent bg-clip-text">
					Our Users with their Stunning Portfolios
				</h4>
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
					{isLoading ? (
						<UserItemSkeleton />
					) : users?.data?.length > 0 ? (
						users?.data?.map((user) => <UserItem user={user} key={user?._id} />)
					) : (
						<NoUsers />
					)}
				</div>
			</div>
		</React.Fragment>
	);
};
