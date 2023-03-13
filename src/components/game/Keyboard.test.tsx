import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'

import theme from '../../theme'
import Keyboard from './Keyboard'
import { GameContext } from '../../App'

const currentWord = ''
const setCurrentWord = jest.fn()
const enteredWords = ['らーめん', 'やきそば']
const setEnteredWords = jest.fn()
const savedGird = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
const setSavedGird = jest.fn()

const setup = () => {
	return render(
		<ThemeProvider theme={theme}>
			<GameContext.Provider
				value={{
					currentWord,
					setCurrentWord,
					enteredWords,
					setEnteredWords,
					savedGird,
					setSavedGird,
				}}
			>
				<Keyboard />
			</GameContext.Provider>
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
		expect(setCurrentWord).toHaveBeenCalledTimes(1)
	})

	it('should render keyboard', () => {
		const keyboard = screen.getByTestId('keyboard')
		const keys = keyboard.getElementsByTagName('button')
		expect(keys).toHaveLength(50)
	})

	it('should press keyboard', () => {
		const key = screen.getByText('あ')
		fireEvent.click(key)
		expect(setCurrentWord).toHaveBeenCalledTimes(1)
	})
})
