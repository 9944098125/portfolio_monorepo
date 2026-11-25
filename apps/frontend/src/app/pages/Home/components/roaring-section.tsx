import { useEffect } from "react";

export default function RoaringSection() {
	useEffect(() => {
		// Load Tenor script for the embedded GIF
		const script = document.createElement("script");
		script.src = "https://tenor.com/embed.js";
		script.async = true;
		document.body.appendChild(script);
	}, []);

	return (
		<section className="flex flex-col md:flex-row items-center justify-between px-4 md:px-10 py-16 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white overflow-hidden rounded-2xl shadow-lg">
			{/* Left: Lion Roar GIF */}
			<div
				className="tenor-container w-full md:w-1/2 flex justify-center"
				dangerouslySetInnerHTML={{
					__html: `<div class="tenor-gif-embed" data-postid="13248741687081638874" data-share-method="host" data-aspect-ratio="0.560241" data-width="100%"><a href="https://tenor.com/view/for-sure-gif-13248741687081638874">For Sure GIF</a>from <a href="https://tenor.com/search/for+sure-gifs">For Sure GIFs</a></div>`,
				}}></div>

			{/* Right: Content */}
			<div className="w-full md:w-1/2 mt-10 md:mt-0 text-center md:text-left">
				<h2 className="text-[2.4rem] md:text-[4.1rem] font-extrabold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-transparent bg-clip-text mb-6 font-dancing">
					Let Your Portfolio Roar
				</h2>
				<p className="text-[1.2rem] text-gray-300 leading-relaxed max-w-lg">
					Just like a lion’s roar commands attention, your portfolio should do
					the same. Every project, every pixel, every idea — speak with
					confidence and power. Showcase your creativity so boldly that it
					echoes through the digital jungle.
				</p>
				<p className="mt-6 text-[2.4rem] text-gray-400 font-dancing">
					💥 Strength. Vision. Presence. That’s the essence of a true portfolio.
				</p>
			</div>
		</section>
	);
}
