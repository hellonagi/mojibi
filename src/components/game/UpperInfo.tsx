import { useEffect, useState, useContext } from 'react'

import Box from '@mui/material/Box'

import { GameContext } from '../game'
import { calcLinesAndScore } from '../../utils/calcLinesAndScore'

interface UpperInfoContext {
	savedGrid: number[]
}

const UpperInfo = () => {
	const { savedGrid } = useContext(GameContext) as UpperInfoContext
	const [score, setScore] = useState<number>(0)
	const [lines, setLines] = useState<number>(0)

	useEffect(() => {
		console.log('ayy')
		const [_lines, _score] = calcLinesAndScore(savedGrid)
		setLines(_lines)
		setScore(_score)
	}, [savedGrid])

	return (
		<Box display='flex' justifyContent='right' gap={2}>
			<div>LINES: {lines}</div>
			<div>SCORE: {score}</div>
		</Box>
	)
}

export default UpperInfo
