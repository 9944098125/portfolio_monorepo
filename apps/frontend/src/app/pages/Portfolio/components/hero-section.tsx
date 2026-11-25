import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "app/components/ui/avatar";

interface HeroSectionProps {
	user: {
		full_name?: string;
		image?: string;
		designation?: string;
		city?: string;
		email?: string;
		countryCode?: string;
		phone?: string;
	};
	theme?: {
		primaryColor?: string;
		secondaryColor?: string;
		background?: string;
		boldBg?: string;
	};
}

export const HeroSection: React.FC<HeroSectionProps> = ({ user, theme }) => {
	const primaryColor = theme?.primaryColor || "#3b82f6";
	const secondaryColor = theme?.secondaryColor || "#8b5cf6";
	const boldBg = theme?.boldBg || "#1e293b";

	return (
		<div
			className="relative pt-20 pb-32 overflow-hidden"
			style={{
				background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 50%)`,
			}}>
			{/* Animated Background Pattern */}
			<div className="absolute inset-0 opacity-10">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
						backgroundSize: "40px 40px",
					}}
				/>
			</div>

			<div className="container mx-auto px-4 relative z-10">
				<div className="flex flex-col items-center text-center space-y-6">
					{/* Avatar */}
					<div className="relative group">
						<div
							className="absolute -inset-2 rounded-full opacity-75 group-hover:opacity-100 blur-xl transition-opacity duration-300"
							style={{
								background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
							}}
						/>
						<Avatar className="w-48 h-48 border-4 border-white shadow-2xl relative z-10">
							<AvatarImage
								src={user?.image || "/images/user.png"}
								alt={user?.full_name || "User"}
								className="object-cover"
							/>
							<AvatarFallback className="text-4xl bg-white text-gray-700">
								{user?.full_name?.charAt(0)?.toUpperCase() || "U"}
							</AvatarFallback>
						</Avatar>
					</div>

					{/* Name */}
					<h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
						{user?.full_name || "Portfolio"}
					</h1>

					{/* Designation */}
					{user?.designation && (
						<p className="text-2xl md:text-3xl text-white/90 font-medium">
							{user.designation}
						</p>
					)}

					{/* Contact Info */}
					<div className="flex flex-wrap items-center justify-center gap-6 text-white/90">
						{user?.city && (
							<div className="flex items-center gap-2">
								<MapPin className="w-5 h-5" />
								<span className="text-lg">{user.city}</span>
							</div>
						)}
						{user?.email && (
							<a
								href={`mailto:${user.email}`}
								className="flex items-center gap-2 hover:text-white transition-colors">
								<Mail className="w-5 h-5" />
								<span className="text-lg">{user.email}</span>
							</a>
						)}
						{user?.phone && (
							<a
								href={`tel:${user.countryCode || ""}${user.phone}`}
								className="flex items-center gap-2 hover:text-white transition-colors">
								<Phone className="w-5 h-5" />
								<span className="text-lg">
									{user.countryCode}
									{user.phone}
								</span>
							</a>
						)}
					</div>
				</div>
			</div>

			{/* Wave Decoration - visible on md and larger screens only */}
			<div className="absolute bottom-0 left-0 right-0 hidden xl:block">
				<svg
					viewBox="0 0 1440 120"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="w-full h-24">
					<path
						d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
						fill="currentColor"
						className="text-gray-50"
					/>
				</svg>
			</div>
		</div>
	);
};
