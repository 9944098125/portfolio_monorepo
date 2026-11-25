import React from "react";
import { Code, TrendingUp } from "lucide-react";

interface Skill {
	_id?: string;
	name?: string;
	level?: string[];
	logo?: string;
}

interface SkillsSectionProps {
	skills?: Skill[];
	theme?: {
		primaryColor?: string;
		secondaryColor?: string;
		boldBg?: string;
		background?: string;
	};
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, theme }) => {
	const primaryColor = theme?.primaryColor || "#3b82f6";
	const secondaryColor = theme?.secondaryColor || "#8b5cf6";
	const boldBg = theme?.boldBg || "#1e293b";

	if (!skills || skills.length === 0) return null;

	// Group skills by level
	const expertSkills = skills.filter(
		(skill) => skill.level?.[0]?.toLowerCase() === "expert"
	);
	const intermediateSkills = skills.filter(
		(skill) => skill.level?.[0]?.toLowerCase() === "intermediate"
	);
	const beginnerSkills = skills.filter(
		(skill) => skill.level?.[0]?.toLowerCase() === "beginner"
	);

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
					<Code
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
					Skills & Technologies
				</h2>
			</div>

			<div className="space-y-8">
				{/* Expert Skills */}
				{expertSkills.length > 0 && (
					<div>
						<div className="flex items-center gap-2 mb-4">
							<TrendingUp className="w-5 h-5" style={{ color: primaryColor }} />
							<h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
								Expert Level
							</h3>
						</div>
						<div className="flex flex-wrap gap-3">
							{expertSkills.map((skill) => (
								<SkillBadge
									key={skill._id}
									skill={skill}
									color={primaryColor}
								/>
							))}
						</div>
					</div>
				)}

				{/* Intermediate Skills */}
				{intermediateSkills.length > 0 && (
					<div>
						<div className="flex items-center gap-2 mb-4">
							<TrendingUp
								className="w-5 h-5"
								style={{ color: secondaryColor }}
							/>
							<h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
								Intermediate Level
							</h3>
						</div>
						<div className="flex flex-wrap gap-3">
							{intermediateSkills.map((skill) => (
								<SkillBadge
									key={skill._id}
									skill={skill}
									color={secondaryColor}
								/>
							))}
						</div>
					</div>
				)}

				{/* Beginner Skills */}
				{beginnerSkills.length > 0 && (
					<div>
						<div className="flex items-center gap-2 mb-4">
							<TrendingUp className="w-5 h-5 text-gray-500" />
							<h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
								Beginner Level
							</h3>
						</div>
						<div className="flex flex-wrap gap-3">
							{beginnerSkills.map((skill) => (
								<SkillBadge
									key={skill._id}
									skill={skill}
									color="#9ca3af"
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

interface SkillBadgeProps {
	skill: Skill;
	color: string;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, color }) => {
	return (
		<div
			className="group relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
			style={{
				backgroundColor: `${color}15`,
				border: `2px solid ${color}40`,
			}}>
			{skill.logo && (
				<img
					src={skill.logo}
					alt={skill.name}
					className="w-8 h-8 object-contain rounded-full"
				/>
			)}
			<span
				className="font-medium"
				style={{ color: color }}>
				{skill.name}
			</span>
		</div>
	);
};

