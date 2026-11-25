import { Button } from "app/components/ui/button";
import { DeleteIcon, EditIcon, TrashIcon } from "lucide-react";
import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import { ConfirmationDialog } from "./confirmation-dialog";
import { Icons } from "app/components/ui/icons";
import { ISkill } from "types/modules";

interface SkillItemProps {
	name?: string;
	level?: string | number | null; // accept numbers too
	idx: number;
	skillItem: Partial<ISkill>;
	setOpen: Dispatch<
		SetStateAction<{ bool: boolean; skillId: string | undefined }>
	>;
	deleteSkillLoading: boolean;
	setShowConfirm: (val: boolean) => void;
	setSkillId: any;
}

const SkillItem: React.FC<SkillItemProps> = ({
	name = "React",
	level = "beginner",
	idx = 0,
	skillItem = {},
	setOpen,
	deleteSkillLoading,
	setShowConfirm,
	setSkillId,
}) => {
	const levelMap: Record<string, number> = {
		beginner: 1,
		intermediate: 2,
		expert: 3,
	};

	// Normalize level safely
	const normalizeLevel = (v: string | number | null | undefined): number => {
		if (v === null || v === undefined) return 0;

		if (typeof v === "number" && !isNaN(v)) return v;

		const s = String(v).trim().toLowerCase();

		if (levelMap[s] !== undefined) return levelMap[s];

		const parsed = Number(s);
		return !isNaN(parsed) ? parsed : 0;
	};

	const numericLevel = normalizeLevel(level);
	const filledLevels = Math.min(Math.max(Math.round(numericLevel), 0), 3); // only 3 bars

	// 3-color vibrant gradients
	const gradientSets = [
		["#ff0080", "#ff8c00", "#1a1a1a"], // pink → orange → dark
		["#00eaff", "#00ff6a", "#002b36"], // cyan → neon green → deep teal
		["#7c3aed", "#c084fc", "#1e1b4b"], // purple → lilac → deep indigo
		["#facc15", "#fb923c", "#4d1d0f"], // yellow → orange → deep brown
		["#06b6d4", "#3b82f6", "#0f172a"], // cyan → blue → slate black
		["#ef4444", "#f472b6", "#450a0a"], // red → pink → dark maroon
		["#22c55e", "#86efac", "#064e3b"], // green → light green → deep emerald
	];

	const [gradient, setGradient] = useState(gradientSets[0]);

	useEffect(() => {
		const interval = setInterval(() => {
			const random =
				gradientSets[Math.floor(Math.random() * gradientSets.length)];
			setGradient(random);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div
			className={`border w-[18rem] min-h-[20rem] border-gray-300 m-4 p-4 rounded-full flex flex-col items-center justify-center space-y-1 ${
				idx % 2 === 1
					? "animate-circular-glow"
					: "animate-circular-glow-reverse"
			}`}>
			{/* Arrow container */}
			<div className="relative w-[15rem] flex items-center">
				{/* Arrow body */}
				<div
					className="text-white font-semibold py-10 pl-6 pr-16 rounded-l-lg flex items-center justify-center w-full relative overflow-visible transition-all duration-700"
					style={{
						background: `linear-gradient(to right, ${gradient[0]}, ${gradient[1]}, ${gradient[2]})`,
					}}>
					<h4 className="text-[2rem] font-[700] font-dancing">{name}</h4>

					{/* Arrow tip */}
					<div
						className="absolute top-0 right-[-40px] h-full w-10 [clip-path:polygon(0_0,100%_50%,0_100%)] transition-all duration-700"
						style={{
							background: `linear-gradient(to right, ${gradient[0]}, ${gradient[1]}, ${gradient[2]})`,
						}}></div>
				</div>
			</div>

			{/* Skill level indicators */}
			<div className="flex space-x-1">
				{[...Array(3)].map((_, i) => (
					<div
						key={i}
						className="h-2 w-12 rounded-sm transition-all duration-700"
						style={{
							background:
								i < filledLevels
									? `linear-gradient(to right, ${gradient[0]}, ${gradient[1]}, ${gradient[2]})`
									: "#d1d5db",
						}}></div>
				))}
			</div>

			{/* ⬇️ Action Buttons (absolute positioned) */}
			<div className="absolute bottom-4 -left-2">
				<Button
					onClick={() => setOpen({ bool: true, skillId: skillItem?._id })}
					variant="primary"
					className="text-white h-[25px] w-[25px] rounded-full p-6"
					type="button">
					<EditIcon className="h-15 w-15" />
				</Button>
			</div>

			<div className="absolute bottom-4 -right-2">
				<Button
					onClick={() => {
						setSkillId(skillItem?._id);
						setShowConfirm(true);
					}}
					variant="destructive"
					className="text-white h-[25px] w-[25px] rounded-full p-6"
					type="button">
					{deleteSkillLoading ? (
						<Icons.Spinner className="animate-spin h-10 w-10" />
					) : (
						<TrashIcon className="h-15 w-15" />
					)}
				</Button>
			</div>
		</div>
	);
};

export default SkillItem;
