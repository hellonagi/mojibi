import { useEffect, useState, useContext } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { GameContext } from '../../App'
import { calcLinesAndScore } from '../../utils/calcLinesAndScore'

interface UpperInfoContext {
	savedGrid: number[]
}

const UpperInfo = () => {
	const { savedGrid } = useContext(GameContext) as UpperInfoContext
	const [score, setScore] = useState<number>(0)
	const [lines, setLines] = useState<number>(0)

	useEffect(() => {
		const [_lines, _score] = calcLinesAndScore(savedGrid)
		setLines(_lines)
		setScore(_score)
	}, [savedGrid])

	return (
		<Box display='flex' justifyContent='right' gap={1} my={1}>
			<Box px={1} borderRadius={1} sx={{ backgroundColor: 'gray' }}>
				<Typography>LINES: {lines.toString().padStart(2)}</Typography>
			</Box>
			<Box px={1} borderRadius={1} sx={{ backgroundColor: 'gray' }}>
				<Typography>SCORE: {score.toString().padStart(2)}</Typography>
			</Box>
		</Box>
	)
}

export default UpperInfo
