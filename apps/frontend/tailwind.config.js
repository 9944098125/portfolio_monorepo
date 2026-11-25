/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./src/**/*.{ts,tsx}"],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				light: {
					DEFAULT: "hsl(var(--light))",
					foreground: "hsl(var(--light-foreground))",
				},
				chartColor: {
					DEFAULT: "hsl(var(--chart-color))",
					foreground: "hsl(var(--chart-color-foreground))",
				},
			},
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
				dancing: ["Dancing Script", "cursive"],
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
				"snow-fall": {
					"0%": {
						transform: "translateY(-10px) translateX(0)",
						opacity: "0.7",
					},
					"50%": {
						transform: "translateY(50vh) translateX(20px)",
						opacity: "1",
					},
					"100%": {
						transform: "translateY(100vh) translateX(-20px)",
						opacity: "0",
					},
				},
				"circular-glow": {
					"0%": { transform: "translate(0px, 0px)" },
					"25%": { transform: "translate(10px, 0px)" }, // right
					"50%": { transform: "translate(10px, 10px)" }, // bottom-right
					"75%": { transform: "translate(0px, 10px)" }, // bottom
					"100%": { transform: "translate(0px, 0px)" },
				},
				"circular-glow-reverse": {
					"0%": { transform: "translate(0px, 0px)" },
					"25%": { transform: "translate(0px, 10px)" }, // down
					"50%": { transform: "translate(10px, 10px)" }, // bottom-right
					"75%": { transform: "translate(10px, 0px)" }, // right
					"100%": { transform: "translate(0px, 0px)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"snow-fall": "snow-fall var(--fall-duration, 8s) ease-in-out infinite",
				"circular-glow": "circular-glow 2s linear infinite",
				"circular-glow-reverse": "circular-glow-reverse 2s linear infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
