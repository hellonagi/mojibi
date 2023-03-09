/**
 * Returns date as YYYY/MM/DD
 *
 * @param unix - The first input number - Unix time
 * @returns string - YYYY/MM/DD
 * @example
 * ```
 * // 2022/07/26
 * console.log(convertUnixToDate(1658834322189))
 * ```
 */
export const convertUnixToDate = (unix: number): string => {
	const jsDate = new Date(unix)
	const year = jsDate.getFullYear()
	const month = (jsDate.getMonth() + 1).toString().padStart(2, '0')
	const date = jsDate.getDate().toString().padStart(2, '0')
	const formattedDate = `${year}${month}${date}`

	return formattedDate
}
