import { useEffect, useContext } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import { GameContext } from '../game'
import { getBingoLetters } from '../../utils/getBingoLetters'
import { checkForMatchedLetters } from '../../utils/checkForMatchedLetters'
import { checkForBingoLines } from '../../utils/checkForBingoLines'
import Cell from './Cell'
import UpperInfo from './UpperInfo'

// Random 25 letters in Bingo Grid
const bingoLetters: string[] = getBingoLetters()

interface BingoContext {
	enteredWords: string[]
	savedGrid: number[]
	setSavedGrid: React.Dispatch<React.SetStateAction<number[]>>
}

const Bingo = () => {
	const { enteredWords, savedGrid, setSavedGrid } = useContext(GameContext) as BingoContext

	/**
	 * Triggers when a player enters a word.
	 * Changes elements of savedGrid to 1 or 2 according to the following situations.
	 *
	 * 1 if a letter in Bingo Grid matches a letter in entered words
	 * 2 if a letter in Bingo Grid is on Bingo Line
	 */
	useEffect(() => {
		if (enteredWords.length === 0) return

		const lastWord = enteredWords[enteredWords.length - 1]
		const tmpSavedGrid = savedGrid.concat()

		// Changes elements of savedGird to 1 if their corresponding letters match the letters in the last word.
		const gridWithMatchedLetters = checkForMatchedLetters(lastWord, tmpSavedGrid, bingoLetters)

		// Changes elements of savedGrid to 2 if their corresponding letters complete a row, column, or diagonal.
		const gridWithBingoLines = checkForBingoLines(gridWithMatchedLetters)

		setSavedGrid(gridWithBingoLines)
	}, [enteredWords])

	return (
		<Box minWidth={300} maxWidth={340} marginLeft='auto' marginRight='auto'>
			<UpperInfo />
			<Grid container justifyContent='center' gap={1}>
				{bingoLetters.map((letter, index) => {
					return <Cell letter={letter} index={index} key={letter} />
				})}
			</Grid>
		</Box>
	)
}

export default Bingo
