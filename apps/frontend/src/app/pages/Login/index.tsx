/**
 *
 * Login
 *
 */
import React, { memo } from "react";
import { LoginForm } from "./components/form";

export const Login = memo(() => {
	return (
		<div className="relative min-h-[calc(100%-3.8rem)] flex items-center justify-center">
			{/* ❄️ Snow / particle effect for desktop */}
			<div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none z-0">
				{[...Array(2000)].map((_, i) => (
					<span
						key={i}
						className="absolute bg-teal-300 rounded-full opacity-30 animate-snow-fall"
						style={{
							width: `${Math.random() * 6 + 2}px`,
							height: `${Math.random() * 6 + 2}px`,
							top: `${Math.random() * 100}%`,
							left: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 5}s`,
							animationDuration: `${5 + Math.random() * 10}s`,
						}}></span>
				))}
			</div>

			{/* Center login card */}
			<div className="z-10 w-full max-w-md rounded-2xl">
				<LoginForm />
			</div>
		</div>
	);
});
