import { useContext } from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'

import { GlobalContext } from '../../providers/GlobalProvider'

const Header = () => {
	const { setOpenHTP, setOpenStat } = useContext(GlobalContext)

	const handleHelpClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setOpenStat(false)
		setOpenHTP(true)
	}

	const handleStatClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setOpenHTP(false)
		setOpenStat(true)
	}

	return (
		<AppBar position='static'>
			<Toolbar sx={{ minHeight: 40, height: 40 }}>
				<Typography variant='h1' component='h1' sx={{ flexGrow: 1 }}>
					Mojibi
				</Typography>
				<Box display='flex'>
					<IconButton aria-label='open how-to-play' color='inherit' onClick={handleHelpClick}>
						<HelpOutlineIcon />
					</IconButton>
					<IconButton aria-label='open statistics' color='inherit' onClick={handleStatClick}>
						<LeaderboardIcon />
					</IconButton>
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default Header
