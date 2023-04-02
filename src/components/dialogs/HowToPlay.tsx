import { useContext } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import { HeaderContext } from '../../App'

interface HTPContext {
	openHTP: boolean
	setOpenHTP: React.Dispatch<React.SetStateAction<boolean>>
}

const HowToPlay = () => {
	const { openHTP, setOpenHTP } = useContext(HeaderContext) as HTPContext
	const bingoExample = 'ろつとらっもどむさなまゆほぐぬけょすれにぶひゅーぽ'.split('')
	const bingoState = '1003022222001010000011030'.split('')
	const emphasisColor = '#EC7E7E'

	const handleClose = () => setOpenHTP(false)

	return (
		<Dialog
			open={openHTP}
			onClose={handleClose}
			PaperProps={{
				style: { borderRadius: 12, margin: 8, width: 400 },
			}}
			data-testid='how-to-play-dialog'
		>
			<IconButton
				aria-label='close'
				onClick={handleClose}
				sx={{
					position: 'absolute',
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500],
				}}
				data-testid='how-to-play-dialog-close-button'
			>
				<CloseIcon />
			</IconButton>
			<DialogContent
				sx={{
					maxWidth: 400,
					boxShadow: 24,
					backgroundColor: 'background.paper',
					p: 4,
				}}
			>
				<Typography variant='h2' component='h2'>
					遊び方
				</Typography>
				<Typography mb={1} fontSize={14} fontWeight={600}>
					8つの単語で多くの列を完成させよう！
				</Typography>
				<Typography lineHeight={1.5}>
					<span style={{ color: emphasisColor }}>4文字</span>の単語を
					<span style={{ color: emphasisColor }}>ひらがな</span>で入力してください。
				</Typography>
				<Typography lineHeight={1.5} mb={1}>
					各単語の入力後、条件によってマス目の色が変わります。
				</Typography>
				<Divider />
				<Typography my={1} variant='h3' component='h2'>
					例
				</Typography>
				<Box
					display='grid'
					gridTemplateColumns='repeat(5, 32px)'
					gridTemplateRows='repeat(5, 32px)'
					gap={0.75}
				>
					{bingoExample.map((c, i) => {
						const state = bingoState[i]
						let cellColor = '#3A3A3C'
						if (state === '1') {
							cellColor = '#B59F3B'
						} else if (state === '2') {
							cellColor = '#538D4E'
						} else if (state === '3') {
							cellColor = '#AC3E3E'
						}

						return (
							<Box
								display='inline-flex'
								justifyContent='center'
								alignItems='center'
								sx={{
									backgroundColor: cellColor,
									width: 32,
									aspectRatio: '1',
									'&:before': {
										content: `"${c}"`,
										display: 'inline-block',
									},
								}}
								key={c}
							/>
						)
					})}
				</Box>
				<Box
					display='inline-block'
					width={100}
					p={0.5}
					mt={1}
					border='1px solid #9e9e9e'
					borderRadius={1}
				>
					<Typography>らーめん</Typography>
				</Box>
				<Typography mt={1}>🟩: 列が完成したマス</Typography>
				<Typography>🟨: 入力した文字を含むマス</Typography>
				<Typography mb={1}>🟥: 入力中の文字を含むマス</Typography>
				<Divider />
				<Typography my={1} sx={{ color: '#9e9e9e' }}>
					© 2023 n2dev
				</Typography>
			</DialogContent>
		</Dialog>
	)
}

export default HowToPlay
