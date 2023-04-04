import { mojibiState, mojibiStats } from '../../App'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell } from 'recharts'

const StatBarChart = () => {
	const data = Object.entries(mojibiStats['lines']).map(([name, value]) => {
		return { name, value }
	})

	const getFillColor = (i: number): string => {
		if (mojibiState['gameStatus'] != 'IN_PROGRESS') {
			if (i < 11) {
				if (i === mojibiState['completedLines']) return '#538d4e'
			} else if (i === 11) {
				if (i === mojibiState['completedLines'] - 1) return '#538d4e'
			}
		}
		return '#3a3a3c'
	}

	return (
		<ResponsiveContainer width='100%' height={290}>
			<BarChart data={data} layout='vertical'>
				<XAxis type='number' axisLine={false} tickLine={false} tick={false} height={0} />
				<YAxis
					dataKey='name'
					type='category'
					axisLine={false}
					tickLine={false}
					interval={0}
					width={20}
				/>
				<Bar dataKey='value' minPointSize={18} label={{ position: 'insideRight', fill: '#fff' }}>
					{data.map((entry, index) => (
						<Cell
							key={`cell-${index}`}
							fill={getFillColor(index)}
						/>
					))}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	)
}

export default StatBarChart
