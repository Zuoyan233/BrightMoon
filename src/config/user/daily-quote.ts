import type { DailyQuoteConfig } from "../../types/config";

export const userDailyQuoteConfig: Partial<DailyQuoteConfig> = {
	mode: "per-refresh", // "per-day" 每天固定一条，"per-refresh" 每次刷新随机一条
	quotes: [
		{
			text: "The only way to do great work is to love what you do.",
			author: "Steve Jobs",
		},
		{
			text: "In the middle of difficulty lies opportunity.",
			author: "Albert Einstein",
		},
		{
			text: "It is during our darkest moments that we must focus to see the light.",
			author: "Aristotle",
		},
		{
			text: "The future belongs to those who believe in the beauty of their dreams.",
			author: "Eleanor Roosevelt",
		},
		{
			text: "Life is what happens when you're busy making other plans.",
			author: "John Lennon",
		},
		{
			text: "The mind is everything. What you think you become.",
			author: "Buddha",
		},
		{
			text: "Strive not to be a success, but rather to be of value.",
			author: "Albert Einstein",
		},
		{
			text: "The best time to plant a tree was 20 years ago. The second best time is now.",
			author: "Chinese Proverb",
		},
	],
};
