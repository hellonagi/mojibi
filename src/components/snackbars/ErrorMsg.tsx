import { useContext } from 'react'
import Snackbar from '@mui/material/Snackbar'
import { GameContext } from '../../App'

interface ErrorMsgContext {
	openErrorMsg: boolean
	setOpenErrorMsg: React.Dispatch<React.SetStateAction<boolean>>
	errorMsg: string
}

const ErrorMsg = () => {
	const { openErrorMsg, setOpenErrorMsg, errorMsg } = useContext(GameContext) as ErrorMsgContext

	const handleClose = () => {
		setOpenErrorMsg(false)
	}

	return (
		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			open={openErrorMsg}
			autoHideDuration={4000}
			onClose={handleClose}
			message={errorMsg}
			data-testid='snackbar'
		/>
	)
}

export default ErrorMsg
