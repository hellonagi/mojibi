/**
 * Checks every character within the player's word against characters in the Bingo Grid
 * Changes the corresponding element's value from 0 to 1 if there is a match
 * 
 * @param word - The first input string
 * @param grid - The second input number array
 * @param bingoChars - The third input string array
 * @returns number array
 * @example
 * ```
 * // [0, 0, 1, 0, 0,
 * //  0, 0, 0, 0, 0,
 * //  0, 0, 0, 0, 0,
 * //  0, 1, 0, 0, 0,
 * //  0, 0, 0, 0, 0,]
 * const word = 'てりやき'
 * const grid = [0, 0, 0, 0, 0,
 * 							 0, 0, 0, 0, 0,
 * 							 0, 0, 0, 0, 0,
 * 							 0, 0, 0, 0, 0,
 * 							 0, 0, 0, 0, 0,]
 * const bingoChars = ['す', 'い', 'り', 'ど', 'う',
 * 											 'よ', 'あ', 'う', 'づ', 'と',
 * 											 'た', 'ぽ', 'お', 'け', 'ぼ',
 * 											 'ろ', 'や', 'ぬ', 'し', 'の',
 * 											 'ゃ', 'ふ', 'れ', 'そ', 'ほ',]
 * console.log(checkForMatchedChars(word, grid, bingoChars))
 * ```
 */
export const checkForMatchedChars = (
	word: string,
	grid: number[],
	bingoChars: string[]
): number[] => {
	for (let i = 0; i < word.length; i++) {
		bingoChars.forEach((letter, index) => {
			if (word[i] === letter) {
				grid[index] = 1
			}
		})
	}
	return grid
}
