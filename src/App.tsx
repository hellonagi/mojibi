import 'sanitize.css'
import './app.css'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'

import Game from './components/game'

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Game />
		</ThemeProvider>
	)
}

export default App
