import { useState, createContext } from 'react'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import { DEFAULT_GRID } from '../../constants/defaultGrid'
import BingoGrid from './BingoGrid'
import Keyboard from './Keyboard'

export const GameContext = createContext({})

const Game = () => {
	const [currentWord, setCurrentWord] = useState<string>('')
	const [enteredWords, setEnteredWords] = useState<string[]>([])
	const [currentGrid, setCurrentGrid] = useState<number[]>(DEFAULT_GRID)
	const [savedGrid, setSavedGrid] = useState<number[]>(DEFAULT_GRID.concat())

	// Prevents the 100vh problem that the viewport is not constant in some mobile browsers
	const documentHeight = () => {
		const doc = document.documentElement
		doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
	}
	window.addEventListener('resize', documentHeight)
	documentHeight()

	return (
		<Container maxWidth='xs' sx={{ px: 1 }}>
			<GameContext.Provider
				value={{
					currentWord,
					setCurrentWord,
					enteredWords,
					setEnteredWords,
					currentGrid,
					setCurrentGrid,
					savedGrid,
					setSavedGrid,
				}}
			>
				<Box display='flex' flexDirection='column' className='container'>
					<BingoGrid />
					<Keyboard />
				</Box>
			</GameContext.Provider>
		</Container>
	)
}

export default Game
