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
	it('should render mini cells', () => {
		setup()
		const words = screen.getAllByTestId('mini-cells')
		expect(words).toHaveLength(8)
	})
})
