import { hiraganaNormal, hiraganaSpecial, getBingoChars } from './getBingoChars'

describe('getBingoChars', () => {
	test('Bingo should consist 20 Normal chars and 5 special chars', () => {
		const bingo = getBingoChars(12345678, 'NORMAL')
		let numOfNormal = 0
		let numOfSpecial = 0
		bingo.forEach((char) => {
			if (hiraganaNormal.includes(char)) numOfNormal++
			if (hiraganaSpecial.includes(char)) numOfSpecial++
		})
		expect(numOfNormal).toEqual(20)
		expect(numOfSpecial).toEqual(5)
	})
})
