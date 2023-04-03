import { useContext } from 'react'

import Box from '@mui/material/Box'

import { GameContext } from '../../providers/GameProvider'
import { bingoCharacters } from './BingoGrid'

interface MiniCellProps {
	char: string
	state: string
}

const MiniCell = ({ char, state }: MiniCellProps) => {
	const { savedGrid } = useContext(GameContext)
	let cellColor = 'unset'
	let borderColor = '#3A3A3C'

	const ind = bingoCharacters.indexOf(char)

	if (state === 'current') {
		borderColor = '#AC3E3E'
	}
	if (state === 'filled') {
		if (savedGrid[ind] === 1) {
			cellColor = '#B59F3B'
			borderColor = '#B59F3B'
		} else if (savedGrid[ind] === 2) {
			cellColor = '#538D4E'
			borderColor = '#538D4E'
		} else {
			cellColor = '#3A3A3C'
			borderColor = '#3A3A3C'
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
			data-testid='mini-cell'
		/>
	)
}

export default MiniCell
