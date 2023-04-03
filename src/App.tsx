import './app.css'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import GlobalProvider from './providers/GlobalProvider'
import theme from './theme'
import Header from './components/header'
import Game from './components/game'
import HowToPlay from './components/dialogs/HowToPlay'
import Stat from './components/dialogs/Stat'
import ErrorMsg from './components/snackbars/ErrorMsg'
import CopiedToClipboard from './components/snackbars/CopiedToClipboard'
import { DEFAULT_MOJIBI_STATE, DEFAULT_MOJIBI_STATS } from './constants/localStorage'
import { getLocalStorage } from './utils/getLocalStorage'

// eslint-disable-next-line prefer-const
export let mojibiState = getLocalStorage('mojibi_state', DEFAULT_MOJIBI_STATE)
// eslint-disable-next-line prefer-const
export let mojibiStats = getLocalStorage('mojibi_stats', DEFAULT_MOJIBI_STATS)

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<GlobalProvider>
				<Header />
				<HowToPlay />
				<Stat />
				<Game />
				<ErrorMsg />
				<CopiedToClipboard />
			</GlobalProvider>
		</ThemeProvider>
	)
}

export default App
