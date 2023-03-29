import { useEffect, useState, createContext } from 'react'
import './app.css'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import Header from './components/header'
import Game from './components/game'
import HowToPlay from './components/modals/HowToPlay'
import Stat from './components/modals/Stat'
import ErrorMsg from './components/snackbars/ErrorMsg'
import CopiedToClipboard from './components/snackbars/CopiedToClipboard'
import { DEFAULT_GRID } from './constants/defaultGrid'
import { DEFAULT_MOJIBI_STATE, DEFAULT_MOJIBI_STATS } from './constants/localStorage'

import { convertUnixToDate } from './utils/convertUnixToDate'

export const GameContext = createContext({})
export const HeaderContext = createContext({})

const unixNow = new Date().getTime()
const hasVisited = localStorage.getItem('has_visited')

// Initiate Local Storage
const stringifiedMojibiState = localStorage.getItem('mojibi_state')
let mojibiState = DEFAULT_MOJIBI_STATE
if (stringifiedMojibiState) {
	mojibiState = JSON.parse(stringifiedMojibiState)
} else {
	localStorage.setItem('mojibi_state', JSON.stringify(DEFAULT_MOJIBI_STATE))
}

const stringifiedMojibiStats = localStorage.getItem('mojibi_stats')
let mojibiStats = DEFAULT_MOJIBI_STATS
if (stringifiedMojibiStats) {
	mojibiStats = JSON.parse(stringifiedMojibiStats)
} else {
	localStorage.setItem('mojibi_stats', JSON.stringify(DEFAULT_MOJIBI_STATS))
}

export { mojibiState, mojibiStats }

function App() {
	const [currentWord, setCurrentWord] = useState<string>('')
	const [enteredWords, setEnteredWords] = useState<string[]>([])
	const [savedGrid, setSavedGrid] = useState<number[]>(DEFAULT_GRID.concat())
	const [openHTP, setOpenHTP] = useState<boolean>(false)
	const [openStat, setOpenStat] = useState<boolean>(false)
	const [openErrorMsg, setOpenErrorMsg] = useState<boolean>(false)
	const [errorMsg, setErrorMsg] = useState<string>('')
	const [openCtC, setOpenCtC] = useState<boolean>(false)
	const [isAnimating, setIsAnimating] = useState<boolean>(false)
	const [animIndices, setAnimIndices] = useState<number[]>([])

	useEffect(() => {
		if (hasVisited !== 'true') {
			setOpenHTP(true)
			localStorage.setItem('has_visited', 'true')
		}

		if (convertUnixToDate(mojibiState['lastPlayed']) !== convertUnixToDate(unixNow)) {
			localStorage.setItem(
				'mojibi_state',
				JSON.stringify({
					...mojibiState,
					evaluations: DEFAULT_GRID,
					gameStatus: 'IN_PROGRESS',
					wordHistory: [],
					lastPlayed: unixNow,
				})
			)
		} else {
			setSavedGrid(mojibiState['evaluations'])
			setEnteredWords(mojibiState['wordHistory'])
		}
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<HeaderContext.Provider
				value={{
					openHTP,
					setOpenHTP,
					openStat,
					setOpenStat,
					setOpenCtC,
				}}
			>
				<Header />
				<HowToPlay />
				<Stat />
			</HeaderContext.Provider>
			<GameContext.Provider
				value={{
					currentWord,
					setCurrentWord,
					enteredWords,
					setEnteredWords,
					savedGrid,
					setSavedGrid,
					openErrorMsg,
					setOpenErrorMsg,
					errorMsg,
					setErrorMsg,
					openCtC,
					setOpenCtC,
					setOpenStat,
					isAnimating,
					setIsAnimating,
					animIndices,
					setAnimIndices
				}}
			>
				<Game />
				<ErrorMsg />
				<CopiedToClipboard />
			</GameContext.Provider>
		</ThemeProvider>
	)
}

export default App
