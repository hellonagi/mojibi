import '@testing-library/jest-dom'
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

jest.mock('./utils/getBingoChars', () => ({
	getBingoChars: () => 'あいうえおかきくけこさしすせそたちつてとなにぬねの'.split(''),
}))

const setup = () => {
	return render(<App />)
}

describe('App component', () => {
	beforeEach(() => {
		setup()
	})

	describe('Header', () => {
		it('should display how-to-play dialog and close it', async () => {
			const h2Element = screen.getByRole('heading', { level: 2, name: /遊び方/i })
			expect(h2Element).toBeInTheDocument()

			const how2DialogCloseButton = screen.getByTestId('how-to-play-dialog-close-button')
			userEvent.click(how2DialogCloseButton)
			await waitFor(() => {
				expect(screen.queryByTestId('how-to-play-dialog')).not.toBeInTheDocument()
			})

			const titleElement = screen.getByRole('heading', { level: 1, name: /Mojibi/i })
			expect(titleElement).toBeInTheDocument()
		})
	})

	describe('Game', () => {
		describe('Bingo Grid', () => {
			it('contains 25 cells', () => {
				const cells = screen.getAllByTestId('cell')
				expect(cells).toHaveLength(25)
			})

			describe('Word Boxes', () => {
				let wordBoxes: HTMLElement[]

				it('contains 8 word boxes', () => {
					wordBoxes = screen.getAllByTestId('word-box')
					expect(wordBoxes).toHaveLength(8)
				})

				test('each word box had 4 mini cells ', () => {
					for (const word of wordBoxes) {
						const miniCells = within(word).getAllByTestId('mini-cell')
						expect(miniCells).toHaveLength(4)
					}
				})
			})
		})

		describe('Keyboard', () => {
			describe('On-Screen Keyboard', () => {
				describe('When you click あ', () => {
					beforeEach(async () => {
						const keys = screen.getByTestId('keyboard')
						const A = within(keys).getByRole('button', { name: /あ/i, hidden: true })
						userEvent.click(A)
					})

					it('should render あ in input box', () => {
						const textInput = screen.getByTestId<HTMLInputElement>('key-input')
						expect(textInput).toHaveValue('あ')
					})
				})

				describe('When you click か, then click the conversion button', () => {
					beforeEach(() => {
						const keys = screen.getByTestId('keyboard')
						const KA = within(keys).getByRole('button', { name: /か/i, hidden: true })
						const CONV = within(keys).getByTestId('conv-key')
						userEvent.click(KA)
						userEvent.click(CONV)
					})

					it('should render が in input box', () => {
						const textInput = screen.getByTestId<HTMLInputElement>('key-input')
						expect(textInput).toHaveValue('が')
					})
				})

				describe('When you click は, then click the conversion button twice', () => {
					beforeEach(() => {
						const keys = screen.getByTestId('keyboard')
						const HA = within(keys).getByRole('button', { name: /は/i, hidden: true })
						const CONV = within(keys).getByTestId('conv-key')
						userEvent.click(HA)
						userEvent.click(CONV)
						userEvent.click(CONV)
					})

					it('should render ぱ in input box', () => {
						const textInput = screen.getByTestId<HTMLInputElement>('key-input')
						expect(textInput).toHaveValue('ぱ')
					})
				})

				describe('When you click あい, then click the backspace button', () => {
					beforeEach(() => {
						const keys = screen.getByTestId('keyboard')
						const A = within(keys).getByRole('button', { name: /あ/i, hidden: true })
						const I = within(keys).getByRole('button', { name: /い/i, hidden: true })
						const DELETE = within(keys).getByTestId('delete-key')
						userEvent.click(A)
						userEvent.click(I)
						userEvent.click(DELETE)
					})

					it('should render あ in input box', () => {
						const textInput = screen.getByTestId<HTMLInputElement>('key-input')
						expect(textInput).toHaveValue('あ')
					})
				})
			})
		})

		describe('General', () => {
			describe('When you type "あさなぎ"', () => {
				test('あ, さ, な turn red, the others remains gray', async () => {
					const textInput = screen.getByTestId<HTMLInputElement>('key-input')
					fireEvent.change(textInput, { target: { value: 'あさなぎ' } })

					const cells = screen.getAllByTestId('cell')

					for (let i = 0; i < 25; i++) {
						const cell = cells[i]
						if (i === 0 || i === 10 || i === 20) {
							expect(cell).toHaveStyle({
								backgroundColor: '#AC3E3E',
							})
						} else {
							expect(cell).toHaveStyle({
								backgroundColor: '#3A3A3C',
							})
						}
					}
				})
			})

			describe('When you submit "あさなぎ"', () => {
				it('あ, さ, な turn yellow, the others remains gray', async () => {
					const textInput = screen.getByTestId<HTMLInputElement>('key-input')
					fireEvent.change(textInput, { target: { value: 'あさなぎ' } })
					const ENTER = screen.getByRole('button', { name: /ENTER/i, hidden: true })
					userEvent.click(ENTER)

					const cells = screen.getAllByTestId('cell')

					for (let i = 0; i < 25; i++) {
						const cell = cells[i]
						if (i === 0 || i === 10 || i === 20) {
							expect(cell).toHaveStyle({
								backgroundColor: '#B59F3B',
							})
						} else {
							expect(cell).toHaveStyle({
								backgroundColor: '#3A3A3C',
							})
						}
					}
				})

				it('input is empty after submitting', async () => {
					const textInput = screen.getByTestId<HTMLInputElement>('key-input')
					expect(textInput).toHaveValue('')
				})
			})

			describe('When your answer is ["あさなぎ", "かたくり"]', () => {
				it('あ, か, さ, た, な turn green, く turns yellow, the others remains gray', async () => {
					const textInput = screen.getByTestId<HTMLInputElement>('key-input')
					fireEvent.change(textInput, { target: { value: 'かたくり' } })
					const ENTER = screen.getByRole('button', { name: /ENTER/i, hidden: true })
					userEvent.click(ENTER)

					const cells = screen.getAllByTestId('cell')
					for (let i = 0; i < 25; i++) {
						const cell = cells[i]
						if (i === 0 || i == 5 || i === 10 || i === 15 || i === 20) {
							expect(cell).toHaveStyle({
								backgroundColor: '#538D4E',
							})
						} else if (i === 7) {
							expect(cell).toHaveStyle({
								backgroundColor: '#B59F3B',
							})
						} else {
							expect(cell).toHaveStyle({
								backgroundColor: '#3A3A3C',
							})
						}
					}
				})
			})
		})
	})
})
