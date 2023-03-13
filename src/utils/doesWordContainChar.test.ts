import { doesWordContainChar } from './doesWordContainChar'

describe('doesWordContainChar', () => {
	it('should return true', () => {
		expect(doesWordContainChar('おにぎり', 'お')).toBeTruthy()
		expect(doesWordContainChar('べんとう', 'ん')).toBeTruthy()
	})
	it('should return false', () => {
		expect(doesWordContainChar('おにぎり', 'あ')).toBeFalsy()
		expect(doesWordContainChar('べんとう', 'ば')).toBeFalsy()
	})
})
