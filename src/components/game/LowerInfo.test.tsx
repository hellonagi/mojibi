import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LowerInfo from './LowerInfo'
import { GameContext } from '../../App'

jest.mock('./MiniCell', () => {
	const FakeMiniCell = jest.fn(() => null)
	return FakeMiniCell
})

const currentWord = 'そーめん'
const enteredWords = ['らーめん', 'やきそば']

const setup = () => {
	return render(
		<GameContext.Provider value={{ currentWord, enteredWords }}>
			<LowerInfo />
		</GameContext.Provider>
	)
}

describe('renders LowerInfo', () => {
	it('should render 8 word boxes', () => {
		setup()
		const wordBoxes = screen.getAllByTestId('word-box')
		expect(wordBoxes).toHaveLength(8)
	})
})
