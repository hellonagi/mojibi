import { DEFAULT_GRID } from './defaultGrid'
interface MojibiStateType {
	wordHistory: string[]
	evaluations: number[]
	gameStatus: string
	completedLines: number
	lastCompleted: number | null
	lastPlayed: number
}
export const DEFAULT_MOJIBI_STATE: MojibiStateType = {
	wordHistory: [],
	evaluations: DEFAULT_GRID,
	gameStatus: 'IN_PROGRESS',
	completedLines: 0,
	lastCompleted: null,
	lastPlayed: new Date().getTime(),
}

interface MojibiStatsType {
	[key: string]: number | string | Record<string, number>
	gamesPlayed: number
	gamesPlayedStreak: number
	gamesWon: number
	winPercentage: number
	maxWinStreak: number
	currentWinStreak: number
	averageLines: number
	rank: string
	lines: Record<string, number>
}
export const DEFAULT_MOJIBI_STATS: MojibiStatsType = {
	gamesPlayed: 0,
	gamesPlayedStreak: 0,
	gamesWon: 0,
	winPercentage: 0,
	maxWinStreak: 0,
	currentWinStreak: 0,
	averageLines: 0,
	rank: '-',
	lines: {
		0: 0,
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
		6: 0,
		7: 0,
		8: 0,
		9: 0,
		10: 0,
		12: 0,
	},
}
