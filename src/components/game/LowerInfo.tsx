import { useEffect, useState, useContext } from 'react'

import Box from '@mui/material/Box'

import { GameContext } from '../game'
import MiniCell from './MiniCell'

interface LowerInfoContext {
	currentWord: string
	enteredWords: string[]
}

const LowerInfo = () => {
	const { currentWord, enteredWords } = useContext(GameContext) as LowerInfoContext
	const [history, setHistory] = useState<string[]>([])

	useEffect(() => {
		const tmpHistory = enteredWords.concat()
		tmpHistory.push(currentWord)
		for (let i = 0; i < 8; i++) {
			if (typeof tmpHistory[i] === 'undefined') {
				tmpHistory.push('')
			}
		}
		setHistory(tmpHistory)
	}, [currentWord])

	return (
		<Box
			my={1}
			sx={{
				display: 'grid',
				gridTemplateColumns: 'repeat(4, 1fr)',
				gridTemplateRows: 'repeat(2, 1fr)',
				gap: 0.5,
			}}
		>
			{history.map((word, index) => {
				const rows = []
				let isCurrent = false
				if (enteredWords.length === index){
					isCurrent = true
				}

				for (let i = 0; i < 4; i++) {
					let char = '　'
					let isFilled = false
					if (typeof word[i] !== 'undefined') {
						char = word[i]
						isFilled = true
					}

					rows.push(<MiniCell key={i} char={char} isFilled={isFilled} isCurrent={isCurrent} />)
				}

				return (
					<Box key={index} display='flex'>
						{rows}
					</Box>
				)
			})}
		</Box>
	)
}

export default LowerInfo
