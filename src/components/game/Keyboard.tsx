import { useState, useContext } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { GameContext } from '../game'
import { VALID_WORDS } from '../../constants/validWords'

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
		setCurrentWord(word)
		setValue(word)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		let isValid = false
		if (VALID_WORDS.includes(value)) {
			isValid = true
		}

		if (isValid) {
			setEnteredWords([...enteredWords, value])
			setValue('')
			console.log(enteredWords)
		} else {
			console.log('Not in word list')
		}
	}

	return (
		<Box textAlign='center' mt={2}>
			<form onSubmit={handleSubmit}>
				<TextField
					onChange={handleChange}
					value={value}
					InputProps={{
						endAdornment: (
							<Button type='submit' variant='contained'>
								ENTER
							</Button>
						),
					}}
					inputProps={{
						maxLength: 4,
					}}
				/>
			</form>
		</Box>
	)
}

export default Keyboard
