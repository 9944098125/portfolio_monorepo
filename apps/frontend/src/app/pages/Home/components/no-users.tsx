import React from "react";
import { Users } from "lucide-react"; // Optional: using Lucide icon for visual appeal

export const NoUsers = () => {
	return (
		<div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50 rounded-2xl shadow-sm">
			{/* Optional Icon */}
			<div className="bg-teal-100 p-6 rounded-full mb-4">
				<Users className="w-10 h-10 text-teal-600" />
			</div>

			<h2 className="text-2xl font-semibold text-gray-800 font-poppins">
				No Users Found
			</h2>
			<p className="text-gray-500 mt-2 max-w-md">
				No Users Exist Yet. Please Check back later
			</p>

			<button
				onClick={() => window.location.reload()}
				className="mt-6 px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-all duration-300">
				Reload
			</button>
		</div>
	);
};
