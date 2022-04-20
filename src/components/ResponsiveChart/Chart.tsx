import {
	Line,
	LineChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';

type dataType = {
	price: number;
	date: string;
};

const Chart = (props: any) => {
	return (
		<ResponsiveContainer width="100%" aspect={3}>
			<LineChart
				width={1400}
				height={700}
				data={props.data}
				margin={{ top: 10, right: 10, bottom: 20, left: 20 }}
			>
				<Line
					type="monotone"
					dataKey="price"
					stroke="#D7B2FF"
					strokeWidth={3}
					activeDot={{ stroke: 'black', strokeWidth: 1, r: 4 }}
				/>
				<CartesianGrid stroke="#EFEFEF" strokeDasharray="3 3" />
				<XAxis dataKey="date" label={{ value: 'Dates', position: 'bottom' }} />
				<YAxis
					dataKey="price"
					allowDecimals={false}
					interval={0}
					tick={true}
					tickSize={5}
					tickCount={7}
					label={{
						value: 'Price in USD',
						angle: -90,
						position: 'left',
					}}
				/>
				<Tooltip />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default Chart;
