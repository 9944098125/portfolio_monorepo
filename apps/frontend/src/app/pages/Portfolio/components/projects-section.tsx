import React from "react";
import { FolderKanban, ExternalLink, Github } from "lucide-react";
import { Button } from "app/components/ui/button";
import { Badge } from "app/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "app/components/ui/card";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider,
} from "app/components/ui/tooltip";

interface Project {
	_id?: string;
	name?: string;
	description?: string;
	thumbnail?: string;
	skills?: string[];
	liveDemo?: string;
	githubLink?: string;
}

interface ProjectsSectionProps {
	projects?: Project[];
	theme?: {
		primaryColor?: string;
		secondaryColor?: string;
		boldBg?: string;
		background?: string;
	};
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
	projects,
	theme,
}) => {
	const primaryColor = theme?.primaryColor || "#3b82f6";
	const secondaryColor = theme?.secondaryColor || "#8b5cf6";
	const boldBg = theme?.boldBg || "#ffe4eaff";

	if (!projects || projects.length === 0) return null;

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
					<FolderKanban className="w-6 h-6" style={{ color: primaryColor }} />
				</div>
				<h2
					className="text-3xl md:text-4xl font-dancing font-[800]"
					style={{
						background: `linear-gradient(to right, ${boldBg}, ${primaryColor}, ${secondaryColor})`,
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent",
						backgroundClip: "text",
					}}>
					Featured Projects
				</h2>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{projects.map((project) => (
					<ProjectCard
						key={project._id}
						project={project}
						primaryColor={primaryColor}
						secondaryColor={secondaryColor}
						boldBg={boldBg}
					/>
				))}
			</div>
		</section>
	);
};

interface ProjectCardProps {
	project: Project;
	primaryColor: string;
	secondaryColor: string;
	boldBg: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
	project,
	primaryColor,
	secondaryColor,
	boldBg,
}) => {
	return (
		<Card className="group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col">
			{/* Thumbnail */}
			<div className="relative overflow-hidden h-48 bg-gradient-to-br from-gray-100 to-gray-200">
				{project.thumbnail ? (
					<img
						src={project.thumbnail}
						alt={project.name}
						className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center">
						<FolderKanban className="w-16 h-16 text-gray-400" />
					</div>
				)}
				{/* Overlay on hover */}
				<div
					className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4"
					style={{
						background: `linear-gradient(135deg, ${primaryColor}80, ${secondaryColor}80)`,
					}}>
					{project.liveDemo && (
						<Button
							size="sm"
							variant="secondary"
							asChild
							className="bg-white hover:bg-gray-100 text-black">
							<a
								href={project.liveDemo}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2">
								<ExternalLink className="w-4 h-4" />
								Live Demo
							</a>
						</Button>
					)}
					{project.githubLink && (
						<Button
							size="sm"
							variant="secondary"
							asChild
							className="bg-white hover:bg-gray-100 text-black">
							<a
								href={project.githubLink}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2">
								<Github className="w-4 h-4" />
								Code
							</a>
						</Button>
					)}
				</div>
			</div>

			<CardHeader className="flex-1">
				<CardTitle className="text-xl font-bold line-clamp-1">
					{project.name}
				</CardTitle>
				<CardDescription className="min-h-[60px]">
					{(() => {
						const MAX_DESC_LENGTH = 130;
						const descriptionStr = project.description || "";
						const isTruncatedDesc = descriptionStr.length > MAX_DESC_LENGTH;
						const displayDesc = isTruncatedDesc
							? descriptionStr.substring(0, MAX_DESC_LENGTH).trim()
							: descriptionStr;

						return (
							<>
								{displayDesc}
								{isTruncatedDesc && (
									<TooltipProvider delayDuration={100}>
										<Tooltip>
											<TooltipTrigger asChild>
												{/* Interactive three dots */}
												<span
													className="cursor-help font-bold tracking-widest ml-1 hover:opacity-80 transition-opacity"
													style={{ color: primaryColor }}>
													...
												</span>
											</TooltipTrigger>
											<TooltipContent
												className="max-w-xs md:max-w-sm p-3 z-50 text-sm shadow-xl bg-white border border-gray-200 text-black"
												side="top">
												... {descriptionStr.substring(MAX_DESC_LENGTH).trim()}
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								)}
							</>
						);
					})()}
				</CardDescription>
			</CardHeader>

			{/* Skills Tags */}
			{project.skills && project.skills.length > 0 && (
				<div className="px-6 pb-4">
					<div className="flex flex-wrap gap-2">
						{project.skills?.map((skill, index) => (
							<Badge
								key={index}
								variant="secondary"
								className="text-xs"
								style={{
									backgroundColor: `${primaryColor}15`,
									color: primaryColor,
									borderColor: `${primaryColor}40`,
								}}>
								{skill}
							</Badge>
						))}
						{/* {project.skills.length > 4 && (
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Badge variant="outline" className="text-xs cursor-pointer">
											+{project.skills.length - 4} more
										</Badge>
									</TooltipTrigger>
									<TooltipContent
										className="max-w-xs"
										style={{
											backgroundColor: boldBg,
											color: "white",
										}}>
										<div className="flex flex-wrap gap-2">
											{project.skills.slice(4).map((skill, index) => (
												<Badge
													key={index}
													variant="secondary"
													className="text-xs"
													style={{
														backgroundColor: `${primaryColor}30`,
														color: "white",
														borderColor: `${primaryColor}60`,
													}}>
													{skill}
												</Badge>
											))}
										</div>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						)} */}
					</div>
				</div>
			)}

			<CardFooter className="flex gap-2 pt-0">
				{project.liveDemo && (
					<Button
						variant="outline"
						size="sm"
						asChild
						className="flex-1"
						style={{
							borderColor: primaryColor,
							color: primaryColor,
						}}>
						<a
							href={project.liveDemo}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-center gap-2">
							<ExternalLink className="w-4 h-4" />
							View Demo
						</a>
					</Button>
				)}
				{project.githubLink && (
					<Button
						size="sm"
						asChild
						className="flex-1"
						style={{
							backgroundColor: primaryColor,
							color: "white",
						}}>
						<a
							href={project.githubLink}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-center gap-2">
							<Github className="w-4 h-4" />
							Source
						</a>
					</Button>
				)}
			</CardFooter>
		</Card>
	);
};
