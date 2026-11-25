import { Button } from "app/components/ui/button";
import React, { useState } from "react";

interface Emoji {
	id: string;
	name: string;
	src: string;
}

const EMOJIS: Emoji[] = [
	{
		id: "1f600",
		name: "Grinning Face",
		src: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f600.png",
	},
	{
		id: "1f603",
		name: "Smiling Face",
		src: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f603.png",
	},
	{
		id: "1f604",
		name: "Grinning Face With Smiling Eyes",
		src: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f604.png",
	},
	{
		id: "1f601",
		name: "Beaming Face With Smiling Eyes",
		src: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f601.png",
	},
	{
		id: "1f602",
		name: "Face With Tears of Joy",
		src: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f602.png",
	},
	{
		id: "1f605",
		name: "Smiling Face With Cold Sweat",
		src: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f605.png",
	},
	{
		id: "1f606",
		name: "Laughing Face",
		src: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f606.png",
	},
	{
		id: "1f609",
		name: "Winking Face",
		src: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f609.png",
	},
	{
		id: "1f60d",
		name: "Heart Eyes",
		src: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f60d.png",
	},
	{
		id: "1f62d",
		name: "Loudly Crying Face",
		src: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f62d.png",
	},
	{
		id: "1f621",
		name: "Pouting Face",
		src: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f621.png",
	},
	{
		id: "1f631",
		name: "Screaming in Fear",
		src: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f631.png",
	},
];

type GameStatus = "playing" | "win" | "lose";

function shuffleEmojis(list: Emoji[]): Emoji[] {
	const arr = [...list];
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

const EmojiMemoryGame: React.FC = () => {
	const [clickedIds, setClickedIds] = useState<string[]>([]);
	const [status, setStatus] = useState<GameStatus>("playing");
	const [clickCount, setClickCount] = useState<number>(0);
	const [shuffledEmojis, setShuffledEmojis] = useState<Emoji[]>(() =>
		shuffleEmojis(EMOJIS)
	);

	const handleEmojiClick = (id: string) => {
		if (status !== "playing") return;

		setClickCount((prev) => prev + 1);

		// already clicked -> lose
		if (clickedIds.includes(id)) {
			setStatus("lose");
			// still reshuffle to keep it chaotic
			setShuffledEmojis((prev) => shuffleEmojis(prev));
			return;
		}

		const updated = [...clickedIds, id];
		setClickedIds(updated);

		if (updated.length === EMOJIS.length) {
			// all 12 unique -> win
			setStatus("win");
			setShuffledEmojis((prev) => shuffleEmojis(prev));
		} else {
			// keep playing, reshuffle for next round
			setShuffledEmojis((prev) => shuffleEmojis(prev));
		}
	};

	const handleReset = () => {
		setClickedIds([]);
		setStatus("playing");
		setClickCount(0);
		setShuffledEmojis(shuffleEmojis(EMOJIS));
	};

	return (
		<React.Fragment>
			<div className="flex flex-col items-center justify-center">
				<h1 style={{ fontSize: "32px", marginBottom: "4px" }}>
					Emoji Memory Game
				</h1>
				<p
					style={{
						marginBottom: "16px",
						textAlign: "center",
						maxWidth: "600px",
					}}>
					Click emojis one by one. You must click all <strong>12</strong> emojis
					exactly once. If you click any emoji more than once, you{" "}
					<strong>lose</strong>. The emojis shuffle after every click, so stay
					sharp. 😈
				</p>
				<div className="w-full md:w-1/2 grid grid-cols-12 gap-5 px-7 md:px-0">
					{shuffledEmojis.map((emoji) => (
						<Button
							variant="emoji"
							key={emoji.id}
							onClick={() => handleEmojiClick(emoji.id)}
							className="col-span-4 my-2 h-[5rem] w-[5rem] md:h-[7rem] md:w-[7rem] p-5 flex items-center justify-center">
							<img
								src={emoji.src}
								alt={emoji.name}
								draggable={false}
								className="h-full w-full"
							/>
						</Button>
					))}
				</div>

				<div
					style={{
						marginTop: "18px",
						display: "flex",
						gap: "16px",
						alignItems: "center",
					}}>
					<span>Clicks: {clickCount}</span>
					<span>
						Unique: {clickedIds.length} / {EMOJIS.length}
					</span>
				</div>

				{status !== "playing" && (
					<div
						style={{
							marginTop: "24px",
							padding: "20px 28px",
							borderRadius: "18px",
							background: status === "win" ? "#14532d" : "#7f1d1d",
							color: "white",
							boxShadow: "0 18px 40px rgba(0,0,0,0.6)",
							textAlign: "center",
						}}>
						{status === "win" ? (
							<>
								<h2 style={{ fontSize: "24px", marginBottom: "8px" }}>
									You Win! 🏆
								</h2>
								<p style={{ marginBottom: "12px" }}>
									You actually managed all {EMOJIS.length} without repeating.
									Respect.
								</p>
							</>
						) : (
							<>
								<h2 style={{ fontSize: "24px", marginBottom: "8px" }}>
									You Lost 😵
								</h2>
								<p style={{ marginBottom: "12px" }}>
									You clicked an emoji that was already clicked. Shuffle brain
									and try again.
								</p>
							</>
						)}
						<Button
							variant="destructive"
							onClick={handleReset}
							className="text-white px-6 py-2"
							style={{
								marginTop: "4px",
								padding: "8px 18px",
								borderRadius: "999px",
								border: "none",
								background: "#e5e7eb",
								color: "#020617",
								fontWeight: 600,
								cursor: "pointer",
							}}>
							Play Again
						</Button>
					</div>
				)}
			</div>
		</React.Fragment>
	);
};

export default EmojiMemoryGame;
