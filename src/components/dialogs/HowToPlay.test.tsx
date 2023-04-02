import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import HowToPlay from './HowToPlay'
import { HeaderContext } from '../../App'

const openHTP = true
const setOpenHTP = jest.fn()

const setup = () => {
	return render(
		<HeaderContext.Provider value={{ openHTP, setOpenHTP }}>
			<HowToPlay />
		</HeaderContext.Provider>
	)
}

describe('renders HowToPlay component', () => {
	beforeEach(() => {
		setup()
	})

	it('should display how-to-play modal', () => {
		const h2Element = screen.getByRole('heading', { level: 2, name: /遊び方/i })
		expect(h2Element).toBeInTheDocument()
	})

	describe('when outside of how-to-play modal clicked', () => {
		it('should close how-to-play modal', () => {
			const how2Modal = screen.getByTestId('how-to-play-dialog')
			const bd = how2Modal.getElementsByClassName('MuiBackdrop-root')
			fireEvent.click(bd[0])
			expect(setOpenHTP).toHaveBeenCalledTimes(1)
		})
	})
})
