import { useContext } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import { HeaderContext } from '../../App'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	backgroundColor: 'background.paper',
	borderRadius: 2,
	border: '1px solid #222',
	boxShadow: 24,
	p: 4,
}

interface HTPContext {
	openHTP: boolean
	setOpenHTP: React.Dispatch<React.SetStateAction<boolean>>
}

const HowToPlay = () => {
	console.log('how to play')
	const { openHTP, setOpenHTP } = useContext(HeaderContext) as HTPContext
	const bingoExample = 'ろつとらっもどむさなまゆほぐぬけょすれにぶひゅーぽ'.split('')
	const bingoState = '1003022222001010000011030'.split('')

	const handleClose = () => setOpenHTP(false)
	return (
		<Modal
			open={openHTP}
			onClose={handleClose}
			aria-labelledby='parent-modal-title'
			aria-describedby='parent-modal-description'
		>
			<Box sx={{ ...style, width: 400 }}>
				<Typography my={1} variant='h2' component='h2' textAlign='center'>
					遊び方
				</Typography>
				<Typography my={1}>8つの単語でなるべく多くの列を完成させよう！</Typography>
				<Typography my={1}>
					単語はMojibiに登録された4文字の名詞でなければなりません。送信するには、Enterボタンを押してください。
				</Typography>
				<Typography my={1}>各単語の入力後、条件によってマス目の色が変わります。</Typography>
				<Divider />
				<Typography my={1} variant='h2' component='h2' textAlign='center'>
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
				<Typography mt={1}>緑: 列が完成したマス</Typography>
				<Typography>黄: 入力した単語が含む文字と一致したマス</Typography>
				<Typography mb={1}>赤: 入力中の単語が含む文字と一致したマス</Typography>
				<Divider />
				<Typography my={1} sx={{ color: '#9e9e9e' }}>
					© 2022 n2dev
				</Typography>
			</Box>
		</Modal>
	)
}

export default HowToPlay
