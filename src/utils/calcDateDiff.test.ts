import { calcDateDiff } from './calcDateDiff'

describe('calcDateDiff', () => {
	it('should return the correct number of days between two dates', () => {
		const date1 = new Date('2023-04-01')
		const date2 = new Date('2023-04-10')
		const expectedResult = 9

		const result = calcDateDiff(date1, date2)
		expect(result).toBe(expectedResult)
	})

	it('should return 0 when the dates are the same', () => {
		const date1 = new Date('2023-04-01')
		const date2 = new Date('2023-04-01')
		const expectedResult = 0

		const result = calcDateDiff(date1, date2)
		expect(result).toBe(expectedResult)
	})
})
