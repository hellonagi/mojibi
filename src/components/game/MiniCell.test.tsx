import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import MiniCell from './MiniCell'
import { GameContext } from '../../App'

jest.mock('./BingoGrid', () => ({
	bingoCharacters: [
		'あ',
		'い',
		'う',
		'え',
		'お',
		'か',
		'き',
		'く',
		'け',
		'こ',
		'さ',
		'し',
		'す',
		'せ',
		'そ',
		'た',
		'ち',
		'つ',
		'て',
		'と',
		'ぁ',
		'ぃ',
		'ぅ',
		'ぇ',
		'ぉ',
	],
}))

const savedGrid = [0, 1, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

const setup = (char: string, state: 'empty' | 'current' | 'filled') => {
	return render(
		<GameContext.Provider value={{ savedGrid }}>
			<MiniCell char={char} state={state} />
		</GameContext.Provider>
	)
}

describe('renders MiniCell', () => {
	it('should render empty cell', () => {
		setup('あ', 'empty')
		const content = screen.getByTestId('mini-cell')
		expect(content).toHaveStyle({
			backgroundColor: 'unset',
			borderColor: '#3A3A3C',
		})
	})

	it('should render red-bordered cell', () => {
		setup('あ', 'current')
		const content = screen.getByTestId('mini-cell')
		expect(content).toHaveStyle({
			backgroundColor: 'unset',
			borderColor: '#AC3E3E',
		})
	})

	it('should render gray cell when no matches found', () => {
		setup('あ', 'filled')
		const content = screen.getByTestId('mini-cell')
		expect(content).toHaveStyle({
			backgroundColor: '#3A3A3C',
			borderColor: '#3A3A3C',
		})
	})

	it('should render yellow cell when it matches', () => {
		setup('い', 'filled')
		const content = screen.getByTestId('mini-cell')
		expect(content).toHaveStyle({
			backgroundColor: '#B59F3B',
			borderColor: '#B59F3B',
		})
	})

	it('should render red cell when it is in a bingo line', () => {
		setup('か', 'filled')
		const content = screen.getByTestId('mini-cell')
		expect(content).toHaveStyle({
			backgroundColor: '#538D4E',
			borderColor: '#538D4E',
		})
	})
})
