/**
 * Checks if the word contains the letter.
 * 
 * @param word - The first input string
 * @param letter - The second input string
 * @returns true if the word contains the letter, false if not
 * @example
 * ```
 * // true
 * console.log(doesWordContainLetter('べんとう', 'ん'))
 * ```
 * @example
 * ```
 * // false
 * console.log(doesWordContainLetter('おにぎり', 'あ'))
 * ```
 */
export const doesWordContainLetter = (word: string, letter: string): boolean => {
	for (let i = 0; i < word.length; i++) {
		if (word[i] === letter) {
			return true
		}
	}
	return false
}
