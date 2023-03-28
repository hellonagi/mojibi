import { useContext } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'

import { mojibiState, mojibiStats, HeaderContext } from '../../App'
import StatBarChart from '../charts/StatBarChart'

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

interface StatContext {
	openStat: boolean
	lines: number
	setOpenStat: React.Dispatch<React.SetStateAction<boolean>>
	setOpenCtC: React.Dispatch<React.SetStateAction<boolean>>
}

const statList = [
	{ name: 'gamesPlayed', label: 'プレイ回数' },
	{ name: 'winPercentage', label: '勝率 %' },
	{ name: 'currentWinStreak', label: '現在の連勝数' },
	{ name: 'maxWinStreak', label: '最高連勝数' },
]

const Stat = () => {
	const { openStat, setOpenStat, setOpenCtC } = useContext(HeaderContext) as StatContext

	const handleClose = () => setOpenStat(false)

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault()

		const title = `Mojibi ${mojibiState['completedLines']} lines`

		let shareResult = title.concat('\n\n')
		mojibiState['evaluations'].forEach((val, index) => {
			let cell = '⬛'
			if (val === 1) cell = '🟨'
			if (val === 2) cell = '🟩'
			shareResult += cell
			if (index % 5 === 4) shareResult += '\n'
		})

		navigator.clipboard.writeText(shareResult)
		setOpenCtC(true)
	}

	return (
		<Modal
			open={openStat}
			onClose={handleClose}
			aria-labelledby='parent-modal-title'
			aria-describedby='parent-modal-description'
		>
			<Box sx={{ ...style, width: 400 }}>
				<Typography my={1} variant='h2' component='h2'>
					本日の結果
				</Typography>
				{mojibiState['gameStatus'] == 'IN_PROGRESS' ? (
					<Typography my={1}>ゲームが終了していません</Typography>
				) : (
					<Typography my={1} sx={{ fontSize: 22 }}>
						{mojibiState['completedLines']}列揃いました！
					</Typography>
				)}
				<Divider />
				<Typography my={1} variant='h2' component='h2'>
					統計
				</Typography>
				<Box display='flex' justifyContent='space-between' my={1}>
					{statList.map((st) => (
						<Box key={st.name} textAlign='center'>
							<Typography sx={{ fontSize: 32, lineHeight: 1 }}>
								{mojibiStats[st.name].toString()}
							</Typography>
							<Typography>{st.label}</Typography>
						</Box>
					))}
				</Box>
				<Divider />
				<Typography my={1} variant='h2' component='h2'>
					分布
				</Typography>
				<StatBarChart />
				<Box my={1} textAlign='center'>
					<Button variant='contained' onClick={handleClick} endIcon={<ShareOutlinedIcon />}>
						シェア
					</Button>
				</Box>
			</Box>
		</Modal>
	)
}

export default Stat
