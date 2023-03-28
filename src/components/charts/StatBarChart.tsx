import { mojibiState, mojibiStats } from '../../App'
import { BarChart, Bar, XAxis, YAxis, Cell } from 'recharts'

const StatBarChart = () => {
	const data = Object.entries(mojibiStats['lines']).map(([name, value]) => {
		return { name, value }
	})

	return (
		<BarChart width={330} height={300} data={data} layout='vertical'>
			<XAxis type='number' axisLine={false} tickLine={false} tick={false} height={10} />
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
						fill={
							index == mojibiState['completedLines'] && mojibiState['gameStatus'] != 'IN_PROGRESS'
								? '#538d4e'
								: '#3a3a3c'
						}
					/>
				))}
			</Bar>
		</BarChart>
	)
}

export default StatBarChart