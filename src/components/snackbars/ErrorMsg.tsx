import { useContext } from 'react'
import Snackbar from '@mui/material/Snackbar'
import { GlobalContext } from '../../providers/GlobalProvider'

const ErrorMsg = () => {
	const { openErrorMsg, setOpenErrorMsg, errorMsg } = useContext(GlobalContext)

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
