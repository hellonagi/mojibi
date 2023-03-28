import { useContext } from 'react'
import Snackbar from '@mui/material/Snackbar'
import { GameContext } from '../../App'

interface CtCContext {
	openCtC: boolean
	setOpenCtC: React.Dispatch<React.SetStateAction<boolean>>
}

const CopiedToClipboard = () => {
	const { openCtC, setOpenCtC } = useContext(GameContext) as CtCContext

	const handleClose = () => {
		setOpenCtC(false)
	}

	return (
		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			open={openCtC}
			autoHideDuration={4000}
			onClose={handleClose}
			message="結果をクリップボードにコピーしました"
			data-testid='snackbar'
		/>
	)
}

export default CopiedToClipboard