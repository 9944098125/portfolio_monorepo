import React from "react";
import { Skeleton } from "app/components/ui/skeleton";

export const PortfolioSkeleton = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 animate-pulse">
			{/* Hero Section Skeleton */}
			<div className="relative bg-gradient-to-r from-blue-600 to-purple-600 pt-20 pb-32">
				<div className="container mx-auto px-4">
					<div className="flex flex-col items-center text-center space-y-6">
						<Skeleton className="w-48 h-48 rounded-full" />
						<Skeleton className="h-10 w-80" />
						<Skeleton className="h-6 w-64" />
						<Skeleton className="h-5 w-48" />
					</div>
				</div>
			</div>

			{/* Content Sections Skeleton */}
			<div className="container mx-auto px-4 -mt-16 space-y-12 pb-12">
				{/* About Section */}
				<div className="bg-white rounded-2xl shadow-xl p-8">
					<Skeleton className="h-8 w-32 mb-4" />
					<Skeleton className="h-4 w-full mb-2" />
					<Skeleton className="h-4 w-full mb-2" />
					<Skeleton className="h-4 w-3/4" />
				</div>

				{/* Skills Section */}
				<div className="bg-white rounded-2xl shadow-xl p-8">
					<Skeleton className="h-8 w-32 mb-6" />
					<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
						{[...Array(12)].map((_, i) => (
							<div key={i} className="flex flex-col items-center space-y-2">
								<Skeleton className="w-20 h-20 rounded-full" />
								<Skeleton className="h-4 w-16" />
							</div>
						))}
					</div>
				</div>

				{/* Projects Section */}
				<div className="bg-white rounded-2xl shadow-xl p-8">
					<Skeleton className="h-8 w-32 mb-6" />
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[...Array(3)].map((_, i) => (
							<div key={i} className="space-y-3">
								<Skeleton className="w-full h-48 rounded-lg" />
								<Skeleton className="h-6 w-3/4" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-2/3" />
							</div>
						))}
					</div>
				</div>

				{/* Education Section */}
				<div className="bg-white rounded-2xl shadow-xl p-8">
					<Skeleton className="h-8 w-48 mb-6" />
					<div className="space-y-6">
						{[...Array(3)].map((_, i) => (
							<div key={i} className="flex gap-4">
								<Skeleton className="w-16 h-16 rounded-full flex-shrink-0" />
								<div className="flex-1 space-y-2">
									<Skeleton className="h-5 w-64" />
									<Skeleton className="h-4 w-32" />
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Contacts Section */}
				<div className="bg-white rounded-2xl shadow-xl p-8">
					<Skeleton className="h-8 w-32 mb-6" />
					<div className="flex justify-center gap-6">
						{[...Array(3)].map((_, i) => (
							<Skeleton key={i} className="w-12 h-12 rounded-full" />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
