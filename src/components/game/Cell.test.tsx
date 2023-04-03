import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Cell from './Cell'
import GameProvider from '../../providers/GameProvider'
import { mojibiState } from '../../App'

const mockInitialValues = {
	currentWord: 'らーめん',
	savedGrid: [0, 1, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
}

const setup = (char: string, index: number, trigger = false, onEventComplete = () => undefined) => {
	mojibiState['evaluations'] = mockInitialValues.savedGrid

	return render(
		<GameProvider initialValues={mockInitialValues}>
			<Cell char={char} index={index} triggerEvent={trigger} onEventComplete={onEventComplete} />
		</GameProvider>
	)
}

describe('renders Cell', () => {
	console.log('=== Starting test for CELL ===')
	it('should render gray cell when no matches found', () => {
		setup('あ', 0)
		const cell = screen.getByTestId('cell')
		expect(cell).toHaveStyle({
			backgroundColor: '#3A3A3C',
		})
	})

	it('should render red cell when current word contained in Bingo Grid', () => {
		setup('ら', 0)
		const cell = screen.getByTestId('cell')
		expect(cell).toHaveStyle({
			backgroundColor: '#AC3E3E',
		})
	})

	it('should render yellow cell', () => {
		setup('あ', 1)
		const cell = screen.getByTestId('cell')
		expect(cell).toHaveStyle({
			backgroundColor: '#B59F3B',
		})
	})

	it('should render green cell', () => {
		setup('あ', 5)
		const cell = screen.getByTestId('cell')
		expect(cell).toHaveStyle({
			backgroundColor: '#538D4E',
		})
	})
})
