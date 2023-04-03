import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ErrorMsg from './ErrorMsg'
import GlobalProvider from '../../providers/GlobalProvider'

const mockInitialValues = {
	openErrorMsg: true,
	errorMsg: 'スナックバーテスト',
}

const mockSetters = {
	setOpenErrorMsg: jest.fn(),
}

const setup = () => {
	return render(
		<GlobalProvider initialValues={mockInitialValues} mockSetters={mockSetters}>
			<ErrorMsg />
		</GlobalProvider>
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
