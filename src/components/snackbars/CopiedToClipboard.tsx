import { useContext } from 'react'
import Snackbar from '@mui/material/Snackbar'
import { GlobalContext } from '../../providers/GlobalProvider'

const CopiedToClipboard = () => {
	const { openCtC, setOpenCtC } = useContext(GlobalContext)

	const handleClose = () => {
		setOpenCtC(false)
	}

	return (
		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			open={openCtC}
			autoHideDuration={4000}
			onClose={handleClose}
			message='結果をクリップボードにコピーしました'
			data-testid='snackbar'
		/>
	)
}

export default CopiedToClipboard
