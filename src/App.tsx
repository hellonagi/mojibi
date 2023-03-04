import './app.css'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import Game from './components/game'

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Game />
		</ThemeProvider>
	)
}

export default App
