import { getAnimationIndices } from './getAnimationIndices'

describe('getAnimationIndices', () => {
	it('should return the index of new bingo lines', () => {
		const prevGrid = [2, 2, 0, 2, 2, 0, 2, 1, 0, 0, 0, 2, 1, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0]
		const curGrid = [2, 2, 2, 2, 2, 0, 2, 1, 0, 0, 0, 2, 1, 0, 0, 0, 2, 1, 0, 0, 1, 2, 0, 0, 0]
		const expectedResult = [0, 1, 2, 3, 4]

		const result = getAnimationIndices(prevGrid, curGrid)
		expect(result).toEqual(expectedResult)
	})
})
