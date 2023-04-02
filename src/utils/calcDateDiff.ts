/**
 * Returns the difference in days between two dates.
 *
 * @param {Date} date1 - The earlier date
 * @param {Date} date2 - The later date
 * @returns {number} The difference in days
 *
 * @example
 * ```
 * // 3
 * console.log(calcDateDiff(new Date("2023/04/01"), new Date("2023/04/04")))
 * ```
 */
export const calcDateDiff = (date1: Date, date2: Date): number => {
	const startOfDay1 = date1.setHours(0, 0, 0, 0)
	const startOfDay2 = date2.setHours(0, 0, 0, 0)
	const diffInMs = Math.abs(startOfDay1 - startOfDay2)
	const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24))
	return diffInDays
}
