/**
 * Retrieves an object from localStorage and merges it with the provided default object.
 *
 * @template T - The type of the object to retrieve from localStorage.
 * @param {string} key - The key of the item to retrieve from localStorage.
 * @param {T} defaultObj - The default object to merge with the retrieved object.
 * @returns {T} - The merged object, containing properties from both the retrieved object and the default object.
 */
export const getLocalStorage = <T extends object>(key: string, defaultObj: T): T => {
	const value = localStorage.getItem(key)
	if (value === null) {
		localStorage.setItem(key, JSON.stringify(defaultObj))
		return defaultObj
	}
	try {
		const parsedObj = JSON.parse(value)
		const mergedObj: T = { ...defaultObj }
		for (const prop in defaultObj) {
			if (Object.prototype.hasOwnProperty.call(parsedObj, prop)) {
				mergedObj[prop] = parsedObj[prop]
			}
		}
		localStorage.setItem(key, JSON.stringify(mergedObj))
		return mergedObj
	} catch (e) {
		console.error('Error parsing localStorage', e)
		localStorage.setItem(key, JSON.stringify(defaultObj))
		return defaultObj
	}
}
