import { useEffect, useState, createContext } from 'react'
import './app.css'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import Header from './components/header'
import Game from './components/game'
import HowToPlay from './components/dialogs/HowToPlay'
import Stat from './components/dialogs/Stat'
import ErrorMsg from './components/snackbars/ErrorMsg'
import CopiedToClipboard from './components/snackbars/CopiedToClipboard'
import { DEFAULT_GRID } from './constants/defaultGrid'
import { DEFAULT_MOJIBI_STATE, DEFAULT_MOJIBI_STATS } from './constants/localStorage'

import { calcDateDiff } from './utils/calcDateDiff'
import { getLocalStorage } from './utils/getLocalStorage'

export const GameContext = createContext({})
export const HeaderContext = createContext({})

const now = new Date()
const hasVisited = localStorage.getItem('has_visited')

// eslint-disable-next-line prefer-const
export let mojibiState = getLocalStorage('mojibi_state', DEFAULT_MOJIBI_STATE)
// eslint-disable-next-line prefer-const
export let mojibiStats = getLocalStorage('mojibi_stats', DEFAULT_MOJIBI_STATS)

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

		const daysSinceLastPlayed = calcDateDiff(new Date(mojibiState['lastPlayed']), now)

		if (daysSinceLastPlayed >= 1) {
			localStorage.setItem(
				'mojibi_state',
				JSON.stringify({
					...mojibiState,
					evaluations: DEFAULT_GRID,
					gameStatus: 'IN_PROGRESS',
					wordHistory: [],
					lastPlayed: now.getTime(),
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
					setAnimIndices,
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
