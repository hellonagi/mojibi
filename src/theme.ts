import { createTheme } from '@mui/material'
import { grey } from '@mui/material/colors'

const theme = createTheme({
	breakpoints: {
		values: {
			xs: 420,
		},
	},
	typography: {
		h1: {
			fontSize: 26,
			fontWeight: 500,
		},
		h2: {
			fontSize: 20,
			fontWeight: 600,
		},
		caption: {
			fontSize: 10,
		},
		body1: {
			fontSize: 12,
		},
	},
	palette: {
		mode: 'dark',
		neutral: {
			dark: grey[700],
			main: grey[600],
			light: grey[500],
			contrastText: grey[50],
		},
	},
	components: {
		MuiInputBase: {
			styleOverrides: {
				root: {
					color: grey[50],
					fieldset: {
						borderColor: grey[500],
					},
					input: {
						width: 120,
						height: '100%',
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderColor: grey[400],
					},
					'&:hover .MuiOutlinedInput-notchedOutline': {
						borderColor: grey[400],
					},
				},
			},
		},
		MuiSnackbar: {
			styleOverrides: {
				root: {
					top: 32,
					minWidth: 240,
				},
				anchorOriginTopCenter: {
					'@media (min-width: 420px)': {
						left: '50%',
						right: 'auto',
						transform: 'translateX(-50%)',
					},
				},
			},
		},
	},
})

export default theme
