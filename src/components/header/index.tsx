import { useContext } from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'

import { HeaderContext } from '../../App'
interface HTPContext {
	setOpenHTP: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = () => {
	const { setOpenHTP } = useContext(HeaderContext) as HTPContext

	const handleHelpClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setOpenHTP(true)
	}

	return (
		<AppBar position='static'>
			<Toolbar sx={{ minHeight: 40, height: 40 }}>
				<Typography variant='h1' component='h1' sx={{ flexGrow: 1 }}>
					Mojibi
				</Typography>
				<Box display='flex'>
					<IconButton color='inherit' onClick={handleHelpClick}>
						<HelpOutlineIcon />
					</IconButton>
					<IconButton color='inherit'>
						<LeaderboardIcon />
					</IconButton>
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default Header
