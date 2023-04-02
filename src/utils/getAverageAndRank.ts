/**
 * Calculates the average number of lines and assigns a corresponding rank.
 *
 * @param {{ [key: number]: number }} lines - An object where keys represent the number of bingo lines, and values represent the number of times a player has achieved them
 * @returns {[number, string]} - A tuple containing the average number of lines as a float with one decimal point, and the corresponding rank as a string.
 */
export const getAverageAndRank = (lines: { [key: number]: number }): [number, string] => {
	let totalLines = 0
	let totalPlayed = 0

	for (const line in lines) {
		const count = lines[line]
		totalLines += parseInt(line) * count
		totalPlayed += count
	}

	let avgLines = 0
	if (totalPlayed != 0) {
		avgLines = parseFloat((totalLines / totalPlayed).toFixed(1))
	}

	let rank = 'E'
	if (avgLines >= 1) rank = 'D'
	if (avgLines >= 2) rank = 'C'
	if (avgLines >= 3) rank = 'B'
	if (avgLines >= 5) rank = 'A'
	if (avgLines >= 8) rank = 'S'
	return [avgLines, rank]
}
