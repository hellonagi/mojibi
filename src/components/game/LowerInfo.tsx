import { useContext } from 'react'

import Box from '@mui/material/Box'

import { GameContext } from '../../App'
import MiniCell from './MiniCell'

interface LowerInfoContext {
	currentWord: string
	enteredWords: string[]
}

const LowerInfo = () => {
	const { currentWord, enteredWords } = useContext(GameContext) as LowerInfoContext

	const tmpHistory = [...enteredWords]
	if (tmpHistory.length < 8) {
		tmpHistory.push(currentWord)
	}
	for (let i = 0; i < 8; i++) {
		if (typeof tmpHistory[i] === 'undefined') {
			tmpHistory.push('')
		}
	}

	console.log('lower info')

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
			{tmpHistory.map((word, index) => {
				const rows = []
				let state = 'empty'
				if (enteredWords.length === index) {
					state = 'current'
				} else if (enteredWords.length > index) {
					state = 'filled'
				}

				for (let i = 0; i < 4; i++) {
					let char = '　'
					if (typeof word[i] !== 'undefined') {
						char = word[i]
					}

					rows.push(<MiniCell key={i} char={char} state={state} />)
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
