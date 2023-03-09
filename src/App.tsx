import { useEffect, useState, createContext } from 'react'
import './app.css'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import Header from './components/header'
import Game from './components/game'
import HowToPlay from './components/modals/HowToPlay'
import { DEFAULT_GRID } from './constants/defaultGrid'

import { convertUnixToDate } from './utils/convertUnixToDate'

export const GameContext = createContext({})
export const HeaderContext = createContext({})

const unixNow = new Date().getTime()
const defaultMojibiState = {
	wordHistory: [],
	evaluations: DEFAULT_GRID,
	gameStatus: 'IN_PROGRESS',
	lastCompleted: null,
	lastPlayed: unixNow,
}

function App() {
	console.log('app')
	const [currentWord, setCurrentWord] = useState<string>('')
	const [enteredWords, setEnteredWords] = useState<string[]>([])
	const [savedGrid, setSavedGrid] = useState<number[]>(DEFAULT_GRID.concat())
	const [openHTP, setOpenHTP] = useState<boolean>(false)

	useEffect(() => {
		const hasVisited = localStorage.getItem('has_visited')
		const mojibiState = localStorage.getItem('mojibi_state')

		if (hasVisited !== 'true') {
			setOpenHTP(true)
			localStorage.setItem('has_visited', 'true')
		}

		if (mojibiState === null) {
			localStorage.setItem('mojibi_state', JSON.stringify(defaultMojibiState))
		} else {
			const retrievedMojibiState = JSON.parse(mojibiState)
			if (convertUnixToDate(retrievedMojibiState['lastPlayed']) !== convertUnixToDate(unixNow)) {
				retrievedMojibiState['lastPlayed'] = unixNow
				retrievedMojibiState['evaluations'] = DEFAULT_GRID
				retrievedMojibiState['wordHistory'] = []
				localStorage.setItem('mojibi_state', JSON.stringify(retrievedMojibiState))
			} else {
				setSavedGrid(retrievedMojibiState['evaluations'])
				setEnteredWords(retrievedMojibiState['wordHistory'])
			}
		}
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<HeaderContext.Provider
				value={{
					openHTP,
					setOpenHTP,
				}}
			>
				<Header />
				<HowToPlay />
			</HeaderContext.Provider>
			<GameContext.Provider
				value={{
					currentWord,
					setCurrentWord,
					enteredWords,
					setEnteredWords,
					savedGrid,
					setSavedGrid,
				}}
			>
				<Game />
			</GameContext.Provider>
		</ThemeProvider>
	)
}

export default App
