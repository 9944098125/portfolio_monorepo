import React from "react";
import { Link2 } from "lucide-react";

interface Contact {
	_id?: string;
	medium?: string;
	logo?: string;
}

interface ContactsSectionProps {
	contacts?: Contact[];
	theme?: {
		primaryColor?: string;
		secondaryColor?: string;
		boldBg?: string;
		background?: string;
	};
}

export const ContactsSection: React.FC<ContactsSectionProps> = ({
	contacts,
	theme,
}) => {
	const primaryColor = theme?.primaryColor || "#3b82f6";
	const secondaryColor = theme?.secondaryColor || "#8b5cf6";
	const boldBg = theme?.boldBg || "#1e293b";

	if (!contacts || contacts.length === 0) return null;

	return (
		<section 
			className="rounded-2xl shadow-xl p-8 md:p-12 border"
			style={{
				backgroundColor: theme?.background || "#ffffff",
				borderColor: theme?.primaryColor || "#e5e7eb",
				borderWidth: "1px",
			}}>
			<div className="flex items-center gap-3 mb-8">
				<div
					className="p-3 rounded-lg"
					style={{ backgroundColor: `${primaryColor}20` }}>
					<Link2
						className="w-6 h-6"
						style={{ color: primaryColor }}
					/>
				</div>
				<h2
					className="text-3xl md:text-4xl font-dancing font-[800]"
					style={{
						background: `linear-gradient(to right, ${boldBg}, ${primaryColor}, ${secondaryColor})`,
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						backgroundClip: 'text',
					}}>
					Connect With Me
				</h2>
			</div>

			<div className="flex flex-wrap items-center justify-center gap-6">
				{contacts.map((contact) => {
					const isEmail = contact.medium?.includes("@");
					const href = isEmail
						? `mailto:${contact.medium}`
						: contact.medium;

					return (
						<a
							key={contact._id}
							href={href}
							target={!isEmail ? "_blank" : undefined}
							rel={!isEmail ? "noopener noreferrer" : undefined}
							className="group relative flex flex-col items-center gap-3 p-6 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-xl"
							style={{
								backgroundColor: `${primaryColor}10`,
								border: `2px solid ${primaryColor}30`,
							}}>
							{/* Logo */}
							<div className="relative">
								<div
									className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"
									style={{
										background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
									}}
								/>
								{contact.logo ? (
									<img
										src={contact.logo}
										alt="Contact"
										className="w-16 h-16 object-contain relative z-10"
									/>
								) : (
									<div
										className="w-16 h-16 rounded-full flex items-center justify-center relative z-10"
										style={{ backgroundColor: primaryColor }}>
										<Link2 className="w-8 h-8 text-white" />
									</div>
								)}
							</div>

							{/* Medium/Label */}
							{/* <span
								className="text-sm font-medium text-center max-w-[150px] truncate"
								style={{ color: primaryColor }}>
								{contact.medium || "Contact"}
							</span> */}

							{/* Hover Effect */}
							<div
								className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
								style={{
									background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
								}}
							/>
						</a>
					);
				})}
			</div>
		</section>
	);
};

