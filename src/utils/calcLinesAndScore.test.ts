import { calcLinesAndScore } from './calcLinesAndScore'

describe('calcLinesAndScore', () => {
	it('should return true', () => {
		const grid1 = [1, 1, 0, 2, 2, 0, 0, 1, 2, 0, 2, 2, 2, 2, 2, 0, 2, 1, 2, 0, 2, 0, 1, 2, 0]
		const expectedResult1 = [3, 23]
		expect(calcLinesAndScore(grid1)).toEqual(expectedResult1)
		const grid2 = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
		const expectedResult2 = [12, 49]
		expect(calcLinesAndScore(grid2)).toEqual(expectedResult2)
	})
})
