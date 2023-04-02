import { getAverageAndRank } from './getAverageAndRank'

describe('getAverageAndRank', () => {
	it('should return [0, "E"] when the all lines are 0', () => {
		const lines = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 12: 0 }
		const expectedAverageLines = 0
		const expectedRank = 'E'

		const [res_lines, res_rank] = getAverageAndRank(lines)
		expect(res_lines).toBe(expectedAverageLines)
		expect(res_rank).toBe(expectedRank)
	})

	it('should return [1.5, "D"] when the average number of lines are 1.5 ', () => {
		const lines = { 0: 1, 1: 1, 2: 1, 3: 1, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 12: 0 }
		const expectedAverageLines = 1.5
		const expectedRank = 'D'

		const [res_lines, res_rank] = getAverageAndRank(lines)
		expect(res_lines).toBe(expectedAverageLines)
		expect(res_rank).toBe(expectedRank)
	})

	it('should return [2.9, "C"] when the average number of lines are 2.9 ', () => {
		const lines = { 0: 5, 1: 1, 2: 0, 3: 2, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 1, 12: 1 }
		const expectedAverageLines = 2.9
		const expectedRank = 'C'

		const [res_lines, res_rank] = getAverageAndRank(lines)
		expect(res_lines).toBe(expectedAverageLines)
		expect(res_rank).toBe(expectedRank)
	})

	it('should return [3, "B"] when the average number of lines are 3 ', () => {
		const lines = { 0: 4, 1: 0, 2: 0, 3: 0, 4: 0, 5: 6, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 12: 0 }
		const expectedAverageLines = 3
		const expectedRank = 'B'

		const [res_lines, res_rank] = getAverageAndRank(lines)
		expect(res_lines).toBe(expectedAverageLines)
		expect(res_rank).toBe(expectedRank)
	})

	it('should return [5, "A"] when the average number of lines are 5 ', () => {
		const lines = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 1, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 12: 0 }
		const expectedAverageLines = 5
		const expectedRank = 'A'

		const [res_lines, res_rank] = getAverageAndRank(lines)
		expect(res_lines).toBe(expectedAverageLines)
		expect(res_rank).toBe(expectedRank)
	})

	it('should return [8, "S"] when the average number of lines are 8 ', () => {
		const lines = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 1, 8: 0, 9: 1, 10: 0, 12: 0 }
		const expectedAverageLines = 8
		const expectedRank = 'S'

		const [res_lines, res_rank] = getAverageAndRank(lines)
		expect(res_lines).toBe(expectedAverageLines)
		expect(res_rank).toBe(expectedRank)
	})
})
