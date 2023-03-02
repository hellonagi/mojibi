import { useState, createContext } from 'react'

import Container from '@mui/material/Container'

import { defaultGrid } from '../../constants/defaultGrid'
import UpperInfo from './UpperInfo'
import BingoGrid from './BingoGrid'
import Keyboard from './Keyboard'

export const GameContext = createContext({})

const Game = () => {
	const [currentWord, setCurrentWord] = useState<string>('')
	const [enteredWords, setEnteredWords] = useState<string[]>([])
	const [currentGrid, setCurrentGrid] = useState<number[]>(defaultGrid)
	const [savedGrid, setSavedGrid] = useState<number[]>(defaultGrid.concat())

	return (
		<Container maxWidth='xs'>
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
