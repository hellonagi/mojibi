/**
 * Checks if the letter in Bingo Grid matches the letter contained in the word a player typing
 *
 * @param word - The first input string
 * @param grid - The second input number array
 * @param bingoLetters - The third input string array
 * @returns true if the word contains the letter, false if not
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
 * const bingoLetters = ['す', 'い', 'り', 'ど', 'う',
 * 											 'よ', 'あ', 'う', 'づ', 'と',
 * 											 'た', 'ぽ', 'お', 'け', 'ぼ',
 * 											 'ろ', 'や', 'ぬ', 'し', 'の',
 * 											 'ゃ', 'ふ', 'れ', 'そ', 'ほ',]
 * console.log(checkForMatchedLetters(word, grid, bingoLetters))
 * ```
 */
export const checkForMatchedLetters = (
	word: string,
	grid: number[],
	bingoLetters: string[]
): number[] => {
	for (let i = 0; i < word.length; i++) {
		bingoLetters.forEach((letter, index) => {
			if (word[i] === letter) {
				console.log('match')
				grid[index] = 1
			}
		})
	}
	return grid
}
