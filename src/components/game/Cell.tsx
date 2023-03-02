import { useEffect, useState, useContext } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import { GameContext } from '../game'
import { doesWordContainLetter } from '../../utils/doesWordContainLetter'

interface CellProps {
	letter: string
	index: number
}

interface CellContext {
	currentWord: string
	currentGrid: number[]
	setCurrentGrid: React.Dispatch<React.SetStateAction<number[]>>
	savedGrid: number[]
}

const Cell = ({ letter, index }: CellProps) => {
	const [cellColor, setCellColor] = useState<string>('gray')

	const { currentWord, currentGrid, setCurrentGrid, savedGrid } = useContext(
		GameContext
	) as CellContext
	
	/**
	 * Triggers when a player types a word, or complete a bing line.
	 * Changes the color of cells.
	 * 
	 * gray[#3A3A3C] if no matches are found.
	 * red[#AC3E3E] if the letter in the cell is contained in the word a player typing. 
	 * yellow[#B59F3B] if the letter in the cell is contained in the word a player entered.
	 * green[#538D4E] if the letter in the cell is a part of the letters that complete a bingo line.
	 */
	useEffect(() => {
		const tmpGrid = currentGrid.concat()
		if (savedGrid[index] === 0) {
			if (doesWordContainLetter(currentWord, letter)) {
				tmpGrid[index] = 1
				setCellColor('#AC3E3E')
			} else {
				tmpGrid[index] = 0
				setCellColor('#3A3A3C')
			}
			setCurrentGrid(tmpGrid)
		} else if (savedGrid[index] === 1) {
			setCellColor('#B59F3B')
		} else if (savedGrid[index] === 2) {
			setCellColor('#538D4E')
		}
	}, [currentWord, savedGrid])

	return (
		<Grid item flexBasis='18%'>
			<Box
				sx={{
					border: 1,
					color: 'white',
					borderColor: cellColor,
					backgroundColor: cellColor,
					fontSize: '1.75rem',
					aspectRatio: '1',
				}}
				alignItems='center'
				justifyContent='center'
				display='flex'
			>
				{letter}
			</Box>
		</Grid>
	)
}

export default Cell
