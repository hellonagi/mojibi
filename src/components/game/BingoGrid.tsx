import Box from '@mui/material/Box'

import { getBingoChars } from '../../utils/getBingoChars'
import { convertUnixToDate } from '../../utils/convertUnixToDate'
import Cell from './Cell'
import LowerInfo from './LowerInfo'

// Random 25 characters in Bingo Grid
export const bingoCharacters: string[] = getBingoChars(
	parseInt(convertUnixToDate(new Date().getTime()), 10)
)

const Bingo = () => {
	return (
		<Box mt={1} flexGrow={1} display='flex' justifyContent='center' alignItems='center'>
			<Box>
				<Box
					minWidth={320}
					display='grid'
					gridTemplateColumns='repeat(5, 1fr)'
					gridTemplateRows='repeat(5, 1fr)'
					gap={0.75}
					data-testid='cells'
				>
					{bingoCharacters.map((char, index) => {
						return <Cell char={char} index={index} key={char} />
					})}
				</Box>
				<LowerInfo />
			</Box>
		</Box>
	)
}

export default Bingo
