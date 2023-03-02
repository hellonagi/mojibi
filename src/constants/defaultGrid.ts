/**
* Stores each cell's state
* [0, 0, 0, 0, 0
*  0, 0, 0, 0, 0
*  0, 0, 0, 0, 0
*  0, 0, 0, 0, 0
*  0, 0, 0, 0, 0]
*/
export const defaultGrid: number[] = '0'
	.repeat(25)
	.split('')
	.map((i) => parseInt(i, 10))
