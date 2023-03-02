/**
 * Bingo Letters
 * It excludes ぢ、を, ゎ because there's no words that contain them
 */
const hiragana =
	'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわんぁぃぅぇぉがぎぐげござじずぜぞだづでどっばびぶべぼぱぴぷぺぽゃゅょー'

/**
 * Generates random hiragana letters in array without duplicates (length = 25)
 * 
 * @returns An array of 25 string elements
 * @example
 * ```
 * // ['す', 'い', 'り', 'ど', 'う',
 * //  'よ', 'あ', 'う', 'づ', 'と',
 * //  'た', 'ぽ', 'お', 'け', 'ぼ',
 * //  'ろ', 'や', 'ぬ', 'し', 'の',
 * //  'ゃ', 'ふ', 'れ', 'そ', 'ほ',]
 * console.log(getBingoLetters())
 * ```
 */
export const getBingoLetters = (): string[] => {
	const bingoLetters: string[] = []

	const isInArray = (letter: string, array: string[]): boolean => {
		for (let i = 0; i < array.length; i++) {
			if (array[i] === letter) return true
		}
		return false
	}

	const getRandomLetter = (letters: string[]): void => {
		const randomLetter = letters[Math.floor(Math.random() * letters.length)]
		if (isInArray(randomLetter, bingoLetters)) {
			return getRandomLetter(letters)
		}
		bingoLetters.push(randomLetter)
	}

	for (let i = 0; i < 25; i++) {
		getRandomLetter(hiragana.split(''))
	}
	return bingoLetters
}
