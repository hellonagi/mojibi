import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import StatBarChart from './StatBarChart'

class ResizeObserverMock {
	observe() {
		// do nothing
	}

	unobserve() {
		// do nothing
	}

	disconnect() {
		// do nothing
	}
}

window.ResizeObserver = ResizeObserverMock

jest.mock('recharts', () => {
	const OriginalRecharts = jest.requireActual('recharts')

	return {
		...OriginalRecharts,
		ResponsiveContainer: ({ children }: any) => (
			<OriginalRecharts.ResponsiveContainer width={800} height={800}>
				{children}
			</OriginalRecharts.ResponsiveContainer>
		),
	}
})

describe('StatBarChart component', () => {
	beforeEach(() => {
		render(<StatBarChart />)
	})

	test('renders BarChart', () => {
		const barchart = screen.getByRole('region')
		expect(barchart).toBeInTheDocument()
		const ticks = barchart.querySelectorAll('.recharts-cartesian-axis-tick')
		expect(ticks).toHaveLength(12)
	})
})
