import React from "react";
import { User } from "lucide-react";

interface AboutSectionProps {
	about?: string;
	theme?: {
		primaryColor?: string;
		secondaryColor?: string;
		boldBg?: string;
		background?: string;
	};
}

export const AboutSection: React.FC<AboutSectionProps> = ({ about, theme }) => {
	const primaryColor = theme?.primaryColor || "#3b82f6";
	const secondaryColor = theme?.secondaryColor || "#8b5cf6";
	const boldBg = theme?.boldBg || "#1e293b";

	if (!about) return null;

	return (
		<section
			className="rounded-2xl shadow-xl p-8 md:p-12 border mt-6 md:mt-6"
			style={{
				backgroundColor: theme?.background || "#ffffff",
				borderColor: theme?.primaryColor || "#3b82f6",
				borderWidth: "1px",
			}}>
			<div className="flex items-center gap-3 mb-6">
				<div
					className="p-3 rounded-lg"
					style={{ backgroundColor: `${primaryColor}20` }}>
					<User className="w-6 h-6" style={{ color: primaryColor }} />
				</div>
				<h2
					className="text-3xl md:text-4xl font-dancing font-[800]"
					style={{
						background: `linear-gradient(to right, ${boldBg}, ${primaryColor}, ${secondaryColor})`,
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent",
						backgroundClip: "text",
					}}>
					About Me
				</h2>
			</div>
			<div className="prose prose-lg max-w-none">
				<p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
					{about}
				</p>
			</div>
		</section>
	);
};
