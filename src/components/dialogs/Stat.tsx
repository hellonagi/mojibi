import { useContext } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Link from '@mui/material/Link'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import { mojibiState, mojibiStats, HeaderContext } from '../../App'
import StatBarChart from '../charts/StatBarChart'
import { calcDateDiff } from '../../utils/calcDateDiff'

interface StatContext {
	openStat: boolean
	lines: number
	setOpenStat: React.Dispatch<React.SetStateAction<boolean>>
	setOpenCtC: React.Dispatch<React.SetStateAction<boolean>>
}

const statList = [
	{ name: 'gamesPlayed', label: 'プレイ回数' },
	{ name: 'gamesPlayedStreak', label: '連続プレイ(日)' },
	{ name: 'averageLines', label: '平均ライン' },
	{ name: 'rank', label: 'ランク' },
]

const serviceReleaseDate = new Date('2023/04/01')
const emphasisColor = '#EC7E7E'

const Stat = () => {
	const { openStat, setOpenStat, setOpenCtC } = useContext(HeaderContext) as StatContext

	const handleClose = () => setOpenStat(false)

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault()

		const today = new Date(mojibiState['lastPlayed'])
		const daysSinceRelease = calcDateDiff(serviceReleaseDate, today) + 1
		const title = `Mojibi ${daysSinceRelease} ${mojibiState['completedLines']}/12 lines`

		let shareResult = title.concat('\n\n')
		mojibiState['evaluations'].forEach((val, index) => {
			let cell = '⬛'
			if (val === 1) cell = '🟨'
			if (val === 2) cell = '🟩'
			shareResult += cell
			if (index % 5 === 4 && index != 24) shareResult += '\n'
		})

		navigator.clipboard.writeText(shareResult)
		setOpenCtC(true)
	}

	return (
		<Dialog
			open={openStat}
			onClose={handleClose}
			PaperProps={{
				style: { borderRadius: 12, margin: 8, width: 400 },
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
					maxWidth: 400,
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
						<span style={{ color: emphasisColor }}>{mojibiState['completedLines']}列</span>
						揃いました！
					</Typography>
				)}
				<Divider />
				<Typography my={1} variant='h3' component='h2'>
					統計
				</Typography>
				<Box display='flex' justifyContent='center' my={1}>
					{statList.map((st) => (
						<Box key={st.name} textAlign='center' flex={1}>
							<Typography sx={{ fontSize: 32, lineHeight: 1 }}>
								{mojibiStats[st.name].toString()}
							</Typography>
							<Typography>{st.label}</Typography>
						</Box>
					))}
				</Box>
				<Divider />
				<Typography my={1} variant='h3' component='h2'>
					分布
				</Typography>
				<StatBarChart />
				<Box mb={1} textAlign='center'>
					<Button variant='contained' onClick={handleClick} endIcon={<ShareOutlinedIcon />}>
						シェア
					</Button>
				</Box>
				<Divider />
				<Typography my={1} variant='h3' component='h2'>
					フィードバック
				</Typography>
				<Stack direction='row' spacing={1}>
					<Link
						href='https://github.com/n2dev/mojibi'
						color='inherit'
						target='_blank'
						rel='noopener noreferrer'
					>
						GitHub
					</Link>
					<Link
						href='https://twitter.com/hellonagi_'
						color='inherit'
						target='_blank'
						rel='noopener noreferrer'
					>
						Twitter
					</Link>
				</Stack>
			</DialogContent>
		</Dialog>
	)
}

export default Stat
