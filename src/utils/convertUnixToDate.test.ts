import { convertUnixToDate } from './convertUnixToDate'

// the month argument range is from 0 to 11
describe('convertUnixToDate', () => {
	it('should return true', () => {
		expect(convertUnixToDate(new Date(2022, 8, 1).getTime())).toEqual('20220901')
		expect(convertUnixToDate(new Date(2030, 11, 31).getTime())).toEqual('20301231')
	})
})
