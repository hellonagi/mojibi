/**
 * @example
 * '''
 * // ぁ
 * console.log(HIRAGANA_CONVERSION_MAP('あ'))
 * // あ
 * console.log(HIRAGANA_CONVERSION_MAP('ぁ'))
 * // ば
 * console.log(HIRAGANA_CONVERSION_MAP('は'))
 * // ぱ
 * console.log(HIRAGANA_CONVERSION_MAP('ば'))
 * // は
 * console.log(HIRAGANA_CONVERSION_MAP('ぱ'))
 * '''
 */

export const HIRAGANA_CONVERSION_MAP = new Map()

const hiraganaConversionList = [
	['あ', 'ぁ'],
	['い', 'ぃ'],
	['う', 'ぅ'],
	['え', 'ぇ'],
	['お', 'ぉ'],
	['か', 'が'],
	['き', 'ぎ'],
	['く', 'ぐ'],
	['け', 'げ'],
	['こ', 'ご'],
	['さ', 'ざ'],
	['し', 'じ'],
	['す', 'ず'],
	['せ', 'ぜ'],
	['そ', 'ぞ'],
	['た', 'だ'],
	['ち', 'ぢ'],
	['つ', 'っ', 'づ'],
	['て', 'で'],
	['と', 'ど'],
	['は', 'ば', 'ぱ'],
	['ひ', 'び', 'ぴ'],
	['ふ', 'ぶ', 'ぷ'],
	['へ', 'べ', 'ぺ'],
	['ほ', 'ぼ', 'ぽ'],
	['や', 'ゃ'],
	['ゆ', 'ゅ'],
	['よ', 'ょ'],
]

hiraganaConversionList.forEach((e) => {
	for (let i = 0; i < e.length; i++) {
		if (i === 0) {
			HIRAGANA_CONVERSION_MAP.set(e[e.length - 1], e[0])
		} else {
			HIRAGANA_CONVERSION_MAP.set(e[i - 1], e[i])
		}
	}
})
