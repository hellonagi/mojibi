import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Game from './index'

jest.mock('./BingoGrid', () => {
	const FakeBingoGrid = jest.fn(() => null)
	return FakeBingoGrid
})

jest.mock('./Keyboard', () => {
	const FakeKeyboard = jest.fn(() => null)
	return FakeKeyboard
})

const setup = () => {
	return render(<Game />)
}

describe('renders Game', () => {
	it('should render game container', () => {
		setup()
		const indexBox = screen.getByTestId('index-box')
		expect(indexBox).toBeInTheDocument()
	})
})
