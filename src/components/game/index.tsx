import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import BingoGrid from './BingoGrid'
import Keyboard from './Keyboard'
import GameProvider from '../../providers/GameProvider'

const Game = () => {
	// Prevents the 100vh problem that the viewport is not constant in some mobile browsers
	const documentHeight = () => {
		const doc = document.documentElement
		doc.style.setProperty('--doc-height', `calc(${window.innerHeight}px - 56px)`)
	}
	window.addEventListener('resize', documentHeight)
	documentHeight()

	return (
		<Container maxWidth='xs' sx={{ px: 1 }}>
			<Box className='container' data-testid='index-box'>
				<GameProvider>
					<BingoGrid />
					<Keyboard />
				</GameProvider>
			</Box>
		</Container>
	)
}

export default Game
