import { getLocalStorage } from './getLocalStorage'
import { DEFAULT_MOJIBI_STATE } from '../constants/localStorage'

describe('getLocalStorage', () => {
	it('should return the default object when there is no localStorage', () => {
		const key = 'mojibi_state'
		const defaultObj = DEFAULT_MOJIBI_STATE
		const expectedResult = DEFAULT_MOJIBI_STATE

		const result = getLocalStorage(key, defaultObj)
		expect(result).toEqual(expectedResult)
	})

	it('should return the default object when localStorage is not an object', () => {
		const key = 'mojibi_state'
		const defaultObj = DEFAULT_MOJIBI_STATE
		const expectedResult = DEFAULT_MOJIBI_STATE

		localStorage.setItem(key, 'testtest')

		const result = getLocalStorage(key, defaultObj)
		expect(result).toEqual(expectedResult)
	})

	it('should return an object from localStorage', () => {
		const key = 'mojibi_state'
		const defaultObj = DEFAULT_MOJIBI_STATE
		const expectedResult = testLocalStorageState

		localStorage.setItem(key, JSON.stringify(testLocalStorageState))

		const result = getLocalStorage(key, defaultObj)
		expect(result).toEqual(expectedResult)
	})

	it('should return an object from localStorage', () => {
		const key = 'mojibi_state'
		const defaultObj = DEFAULT_MOJIBI_STATE
		const expectedResult = testLocalStorageState

		localStorage.setItem(key, JSON.stringify(testLocalStorageState))

		const result = getLocalStorage(key, defaultObj)
		expect(result).toEqual(expectedResult)
	})

	it('should return an object with filled content by the default object when local storage lacks keys', () => {
		const key = 'mojibi_state'
		const defaultObj = DEFAULT_MOJIBI_STATE

		const expectedResult = {
			wordHistory: ['あめーば'],
			evaluations: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			gameStatus: 'IN_PROGRESS',
			completedLines: DEFAULT_MOJIBI_STATE['completedLines'],
			lastCompleted: DEFAULT_MOJIBI_STATE['lastCompleted'],
			lastPlayed: DEFAULT_MOJIBI_STATE['lastPlayed'],
		}
		localStorage.setItem(key, JSON.stringify(testLocalStorageStateWithLackingKeys))

		const result = getLocalStorage(key, defaultObj)
		expect(result).toEqual(expectedResult)
	})
})

const testLocalStorageState = {
	wordHistory: ['あめーば'],
	evaluations: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	gameStatus: 'IN_PROGRESS',
	completedLines: 0,
	lastCompleted: 1680414059774,
	lastPlayed: 1680413781535,
}

const testLocalStorageStateWithLackingKeys = {
	wordHistory: ['あめーば'],
	evaluations: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	gameStatus: 'IN_PROGRESS',
}
