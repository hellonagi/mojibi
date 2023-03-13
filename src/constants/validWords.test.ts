import { VALID_WORDS } from './validWords'

describe('valid words', () => {
	test('words should be unique', () => {
		const uniqueWords = Array.from(new Set(VALID_WORDS))

		expect(VALID_WORDS.length).toEqual(uniqueWords.length)

		if (uniqueWords.length !== VALID_WORDS.length) {
			uniqueWords.forEach((uniqueWord) => {
				const duplicatedWords = VALID_WORDS.filter((validWord) => validWord === uniqueWord)
				if (duplicatedWords.length > 1) {
					fail(`The word ${uniqueWord} is not unique.`)
				}
			})
		}
	})
})
