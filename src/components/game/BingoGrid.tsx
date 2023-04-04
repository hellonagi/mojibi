import React, { useContext, useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'

import { GameContext } from '../../providers/GameProvider'
import { getBingoChars } from '../../utils/getBingoChars'
import { convertUnixToDate } from '../../utils/convertUnixToDate'
import Cell from './Cell'
import LowerInfo from './LowerInfo'

// Random 25 characters in Bingo Grid
export const bingoCharacters: string[] = getBingoChars(
	parseInt(convertUnixToDate(new Date().getTime()), 10)
)

const Bingo = () => {
	const { isAnimating, setIsAnimating, animIndices, setAnimIndices } = useContext(GameContext)
	const [triggerEvent, setTriggerEvent] = useState(false)
	const isFirstRender = useRef(false)

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}
		if (isAnimating) {
			setTriggerEvent(true)
			if (animIndices.length === 0) {
				setIsAnimating(false)
				setTriggerEvent(false)
			}
		}
	}, [isAnimating])

	const onEventComplete = () => {
		setAnimIndices([])
		setTriggerEvent(false)
		setIsAnimating(false)
	}

	return (
		<Box height='calc(100% - 260px)' display='flex'>
			<Box maxWidth={320} maxHeight='100%' sx={{ aspectRatio: '0.8' }} margin='auto'>
				<Box
					display='flex'
					flexWrap='wrap'
					gap={0.75}
					data-testid='cells'
					mt={1}
					mx='auto'
					sx={{ aspectRatio: '1' }}
				>
					{bingoCharacters.map((char, index) => {
						return (
							<Cell
								char={char}
								index={index}
								key={char}
								triggerEvent={triggerEvent && animIndices.includes(index)}
								onEventComplete={onEventComplete}
							/>
						)
					})}
				</Box>
				<LowerInfo />
			</Box>
		</Box>
	)
}

export default Bingo
