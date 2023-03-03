/**
 * Stores each cell's state
 * @example
 * '''
 * // [0, 0, 0, 0, 0
 * //  0, 0, 0, 0, 0
 * //  0, 0, 0, 0, 0
 * //  0, 0, 0, 0, 0
 * //  0, 0, 0, 0, 0]
 * console.log(DEFAULT_GRID)
 * '''
 */
export const DEFAULT_GRID: number[] = '0'
	.repeat(25)
	.split('')
	.map((i) => parseInt(i, 10))
