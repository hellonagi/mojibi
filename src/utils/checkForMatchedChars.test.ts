import { checkForMatchedChars } from './checkForMatchedChars'

describe('checkForMatchedChars', () => {
	it('should return true', () => {
		const word = 'てりやき'
		const grid = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		const bingoChars = [
			'す',
			'い',
			'り',
			'ど',
			'う',
			'よ',
			'あ',
			'う',
			'づ',
			'と',
			'た',
			'ぽ',
			'お',
			'け',
			'ぼ',
			'ろ',
			'や',
			'ぬ',
			'し',
			'の',
			'ゃ',
			'ふ',
			'れ',
			'そ',
			'ほ',
		]
		const expectedResult = [
			0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
		]
		expect(checkForMatchedChars(word, grid, bingoChars)).toEqual(expectedResult)
	})
})
