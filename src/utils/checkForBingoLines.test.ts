import { checkForBingoLines } from './checkForBingoLines'

describe('checkForBingoLines', () => {
	it('should return true', () => {
		const grid = [1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0]
		const expectedResult = [
			1, 1, 2, 0, 0, 0, 0, 2, 1, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 1, 0, 2, 0, 0,
		]
		expect(checkForBingoLines(grid)).toEqual(expectedResult)
	})
})
