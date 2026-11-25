import React from "react";

export const HeroSection = () => {
	return (
		<React.Fragment>
			<div className="bg-[#FFFFFF] rounded-2xl shadow-lg p-4 grid grid-cols-12 gap-2">
				<div className="col-span-12 md:col-span-6">
					<h4 className="text-[2.4rem] md:text-[4.1rem] font-dancing font-[800] bg-gradient-to-r from-teal-600 via-yellow-500 to-pink-600 text-transparent bg-clip-text">
						Build your Own Portfolio
					</h4>
					<p className="text-black font-poppins font-[400] text-[1.2rem]">
						and take control of your personal brand. Showcase your best work
						with style, confidence, and creativity. No coding required — just
						pick a design and start building instantly. Customize every detail
						to match your unique personality.
					</p>
					<div className="my-5"></div>
					<p className="text-black font-poppins font-[400] text-[1.2rem]">
						Add projects, skills, testimonials, and achievements effortlessly.
						Your portfolio is your story — make it unforgettable. Whether you’re
						a developer, designer, or freelancer, we’ve got you covered.
						Responsive, fast, and professional — built to impress everywhere.
						Launch your online presence in minutes, not hours. Start today and
						let your work speak louder than words.
					</p>
				</div>
				<div className="col-span-12 md:col-span-6">
					<div className="relative w-full h-[350px] mx-auto">
						<img
							src="/images/hero-2.png"
							alt="img2"
							className="absolute left-[0%] top-[5%] w-[40%] h-[15rem] rotate-[-5deg] z-[2] rounded-2xl shadow-lg"
						/>
						<img
							src="/images/hero-3.png"
							alt="img3"
							className="absolute left-[10%] top-[10%] w-[40%] h-[15rem] rotate-[0deg] z-[3] rounded-2xl shadow-lg"
						/>
						<img
							src="/images/hero-4.png"
							alt="img4"
							className="absolute left-[20%] top-[15%] w-[40%] h-[15rem] rotate-[10deg] z-[4] rounded-2xl shadow-lg"
						/>
						<img
							src="/images/hero-5.png"
							alt="img5"
							className="absolute left-[30%] top-[20%] w-[40%] h-[15rem] rotate-[15deg] z-[5] rounded-2xl shadow-lg"
						/>
						<img
							src="/images/hero-6.png"
							alt="img6"
							className="absolute left-[40%] top-[25%] w-[40%] h-[15rem] rotate-[20deg] z-[6] rounded-2xl shadow-lg"
						/>
						<img
							src="/images/hero-7.png"
							alt="img6"
							className="absolute left-[50%] top-[25%] w-[40%] h-[15rem] rotate-[30deg] z-[6] rounded-2xl shadow-lg"
						/>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};
