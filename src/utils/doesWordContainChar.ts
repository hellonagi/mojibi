/**
 * Checks if the word contains the char.
 * 
 * @param word - The first input string
 * @param char - The second input string
 * @returns true if the word contains the char, false if not
 * @example
 * ```
 * // true
 * console.log(doesWordContainChar('べんとう', 'ん'))
 * ```
 * @example
 * ```
 * // false
 * console.log(doesWordContainChar('おにぎり', 'あ'))
 * ```
 */
export const doesWordContainChar = (word: string, char: string): boolean => {
	for (let i = 0; i < word.length; i++) {
		if (word[i] === char) {
			return true
		}
	}
	return false
}
