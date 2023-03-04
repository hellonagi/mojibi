import { useEffect, useState, useContext } from 'react'

import Box from '@mui/material/Box'

import { GameContext } from '../game'
import { bingoLetters } from './BingoGrid'

interface MiniCellProps {
	char: string
	isFilled: boolean
	isCurrent: boolean
}

interface MiniCellContext {
	savedGrid: number[]
}

const MiniCell = ({ char, isFilled, isCurrent }: MiniCellProps) => {
	const { savedGrid } = useContext(GameContext) as MiniCellContext
	const [cellColor, setCellColor] = useState<string>('unset')
	const [borderColor, setBorderColor] = useState<string>('#3A3A3C')

	useEffect(() => {
		const ind = bingoLetters.indexOf(char)

		if (isCurrent) {
			setBorderColor('#AC3E3E')
		}
		if (!isFilled) return
		if (typeof savedGrid[ind] === 'undefined') {
			setCellColor('#3A3A3C')
			setBorderColor('#3A3A3C')
		}
		if (savedGrid[ind] === 1) {
			setCellColor('#B59F3B')
			setBorderColor('#B59F3B')
		}
		if (savedGrid[ind] === 2) {
			setCellColor('#538D4E')
			setBorderColor('#538D4E')
		}
	}, [savedGrid])

	return (
		<Box
			sx={{
				border: 1,
				color: 'white',
				backgroundColor: cellColor,
				borderColor: borderColor,
				fontSize: '0.75rem',
			}}
			ml={0.25}
			width='25%'
			alignItems='center'
			justifyContent='center'
			display='flex'
		>
			{char}
		</Box>
	)
}

export default MiniCell
