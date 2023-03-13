import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

const setup = () => {
	return render(<App />)
}

describe('renders App component', () => {
	beforeEach(() => {
		setup()
	})

	it('should display how-to-play modal and close it', () => {
		const h2Element = screen.getByRole('heading', { level: 2, name: /遊び方/i })
		expect(h2Element).toBeInTheDocument()

		const how2Modal = screen.getByRole('presentation')
		const bd = how2Modal.getElementsByClassName('MuiBackdrop-root')
		fireEvent.click(bd[0])

		const titleElement = screen.getByRole('heading', { level: 1, name: /Mojibi/i })
		expect(titleElement).toBeInTheDocument()
	})
})
