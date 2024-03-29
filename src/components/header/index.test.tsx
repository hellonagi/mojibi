import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from './index'
import GlobalProvider from '../../providers/GlobalProvider'

const mockSetters = {
	setOpenStat: jest.fn(),
	setOpenHTP: jest.fn(),
}

const setup = () => {
	return render(
		<GlobalProvider mockSetters={mockSetters}>
			<Header />
		</GlobalProvider>
	)
}

describe('renders Header component', () => {
	beforeEach(() => {
		setup()
	})

	it('should render correct title', () => {
		const titleElement = screen.getByRole('heading', { level: 1, name: /Mojibi/i })
		expect(titleElement).toBeInTheDocument()
	})

	describe('when help icon clicked', () => {
		it('should call how-to-play modal', () => {
			const helpIcon = screen.getByRole('button', { name: /open how-to-play/i })
			fireEvent.click(helpIcon)
			expect(mockSetters.setOpenHTP).toHaveBeenCalledTimes(1)
		})
	})
})
