import { useLayoutEffect, useState, createContext } from 'react'
import './app.css'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import Header from './components/header'
import Game from './components/game'
import HowToPlay from './components/modals/HowToPlay'

export const HeaderContext = createContext({})

function App() {
	const [openHTP, setOpenHTP] = useState<boolean>(false)

	useLayoutEffect(() => {
		const hasVisited = localStorage.getItem('has_visited')

		if (hasVisited !== 'true') {
			setOpenHTP(true)
			localStorage.setItem('has_visited', 'true')
		}
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<HeaderContext.Provider
				value={{
					openHTP,
					setOpenHTP,
				}}
			>
				<Header />
				<HowToPlay />
			</HeaderContext.Provider>
			<Game />
		</ThemeProvider>
	)
}

export default App
