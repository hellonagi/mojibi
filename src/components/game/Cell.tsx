import { useContext, useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import { motion, useAnimation } from 'framer-motion'
import { GameContext } from '../../App'
import { doesWordContainChar } from '../../utils/doesWordContainChar'

interface CellProps {
	char: string
	index: number
	triggerEvent: boolean
	onEventComplete: () => void
}

interface CellContext {
	currentWord: string
	savedGrid: number[]
	openErrorMsg: boolean
	isAnimating: boolean
	setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>
	animIndices: number[]
}

const Cell = ({ char, index, triggerEvent, onEventComplete }: CellProps) => {
	const { currentWord, savedGrid, openErrorMsg } = useContext(GameContext) as CellContext
	const [prevWordLength, setPrevWordLength] = useState<number>(0)
	const animationControls = useAnimation()

	useEffect(() => {
		const tmpFilteredWord = currentWord.replace(/[^\u3040-\u309Fー]/g, '')

		if (tmpFilteredWord.slice(-1) === char && tmpFilteredWord.length > prevWordLength) {
			animationControls.start({
				scale: [1.25, 1],
				transition: { duration: 0.125 },
			})
		}
		setPrevWordLength(tmpFilteredWord.length)
	}, [currentWord])

	useEffect(() => {
		if (triggerEvent) {
			animationControls.start({
				rotateY: [0, 360],
				transition: {
					duration: 0.25,
					ease: 'easeInOut',
				},
			})
			onEventComplete()
		}
	}, [triggerEvent])

	useEffect(() => {
		if (openErrorMsg) {
			animationControls.start({
				x: [1.25, -1.25, 1, -1, 0.5, -0.5],
				transition: { duration: 0.2 },
			})
		}
	}, [openErrorMsg])

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
		<motion.div animate={animationControls}>
			<Box
				sx={{
					border: 1,
					color: 'white',
					borderColor: cellColor,
					backgroundColor: cellColor,
					fontSize: '1.75rem',
					fontWeight: 600,
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
		</motion.div>
	)
}

export default Cell
