import { useContext } from 'react'

import Box from '@mui/material/Box'

import { GameContext } from '../../App'
import { bingoCharacters } from './BingoGrid'

interface MiniCellProps {
	char: string
	state: string
}

interface MiniCellContext {
	savedGrid: number[]
}

const MiniCell = ({ char, state }: MiniCellProps) => {
	const { savedGrid } = useContext(GameContext) as MiniCellContext
	let cellColor = 'unset'
	let borderColor = '#3A3A3C'

	const ind = bingoCharacters.indexOf(char)

	if (state === 'current') {
		borderColor = '#AC3E3E'
	}
	if (state === 'filled') {
		if (typeof savedGrid[ind] === 'undefined') {
			cellColor = '#3A3A3C'
			borderColor = '#3A3A3C'
		}
		if (savedGrid[ind] === 1) {
			cellColor = '#B59F3B'
			borderColor = '#B59F3B'
		}
		if (savedGrid[ind] === 2) {
			cellColor = '#538D4E'
			borderColor = '#538D4E'
		}
	}

	return (
		<Box
			sx={{
				border: 1,
				color: 'white',
				backgroundColor: cellColor,
				borderColor: borderColor,
				fontSize: '0.75rem',
				'&:before': {
					content: `"${char}"`,
					display: 'inline-block',
				},
			}}
			ml={0.25}
			width='25%'
			alignItems='center'
			justifyContent='center'
			display='flex'
		/>
	)
}

export default MiniCell
