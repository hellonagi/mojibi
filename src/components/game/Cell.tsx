import { useContext } from 'react'

import Box from '@mui/material/Box'

import { GameContext } from '../../App'
import { doesWordContainChar } from '../../utils/doesWordContainChar'

interface CellProps {
	char: string
	index: number
}

interface CellContext {
	currentWord: string
	savedGrid: number[]
}

const Cell = ({ char, index }: CellProps) => {
	const { currentWord, savedGrid } = useContext(GameContext) as CellContext

	/**
	 * gray[#3A3A3C] if no matches are found.
	 * red[#AC3E3E] if the character in the cell is contained in the word a player typing.
	 * yellow[#B59F3B] if the character in the cell is contained in the word a player entered.
	 * green[#538D4E] if the character in the cell is a part of the characters that complete a bingo line.
	 */
	let cellColor = '#3A3A3C'
	if (savedGrid[index] === 0) {
		if (doesWordContainChar(currentWord, char)) {
			cellColor = '#AC3E3E'
		}
	} else if (savedGrid[index] === 1) {
		cellColor = '#B59F3B'
	} else if (savedGrid[index] === 2) {
		cellColor = '#538D4E'
	}

	return (
		<Box
			sx={{
				border: 1,
				color: 'white',
				borderColor: cellColor,
				backgroundColor: cellColor,
				fontSize: '1.75rem',
				aspectRatio: '1',
				'&:before': {
					content: `"${char}"`,
					display: 'inline-block',
				},
			}}
			width='100%'
			alignItems='center'
			justifyContent='center'
			display='inline-flex'
			data-testid='cell'
		/>
	)
}

export default Cell
