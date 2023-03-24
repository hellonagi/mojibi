import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import ErrorMsg from './ErrorMsg'
import { GameContext } from '../../App'

const openErrorMsg = true
const setOpenErrorMsg = jest.fn()
const errorMsg = 'スナックバーテスト'

const setup = () => {
	return render(
		<GameContext.Provider value={{ openErrorMsg, setOpenErrorMsg, errorMsg }}>
			<ErrorMsg />
		</GameContext.Provider>
	)
}

describe('renders ErrorMsg component', () => {
	beforeEach(() => {
		setup()
	})

	it('should display snackbar', () => {
		const snackbar = screen.getByTestId('snackbar')
		expect(snackbar).toBeInTheDocument()
		const snackbarMsg = snackbar.textContent
		expect(snackbarMsg).toBe('スナックバーテスト')
	})
})
