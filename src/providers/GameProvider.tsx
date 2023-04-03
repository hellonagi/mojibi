/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo, createContext } from 'react'
import { DEFAULT_GRID } from '../constants/defaultGrid'
import { mojibiState } from '../App'
import { calcDateDiff } from '../utils/calcDateDiff'

interface GameContextType {
	currentWord: string
	setCurrentWord: React.Dispatch<React.SetStateAction<string>>
	enteredWords: string[]
	setEnteredWords: React.Dispatch<React.SetStateAction<string[]>>
	savedGrid: number[]
	setSavedGrid: React.Dispatch<React.SetStateAction<number[]>>
	isAnimating: boolean
	setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>
	animIndices: number[]
	setAnimIndices: React.Dispatch<React.SetStateAction<number[]>>
}

export const GameContext = createContext<GameContextType>({
	currentWord: '',
	setCurrentWord: () => {},
	enteredWords: [],
	setEnteredWords: () => {},
	savedGrid: [],
	setSavedGrid: () => {},
	isAnimating: false,
	setIsAnimating: () => {},
	animIndices: [],
	setAnimIndices: () => {},
})

interface GameProviderProps {
	children: React.ReactNode
	initialValues?: {
		currentWord?: string
		enteredWords?: string[]
		savedGrid?: number[]
		isAnimating?: boolean
		animIndices?: number[]
	}
	mockSetters?: {
		setCurrentWord?: React.Dispatch<React.SetStateAction<string>>
		setEnteredWords?: React.Dispatch<React.SetStateAction<string[]>>
		setSavedGrid?: React.Dispatch<React.SetStateAction<number[]>>
		setIsAnimating?: React.Dispatch<React.SetStateAction<boolean>>
		setAnimIndices?: React.Dispatch<React.SetStateAction<number[]>>
	}
}

const GameProvider: React.FC<GameProviderProps> = ({ children, initialValues, mockSetters }) => {
	const [currentWord, setCurrentWord] = useState<string>(initialValues?.currentWord || '')
	const [enteredWords, setEnteredWords] = useState<string[]>(initialValues?.enteredWords || [])
	const [savedGrid, setSavedGrid] = useState<number[]>(
		initialValues?.savedGrid || DEFAULT_GRID.concat()
	)
	const [isAnimating, setIsAnimating] = useState<boolean>(initialValues?.isAnimating || false)
	const [animIndices, setAnimIndices] = useState<number[]>(initialValues?.animIndices || [])

	const contextValue = useMemo(() => {
		return {
			currentWord,
			setCurrentWord: mockSetters?.setCurrentWord || setCurrentWord,
			enteredWords,
			setEnteredWords: mockSetters?.setEnteredWords || setEnteredWords,
			savedGrid,
			setSavedGrid: mockSetters?.setSavedGrid || setSavedGrid,
			isAnimating,
			setIsAnimating: mockSetters?.setIsAnimating || setIsAnimating,
			animIndices,
			setAnimIndices: mockSetters?.setAnimIndices || setAnimIndices,
		}
	}, [
		currentWord,
		setCurrentWord,
		enteredWords,
		setEnteredWords,
		savedGrid,
		setSavedGrid,
		isAnimating,
		setIsAnimating,
		animIndices,
		setAnimIndices,
		mockSetters,
	])

	const now = new Date()
	const daysSinceLastPlayed = calcDateDiff(new Date(mojibiState['lastPlayed']), now)
	useEffect(() => {
		if (daysSinceLastPlayed >= 1) {
			localStorage.setItem(
				'mojibi_state',
				JSON.stringify({
					...mojibiState,
					evaluations: DEFAULT_GRID,
					gameStatus: 'IN_PROGRESS',
					wordHistory: [],
					lastPlayed: now.getTime(),
				})
			)
		} else {
			setSavedGrid(mojibiState['evaluations'])
			setEnteredWords(mojibiState['wordHistory'])
		}
	}, [])

	return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
}

export default GameProvider
