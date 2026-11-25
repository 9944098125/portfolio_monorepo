/**
 *
 * Portfolio
 *
 */
import React, { memo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PortfolioSkeleton } from "./components/portfolio-skeleton";
import { HeroSection } from "./components/hero-section";
import { AboutSection } from "./components/about-section";
import { SkillsSection } from "./components/skills-section";
import { ProjectsSection } from "./components/projects-section";
import { EducationSection } from "./components/education-section";
import { ContactsSection } from "./components/contacts-section";
import { toast } from "app/components/ui/use-toast";
import { useSlice } from "./slice";

interface Props {}

export const Portfolio = memo((props: Props) => {
	const { userId } = useParams<{ userId: string }>();
	const { useLazyGetPortfolioQuery } = useSlice();
	
	const [getUser, { data, isLoading, isError, error }] = useLazyGetPortfolioQuery();

	useEffect(() => {
		if (userId) {
			getUser({ userId });
		}
	}, [userId]);

	useEffect(() => {
		if (isError || error) {
			toast({
				title: "Error",
				variant: "destructive",
				description: (error as string) || "Failed to load portfolio",
			});
		}
	}, [isError, error]);

	if (isLoading) {
		return <PortfolioSkeleton />;
	}

	const userData = data?.data;
	const theme = userData?.selectedTheme;

	// Apply theme colors to the page
	const backgroundColor = theme?.background || "#ffffff";
	const primaryColor = theme?.primaryColor || "#3b82f6";
	const secondaryColor = theme?.secondaryColor || "#8b5cf6";

	return (
		<div
			className="min-h-screen"
			style={{
				backgroundColor: backgroundColor,
			}}>
			{/* Hero Section */}
			<HeroSection user={userData} theme={theme} />

			{/* Main Content Container */}
			<div className="container mx-auto px-4 -mt-16 space-y-12 pb-12 relative z-10">
				{/* About Section */}
				<AboutSection about={userData?.about} theme={theme} />

				{/* Skills Section */}
				<SkillsSection skills={userData?.skills} theme={theme} />

				{/* Projects Section */}
				<ProjectsSection projects={userData?.projects} theme={theme} />

				{/* Education Section */}
				<EducationSection
					educationalDetails={userData?.educationalDetails}
					theme={theme}
				/>

				{/* Contacts Section */}
				<ContactsSection contacts={userData?.contacts} theme={theme} />
			</div>

			{/* Footer */}
			<footer
				className="mt-20 py-8 text-center border-t"
				style={{
					borderColor: `${primaryColor}20`,
					color: `${primaryColor}80`,
				}}>
				<p className="text-sm">
					© {new Date().getFullYear()} {userData?.full_name || "Portfolio"}. All
					rights reserved.
				</p>
			</footer>
		</div>
	);
});
