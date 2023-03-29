/**
 * Gets the indices where the new bingo line completed.
 *
 * @param prevGrid - The first input number array
 * @param curGrid - The second input number array
 * @returns index of array where the new bingo line completed
 * @example
 * ```
 * // [0, 1, 2, 3, 4]
 * const prevGrid = [2, 2, 0, 2, 2,
 * 									 0, 2, 1, 0, 0,
 *									 0, 2, 1, 0, 0,
 *									 0, 2, 0, 0, 0,
 *									 0, 2, 0, 0, 0,]
 * const curGrid =  [2, 2, 2, 2, 2,
 *									 0, 2, 1, 0, 0,
 *									 0, 2, 1, 0, 0,
 *									 0, 2, 1, 0, 0,
 *									 1, 2, 0, 0, 0,]
 * ```
 */
export const getAnimationIndices = (
	prevGrid: number[],
	curGrid: number[]
): number[] => {
	const diffIndices = []
	const animationIndices: number[] = []
	for (let i = 0; i < 25; i++) {
		if (prevGrid[i] != curGrid[i]) {
			diffIndices.push(i)
		}
	}
	// Checks if diffIndices have bingo lines.
	// Checks for vertical line.
	diffIndices.forEach((index) => {
		const col = index % 5
		let allTrue = true
		for (let i = 0; i < 5; i++) {
			if (curGrid[col + i * 5] !== 2) {
				allTrue = false
				break
			}
		}
		if (allTrue) {
			for (let i = 0; i < 5; i++) {
				animationIndices.push(col + i * 5)
			}
		}

		//Checks for horizontal line.
		const row = Math.floor(index / 5)
		allTrue = true
		for (let i = 0; i < 5; i++) {
			if (curGrid[row * 5 + i] !== 2) {
				allTrue = false
				break
			}
		}
		if (allTrue) {
			for (let i = 0; i < 5; i++) {
				animationIndices.push(row * 5 + i)
			}
		}

		//Checks for forward diagonal line.
		if (row === col) {
			allTrue = true
			for (let i = 0; i < 5; i++) {
				if (curGrid[6 * i] !== 2) {
					allTrue = false
					break
				}
			}
			if (allTrue) {
				for (let i = 0; i < 5; i++) {
					animationIndices.push(6 * i)
				}
			}
		}

		//Checks for backward diagonal line.
		if (row === 4 - col) {
			allTrue = true
			for (let i = 0; i < 5; i++) {
				if (curGrid[4 * i] !== 2) {
					allTrue = false
					break
				}
			}
			if (allTrue) {
				for (let i = 0; i < 5; i++) {
					animationIndices.push(4 * i)
				}
			}
		}
	})

	const uniqueAnimationIndices: number[] = Array.from(new Set(animationIndices))
	const sortedAnimationIndices: number[] = uniqueAnimationIndices.sort((a, b) => a - b)

	return sortedAnimationIndices
}
