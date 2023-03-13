import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BingoGrid from './BingoGrid'

jest.mock('./LowerInfo', () => {
	const FakeLowerInfo = jest.fn(() => null)
	return FakeLowerInfo
})

jest.mock('./Cell', () => {
	const FakeCell = jest.fn(() => null)
	return FakeCell
})

const setup = () => {
	return render(<BingoGrid />)
}

describe('renders Bingo Grid', () => {
	it('should render cells', () => {
		setup()
		const cells = screen.getByTestId('cells')
		expect(cells).toBeInTheDocument()
	})
})
