import { useContext } from 'react'

import Box from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined'

import { GameContext, mojibiState, mojibiStats } from '../../App'
import { VALID_WORDS } from '../../constants/validWords'
import { HIRAGANA_KEYS } from '../../constants/hiraganaKeys'
import { HIRAGANA_CONVERSION_MAP } from '../../constants/hiraganaConversionMap'
import { checkForMatchedChars } from '../../utils/checkForMatchedChars'
import { checkForBingoLines } from '../../utils/checkForBingoLines'
import { bingoCharacters } from './BingoGrid'
import { calcLinesAndScore } from '../../utils/calcLinesAndScore'
import { getAnimationIndices } from '../../utils/getAnimationIndices'
import { getAverageAndRank } from '../../utils/getAverageAndRank'
import { calcDateDiff } from '../../utils/calcDateDiff'

interface KeyProps extends ButtonProps {
	isHidden?: boolean
	isMultipleLine?: boolean
	testId?: string | null
	isDisabled: boolean
}

const KeyButton: React.FC<KeyProps> = ({
	onClick,
	children,
	isHidden = false,
	isMultipleLine = false,
	testId = null,
	isDisabled,
}: KeyProps) => {
	return (
		<Button
			color='neutral'
			disabled={isDisabled}
			variant='contained'
			sx={{
				minWidth: 24,
				minHeight: 24,
				px: 0,
				height: 40,
				visibility: isHidden ? 'hidden' : 'visible',
				flexFlow: isMultipleLine ? 'column' : 'row',
			}}
			onClick={onClick}
			data-testid={testId}
		>
			{children}
		</Button>
	)
}

interface KeyboardProps {
	currentWord: string
	setCurrentWord: React.Dispatch<React.SetStateAction<string>>
	enteredWords: string[]
	setEnteredWords: React.Dispatch<React.SetStateAction<string[]>>
	savedGrid: number[]
	setSavedGrid: React.Dispatch<React.SetStateAction<number[]>>
	setOpenErrorMsg: React.Dispatch<React.SetStateAction<boolean>>
	setErrorMsg: React.Dispatch<React.SetStateAction<string>>
	setOpenStat: React.Dispatch<React.SetStateAction<boolean>>
	setLines: React.Dispatch<React.SetStateAction<number>>
	isAnimating: boolean
	setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>
	setAnimIndices: React.Dispatch<React.SetStateAction<number[]>>
}

const Keyboard = () => {
	const {
		currentWord,
		setCurrentWord,
		enteredWords,
		setEnteredWords,
		savedGrid,
		setSavedGrid,
		setOpenErrorMsg,
		setErrorMsg,
		setOpenStat,
		isAnimating,
		setIsAnimating,
		setAnimIndices,
	} = useContext(GameContext) as KeyboardProps

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const word = e.target.value.slice(0, 4)
		setCurrentWord(word)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (enteredWords.length >= 8) {
			console.log('cant input anymore')
			return
		}

		if (currentWord.length !== 4) {
			console.log(currentWord + ' is not 4-kana word')
			setErrorMsg('ひらがな4文字を入力してください')
			setOpenErrorMsg(true)
			return
		}

		if (VALID_WORDS.includes(currentWord)) {
			const tmpSavedGrid = savedGrid.concat()

			// Changes elements of savedGird to 1(yellow) if their corresponding letters match the entered letters.
			const gridWithMatchedLetters = checkForMatchedChars(
				currentWord,
				tmpSavedGrid,
				bingoCharacters
			)

			// Changes elements of savedGrid to 2(green) if their corresponding letters complete a row, column, or diagonal.
			const gridWithBingoLines = checkForBingoLines(gridWithMatchedLetters)

			setAnimIndices(getAnimationIndices(savedGrid, gridWithBingoLines))
			setIsAnimating(true)

			const evaluations = gridWithBingoLines
			setSavedGrid(gridWithBingoLines)
			setCurrentWord('')

			const wordHistory = [...enteredWords, currentWord]
			setEnteredWords(wordHistory)

			const [completedLines, score] = calcLinesAndScore(gridWithBingoLines)

			mojibiState['completedLines'] = completedLines
			mojibiState['evaluations'] = evaluations
			localStorage.setItem(
				'mojibi_state',
				JSON.stringify({ ...mojibiState, wordHistory, evaluations, completedLines })
			)

			console.log(enteredWords)

			// When the game finishes
			if (wordHistory.length === 8) {
				const now = new Date()
				const gameStatus = completedLines > 0 ? 'WIN' : 'FAIL'
				mojibiState['gameStatus'] = gameStatus
				if (mojibiState['lastCompleted'] == null) {
					mojibiStats['gamesPlayedStreak'] = 1
				} else if (calcDateDiff(new Date(mojibiState['lastCompleted']), now) == 1) {
					mojibiStats['gamesPlayedStreak'] += 1
				} else {
					mojibiStats['gamesPlayedStreak'] = 0
				}

				mojibiState['lastCompleted'] = now.getTime()
				mojibiStats['gamesPlayed'] += 1

				// Win if the number of completed lines is 1 or more.
				if (gameStatus === 'WIN') {
					mojibiStats['gamesWon'] += 1
					mojibiStats['currentWinStreak'] += 1
					if (mojibiStats['currentWinStreak'] > mojibiStats['maxWinStreak']) {
						mojibiStats['maxWinStreak'] = mojibiStats['currentWinStreak']
					}
				} else {
					mojibiStats['currentWinStreak'] = 0
				}
				mojibiStats['winPercentage'] = (mojibiStats['gamesWon'] / mojibiStats['gamesPlayed']) * 100
				mojibiStats['lines'][completedLines] += 1

				const linesArray = Object.values(mojibiStats['lines'])
				const [averageLines, rank] = getAverageAndRank(linesArray)
				mojibiStats['averageLines'] = averageLines
				mojibiStats['rank'] = rank

				localStorage.setItem(
					'mojibi_state',
					JSON.stringify({
						...mojibiState,
						wordHistory,
						evaluations,
						completedLines,
						gameStatus,
					})
				)
				localStorage.setItem('mojibi_stats', JSON.stringify(mojibiStats))

				// Open stats modal
				setTimeout(() => setOpenStat(true), 500)
			}
		} else {
			setErrorMsg(`${currentWord} は辞書にありません`)
			setOpenErrorMsg(true)
			console.log(currentWord + ' is not in word list')
		}
	}

	const handleKeyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const clickedLetter = e.currentTarget.textContent
		const word = (currentWord + clickedLetter).slice(0, 4)
		setCurrentWord(word)
	}

	const handleConversionKeyClick = () => {
		const convertingKey = currentWord.slice(-1)
		const convertedKey = HIRAGANA_CONVERSION_MAP.get(convertingKey)
		if (typeof convertedKey !== 'undefined') {
			setCurrentWord(currentWord.slice(0, -1) + convertedKey)
		}
	}

	const handleBackspaceKeyClick = () => {
		setCurrentWord(currentWord.slice(0, -1))
	}

	return (
		<Box textAlign='center' mb={1.5}>
			{enteredWords.length < 8 && (
				<form onSubmit={handleSubmit} id='keyForm' data-testid='key-form'>
					<TextField
						autoComplete='off'
						onChange={handleChange}
						value={currentWord}
						size='small'
						disabled={isAnimating}
						inputProps={{
							margin: 0,
							maxLength: 4,
							'data-testid': 'key-input',
						}}
					/>
					<Button
						color='neutral'
						type='submit'
						variant='contained'
						size='small'
						disabled={isAnimating}
						sx={{ marginLeft: 1 }}
					>
						ENTER
					</Button>
				</form>
			)}

			<Box
				mt={1}
				sx={{
					display: 'grid',
					gridTemplateColumns: 'repeat(10, 1fr)',
					gridTemplateRows: 'repeat(5, 1fr)',
					direction: 'rtl',
					gap: 0.5,
				}}
				data-testid='keyboard'
			>
				{HIRAGANA_KEYS.map((char, ind) => {
					const isHidden = char === 'X'

					if (char === 'C') {
						return (
							<KeyButton
								key={ind}
								onClick={handleConversionKeyClick}
								isMultipleLine={true}
								isDisabled={isAnimating}
								testId='conv-key'
							>
								<Typography variant='caption'>゛゜</Typography>
								<Typography variant='caption' whiteSpace='nowrap'>
									大⇔小
								</Typography>
							</KeyButton>
						)
					}
					if (char === 'B') {
						return (
							<KeyButton
								key={ind}
								onClick={handleBackspaceKeyClick}
								isDisabled={isAnimating}
								testId='delete-key'
							>
								<BackspaceOutlinedIcon fontSize='small' />
							</KeyButton>
						)
					}
					return (
						<KeyButton
							key={ind}
							onClick={handleKeyClick}
							isHidden={isHidden}
							isDisabled={isAnimating}
						>
							{char}
						</KeyButton>
					)
				})}
			</Box>
		</Box>
	)
}

export default Keyboard
