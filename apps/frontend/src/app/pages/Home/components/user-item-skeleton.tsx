import React from "react";

export const UserItemSkeleton = () => {
	return (
		<div className="border rounded-2xl p-4 flex flex-col sm:flex-row items-center bg-gray-50 shadow-sm animate-pulse">
			{/* Skeleton Image */}
			<div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gray-300 flex-shrink-0" />

			{/* Skeleton Text */}
			<div className="sm:ml-4 mt-4 sm:mt-0 w-full">
				<div className="h-6 w-2/3 bg-gray-300 rounded mb-2" />
				<div className="h-4 w-1/2 bg-gray-200 rounded mb-1" />
				<div className="h-4 w-3/4 bg-gray-200 rounded" />
			</div>
		</div>
	);
};
