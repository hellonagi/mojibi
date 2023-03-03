import '@mui/material/styles'
declare module '@mui/material/styles' {
	interface BreakpointOverrides {
		xs: true
		sm: false
		md: false
		lg: false
		xl: false
	}
}
