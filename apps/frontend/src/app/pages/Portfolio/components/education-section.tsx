import React from "react";
import { GraduationCap, Calendar, Briefcase } from "lucide-react";
import { Badge } from "app/components/ui/badge";

interface EducationDetail {
	_id?: string;
	name_of_education?: string;
	start_year?: string;
	passout_year?: string;
	is_education?: boolean;
}

interface EducationSectionProps {
	educationalDetails?: EducationDetail[];
	theme?: {
		primaryColor?: string;
		secondaryColor?: string;
		boldBg?: string;
		background?: string;
	};
}

const formatDate = (dateString?: string) => {
	if (!dateString) return "Present";
	try {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
		});
	} catch {
		return dateString;
	}
};

export const EducationSection: React.FC<EducationSectionProps> = ({
	educationalDetails,
	theme,
}) => {
	const primaryColor = theme?.primaryColor || "#3b82f6";
	const secondaryColor = theme?.secondaryColor || "#8b5cf6";
	const boldBg = theme?.boldBg || "#1e293b";

	if (!educationalDetails || educationalDetails.length === 0) return null;

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
					<GraduationCap className="w-6 h-6" style={{ color: primaryColor }} />
				</div>
				<h2
					className="text-3xl md:text-4xl font-dancing font-[800]"
					style={{
						background: `linear-gradient(to right, ${boldBg}, ${primaryColor}, ${secondaryColor})`,
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent",
						backgroundClip: "text",
					}}>
					Education & Experience
				</h2>
			</div>

			<div className="relative">
				{/* Timeline Line */}
				<div
					className="absolute left-8 top-0 bottom-0 w-0.5 hidden md:block"
					style={{ backgroundColor: `${primaryColor}30` }}
				/>

				<div className="space-y-8">
					{educationalDetails.map((education, index) => {
						const isEducation =
							education.is_education !== undefined
								? education.is_education
								: true;
						const IconComponent = isEducation ? GraduationCap : Briefcase;

						return (
							<div key={education._id} className="relative flex gap-6">
								{/* Timeline Dot */}
								<div className="relative z-10 flex-shrink-0">
									<div
										className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
										style={{
											backgroundColor:
												index % 2 === 0 ? primaryColor : secondaryColor,
										}}>
										<IconComponent className="w-8 h-8 text-white" />
									</div>
								</div>

								{/* Content Card */}
								<div className="flex-1 bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
									<h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
										{education.name_of_education}
									</h3>
									<div className="flex flex-wrap items-center gap-4 text-gray-600">
										<div className="flex items-center gap-2">
											<Calendar className="w-4 h-4" />
											<span className="text-sm">
												{formatDate(education.start_year)} -{" "}
												{formatDate(education.passout_year)}
											</span>
										</div>
									</div>
									{!education.passout_year && (
										<Badge
											variant="secondary"
											className="mt-3"
											style={{
												backgroundColor: `${primaryColor}20`,
												color: primaryColor,
											}}>
											Current
										</Badge>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};
