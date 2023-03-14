import { useContext } from 'react'

import Box from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined'

import { GameContext } from '../../App'
import { VALID_WORDS } from '../../constants/validWords'
import { HIRAGANA_KEYS } from '../../constants/hiraganaKeys'
import { HIRAGANA_CONVERSION_MAP } from '../../constants/hiraganaConversionMap'
import { checkForMatchedChars } from '../../utils/checkForMatchedChars'
import { checkForBingoLines } from '../../utils/checkForBingoLines'
import { bingoCharacters } from './BingoGrid'

interface KeyProps extends ButtonProps {
	isHidden?: boolean
	isMultipleLine?: boolean
	testId?: string | null
}

const KeyButton: React.FC<KeyProps> = ({
	onClick,
	children,
	isHidden = false,
	isMultipleLine = false,
	testId = null,
}: KeyProps) => {
	return (
		<Button
			color='neutral'
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
}

const Keyboard = () => {
	const { currentWord, setCurrentWord, enteredWords, setEnteredWords, savedGrid, setSavedGrid } =
		useContext(GameContext) as KeyboardProps

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const word = e.target.value.slice(0, 4)
		setCurrentWord(word)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (currentWord.length !== 4) {
			console.log(currentWord + ' is not 4-kana word')
			return
		}

		let isValid = false
		if (VALID_WORDS.includes(currentWord)) {
			isValid = true
		}

		if (isValid) {
			const tmpSavedGrid = savedGrid.concat()

			// Changes elements of savedGird to 1 if their corresponding letters match the letters in the last word.
			const gridWithMatchedLetters = checkForMatchedChars(
				currentWord,
				tmpSavedGrid,
				bingoCharacters
			)

			// Changes elements of savedGrid to 2 if their corresponding letters complete a row, column, or diagonal.
			const gridWithBingoLines = checkForBingoLines(gridWithMatchedLetters)

			const evaluations = gridWithBingoLines
			setSavedGrid(gridWithBingoLines)
			setCurrentWord('')

			const wordHistory = [...enteredWords, currentWord]
			setEnteredWords(wordHistory)
			const mojibiState = localStorage.getItem('mojibi_state')
			if (mojibiState) {
				const retrievedMojibiState = JSON.parse(mojibiState)
				localStorage.setItem(
					'mojibi_state',
					JSON.stringify({ ...retrievedMojibiState, wordHistory, evaluations })
				)
			}

			console.log(enteredWords)
		} else {
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
			<form onSubmit={handleSubmit} id='keyForm' data-testid='key-form'>
				<Box display='flex' justifyContent='center'>
					<TextField
						autoComplete='off'
						onChange={handleChange}
						value={currentWord}
						inputProps={{
							maxLength: 4,
							'data-testid': 'key-input',
						}}
					/>
					<Button
						color='neutral'
						type='submit'
						variant='contained'
						size='small'
						sx={{ marginLeft: 1 }}
					>
						ENTER
					</Button>
				</Box>
			</form>

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
							<KeyButton key={ind} onClick={handleBackspaceKeyClick} testId='delete-key'>
								<BackspaceOutlinedIcon fontSize='small' />
							</KeyButton>
						)
					}
					return (
						<KeyButton key={ind} onClick={handleKeyClick} isHidden={isHidden}>
							{char}
						</KeyButton>
					)
				})}
			</Box>
		</Box>
	)
}

export default Keyboard
