/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/prop-types */
import { useState, useMemo, createContext } from 'react'

interface GlobalContextType {
	openHTP: boolean
	setOpenHTP: React.Dispatch<React.SetStateAction<boolean>>
	openStat: boolean
	setOpenStat: React.Dispatch<React.SetStateAction<boolean>>
	openCtC: boolean
	setOpenCtC: React.Dispatch<React.SetStateAction<boolean>>
	openErrorMsg: boolean
	setOpenErrorMsg: React.Dispatch<React.SetStateAction<boolean>>
	errorMsg: string
	setErrorMsg: React.Dispatch<React.SetStateAction<string>>
}

export const GlobalContext = createContext<GlobalContextType>({
	openHTP: false,
	setOpenHTP: () => {},
	openStat: false,
	setOpenStat: () => {},
	openCtC: false,
	setOpenCtC: () => {},
	openErrorMsg: false,
	setOpenErrorMsg: () => {},
	errorMsg: '',
	setErrorMsg: () => {},
})

interface GlobalProviderProps {
	children: React.ReactNode
	initialValues?: {
		openHTP?: boolean
		openStat?: boolean
		openCtC?: boolean
		openErrorMsg?: boolean
		errorMsg?: string
	}
	mockSetters?: {
		setOpenHTP?: React.Dispatch<React.SetStateAction<boolean>>
		setOpenStat?: React.Dispatch<React.SetStateAction<boolean>>
		setOpenCtC?: React.Dispatch<React.SetStateAction<boolean>>
		setOpenErrorMsg?: React.Dispatch<React.SetStateAction<boolean>>
		setErrorMsg?: React.Dispatch<React.SetStateAction<string>>
	}
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({
	children,
	initialValues,
	mockSetters,
}) => {
	const [openHTP, setOpenHTP] = useState<boolean>(initialValues?.openHTP || false)
	const [openStat, setOpenStat] = useState<boolean>(initialValues?.openStat || false)
	const [openCtC, setOpenCtC] = useState<boolean>(initialValues?.openCtC || false)
	const [openErrorMsg, setOpenErrorMsg] = useState<boolean>(initialValues?.openErrorMsg || false)
	const [errorMsg, setErrorMsg] = useState<string>(initialValues?.errorMsg || '')

	const contextValue = useMemo(() => {
		return {
			openHTP,
			setOpenHTP: mockSetters?.setOpenHTP || setOpenHTP,
			openStat,
			setOpenStat: mockSetters?.setOpenStat || setOpenStat,
			openErrorMsg,
			setOpenErrorMsg: mockSetters?.setOpenErrorMsg || setOpenErrorMsg,
			openCtC,
			setOpenCtC: mockSetters?.setOpenCtC || setOpenCtC,
			errorMsg,
			setErrorMsg: mockSetters?.setErrorMsg || setErrorMsg,
		}
	}, [
		openHTP,
		setOpenHTP,
		openStat,
		setOpenStat,
		openErrorMsg,
		setOpenErrorMsg,
		openCtC,
		setOpenCtC,
		errorMsg,
		setErrorMsg,
		mockSetters,
	])

	const hasVisited = localStorage.getItem('has_visited')
	if (hasVisited !== 'true') {
		setOpenHTP(true)
		localStorage.setItem('has_visited', 'true')
	}

	return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>
}

export default GlobalProvider
