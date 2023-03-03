import { useEffect, useState, useContext } from 'react'

import Box from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined'

import { GameContext } from '../game'
import { VALID_WORDS } from '../../constants/validWords'
import { HIRAGANA_KEYS } from '../../constants/hiraganaKeys'
import { HIRAGANA_CONVERSION_MAP } from '../../constants/hiraganaConversionMap'

interface KeyProps extends ButtonProps {
	isHidden?: boolean
	isMultipleLine?: boolean
}

const KeyButton: React.FC<KeyProps> = ({
	onClick,
	children,
	isHidden = false,
	isMultipleLine = false,
}: KeyProps) => {
	return (
		<Button
			color='neutral'
			variant='contained'
			sx={{
				minWidth: 24,
				minHeight: 24,
				px: 0,
				height: 48,
				visibility: isHidden ? 'hidden' : 'visible',
				flexFlow: isMultipleLine ? 'column' : 'row',
			}}
			onClick={onClick}
		>
			{children}
		</Button>
	)
}

interface KeyboardProps {
	setCurrentWord: React.Dispatch<React.SetStateAction<string>>
	enteredWords: string[]
	setEnteredWords: React.Dispatch<React.SetStateAction<string[]>>
}

const Keyboard = () => {
	const { setCurrentWord, enteredWords, setEnteredWords } = useContext(GameContext) as KeyboardProps
	const [value, setValue] = useState<string>('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const word = e.target.value.slice(0, 4)
		setValue(word)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (value.length !== 4) {
			console.log(value + ' is not 4-kana word')
			return
		}

		let isValid = false
		if (VALID_WORDS.includes(value)) {
			isValid = true
		}

		if (isValid) {
			setEnteredWords([...enteredWords, value])
			setValue('')
			console.log(enteredWords)
		} else {
			console.log(value + ' is not in word list')
		}
	}

	const handleKeyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		const clickedLetter = e.currentTarget.innerText
		const word = (value + clickedLetter).slice(0, 4)
		setValue(word)
	}

	const handleConversionKeyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		const convertingKey = value.slice(-1)
		const convertedKey = HIRAGANA_CONVERSION_MAP.get(convertingKey)
		if (typeof convertedKey !== 'undefined') {
			setValue(value.slice(0, -1) + convertedKey)
		}
	}

	const handleBackspaceKeyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setValue(value.slice(0, -1))
	}

	useEffect(() => {
		console.log(value)
		setCurrentWord(value)
	}, [value])

	return (
		<Box textAlign='center' mt={2}>
			<form onSubmit={handleSubmit} id='keyForm'>
				<Box display='flex' justifyContent='center'>
					<TextField
						autoComplete='off'
						onChange={handleChange}
						value={value}
						inputProps={{
							maxLength: 4,
						}}
						size='small'
					/>
					<Button color='neutral' type='submit' variant='contained' sx={{ marginLeft: 1 }}>
						ENTER
					</Button>
				</Box>
			</form>

			<Box
				mt={2}
				sx={{
					display: 'grid',
					gridTemplateColumns: 'repeat(10, 1fr)',
					gridTemplateRows: 'repeat(5, 1fr)',
					gap: 0.5,
				}}
			>
				{HIRAGANA_KEYS.map((char, ind) => {
					const isHidden = char === 'X'

					if (char === 'C') {
						return (
							<KeyButton key={ind} onClick={handleConversionKeyClick} isMultipleLine={true}>
								<Typography variant='caption'>゛゜</Typography>
								<Typography variant='caption' whiteSpace='nowrap'>
									大⇔小
								</Typography>
							</KeyButton>
						)
					}
					if (char === 'B') {
						return (
							<KeyButton key={ind} onClick={handleBackspaceKeyClick}>
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
