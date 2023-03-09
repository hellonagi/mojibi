/**
 * Bingo Characters
 * It excludes ぢ、を, ゎ because there's few words that contain them
 */
const hiraganaNormal =
	'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわん'
const hiraganaSpecial = 'ぁぃぅぇぉがぎぐげござじずぜぞだづでどっばびぶべぼぱぴぷぺぽゃゅょー'

/**
 * Generates random hiragana characters array without duplicates (length = 25).
 * The ratio of Normal Characters to Special Ones depends on the difficulty 
 * (Normal: 20:5 Hard: 18:7).
 *
 * @param seed - The seed value comes from today's date
 * @param difficulty - 'NORMAL' | 'HARD'
 * @returns An array of 25 string elements
 * @example
 * ```
 * // ['す', 'い', 'り', 'ど', 'う',
 * //  'よ', 'あ', 'う', 'づ', 'と',
 * //  'た', 'ぽ', 'お', 'け', 'ぼ',
 * //  'ろ', 'や', 'ぬ', 'し', 'の',
 * //  'ゃ', 'ふ', 'れ', 'そ', 'ほ',]
 * console.log(getBingoChars())
 * ```
 */
export const getBingoChars = (seed: number, difficulty = 'NORMAL'): string[] => {
	const _pseudoRandom = () => {
		const x = Math.sin(seed) * 1337
		return x - Math.floor(x)
	}

	const _shuffle = (array: string[]) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(_pseudoRandom() * (i + 1))

			;[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	let ratio = [20, 5]
	if (difficulty === 'HARD') {
		ratio = [18, 7]
	}

	const bingoNormalChars = _shuffle(hiraganaNormal.split('')).slice(0, ratio[0])
	const bingoSpecialChars = _shuffle(hiraganaSpecial.split('')).slice(0, ratio[1])
	const bingoChars = _shuffle(bingoNormalChars.concat(bingoSpecialChars))

	return bingoChars
}
