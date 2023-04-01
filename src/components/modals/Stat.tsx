import { useContext } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import { mojibiState, mojibiStats, HeaderContext } from '../../App'
import StatBarChart from '../charts/StatBarChart'

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
		<Dialog
			open={openStat}
			onClose={handleClose}
			PaperProps={{
				style: { borderRadius: 12 },
			}}
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
			>
				<CloseIcon />
			</IconButton>
			<DialogContent
				sx={{
					width: 400,
					boxShadow: 24,
					backgroundColor: 'background.paper',
					p: 4,
				}}
			>
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
			</DialogContent>
		</Dialog>
	)
}

export default Stat
