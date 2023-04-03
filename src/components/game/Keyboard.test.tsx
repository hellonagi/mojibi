import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'

import theme from '../../theme'
import Keyboard from './Keyboard'
import GameProvider from '../../providers/GameProvider'

const mockInitialValues = {
	currentWord: '',
	enteredWords: ['らーめん', 'やきそば'],
	savedGird: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
}

const mockSetters = {
	setCurrentWord: jest.fn(),
	setEnteredWords: jest.fn(),
	setSavedGird: jest.fn(),
}

const setup = () => {
	return render(
		<ThemeProvider theme={theme}>
			<GameProvider initialValues={mockInitialValues} mockSetters={mockSetters}>
				<Keyboard />
			</GameProvider>
		</ThemeProvider>
	)
}

describe('renders Keyboard', () => {
	beforeEach(() => {
		setup()
	})

	it('should render keyboard form', () => {
		const textForm = screen.getByTestId('key-form')
		expect(textForm).toBeInTheDocument()
	})

	it('should render input', () => {
		const textInput = screen.getByTestId('key-input')
		expect(textInput).toBeInTheDocument()
		fireEvent.change(textInput, { target: { value: 'そーめん' } })
		expect(mockSetters.setCurrentWord).toHaveBeenCalledTimes(1)
	})

	it('should render keyboard', () => {
		const keyboard = screen.getByTestId('keyboard')
		const keys = keyboard.getElementsByTagName('button')
		expect(keys).toHaveLength(50)
	})

	it('should press keyboard', () => {
		const key = screen.getByText('あ')
		fireEvent.click(key)
		expect(mockSetters.setCurrentWord).toHaveBeenCalledTimes(1)
	})
})
