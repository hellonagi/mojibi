/**
 * Bingo Characters
 * The characters ぢ, を, and ゎ are excluded because there's few words that contain them
 */
export const hiraganaNormal =
	'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわん'
export const hiraganaSpecial =
	'ぁぃぅぇぉがぎぐげござじずぜぞだづでどっばびぶべぼぱぴぷぺぽゃゅょー'

/**
 * Generates an array of random hiragana characters without duplicates (length = 25).
 * The ratio of normal characters to special ones depends on the difficulty
 * (Normal: 20:5 Hard: 18:7).
 *
 * @param {number} seed - The seed value comes from today's date
 * @param {string} difficulty - 'NORMAL' | 'HARD'
 * @returns {string[]} - An array of random hiragana characters
 * @example
 * ```
 * // ['へ', 'づ', 'あ', 'ら', 'も',
 * //  'お', 'ふ', 'ぜ', 'ぬ', 'ん',
 * //  'む', 'ろ', 'く', 'げ', 'つ',
 * //  'ざ', 'さ', 'よ', 'る', 'が',
 * //  'え', 'や', 'め', 'た', 'き']
 * console.log(getBingoChars(20230401))
 * ```
 */
export const getBingoChars = (seed: number, difficulty = 'NORMAL'): string[] => {
	function _lcg(seed: number) {
		const a = 1664525
		const c = 1013904223
		const m = Math.pow(2, 32)
		let state = seed

		return function random() {
			state = (a * state + c) % m
			return state / m
		}
	}

	function _seededShuffle(array: string[], seed: number) {
		const prng = _lcg(seed)
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(prng() * (i + 1))
			;[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	let ratio = [20, 5]
	if (difficulty === 'HARD') {
		ratio = [18, 7]
	}

	const bingoNormalChars = _seededShuffle(hiraganaNormal.split(''), seed).slice(0, ratio[0])
	const bingoSpecialChars = _seededShuffle(hiraganaSpecial.split(''), seed + 100000).slice(
		0,
		ratio[1]
	)
	const bingoChars = _seededShuffle(bingoNormalChars.concat(bingoSpecialChars), seed + 200000)

	return bingoChars
}
