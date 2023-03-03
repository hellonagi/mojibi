import { useState, createContext } from 'react'

import Container from '@mui/material/Container'

import { DEFAULT_GRID } from '../../constants/defaultGrid'
import UpperInfo from './UpperInfo'
import BingoGrid from './BingoGrid'
import Keyboard from './Keyboard'

export const GameContext = createContext({})

const Game = () => {
	const [currentWord, setCurrentWord] = useState<string>('')
	const [enteredWords, setEnteredWords] = useState<string[]>([])
	const [currentGrid, setCurrentGrid] = useState<number[]>(DEFAULT_GRID)
	const [savedGrid, setSavedGrid] = useState<number[]>(DEFAULT_GRID.concat())

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
				<UpperInfo />
				<BingoGrid />
				<Keyboard />
			</GameContext.Provider>
		</Container>
	)
}

export default Game
