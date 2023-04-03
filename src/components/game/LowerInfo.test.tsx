import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LowerInfo from './LowerInfo'
import GameProvider from '../../providers/GameProvider'

jest.mock('./MiniCell', () => {
	const FakeMiniCell = jest.fn(() => null)
	return FakeMiniCell
})

const mockInitialValues = {
	currentWord: 'そーめん',
	enteredWords: ['らーめん', 'やきそば'],
}

const setup = () => {
	return render(
		<GameProvider initialValues={mockInitialValues}>
			<LowerInfo />
		</GameProvider>
	)
}

describe('renders LowerInfo', () => {
	it('should render 8 word boxes', () => {
		setup()
		const wordBoxes = screen.getAllByTestId('word-box')
		expect(wordBoxes).toHaveLength(8)
	})
})
