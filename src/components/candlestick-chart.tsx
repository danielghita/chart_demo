import { useMemo } from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
} from 'recharts';
import Candlestick from './candlestick-item';
import { OHLC, OHLC2 } from '../data/types';


const prepareData = (rawData: OHLC[]): [OHLC2[], { min: number, max: number }] => {
	if (!rawData?.length) {
		return [[], { min: 0, max: 1 }];
	}
	const info = {
		min: rawData[0].low,
		max: rawData[0].high,
	}
	const data = rawData.map((item) => {
		const { open, close, high, low } = item;
		if (low < info.min) {
			info.min = low;
		}
		if (high > info.max) {
			info.max = high;
		}
		const ts = item.date.split('/').reverse().join('-');
		return {
			...item,
			ts,
			openClose: [open, close] as const,
		};
	});
	return [data, info];
}

interface CandlestickChartProps {
	data: OHLC[];
	height?: number;
	width?: number;
}

export default function CandlestickChart({ data: rawData, height, width }: CandlestickChartProps) {
	const [data, info] = useMemo(() =>
		prepareData(rawData),
	[rawData]);

	return (
		<BarChart
			width={width}
			height={height}
			data={data}
			margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
		>
			<XAxis dataKey="ts" />
			<YAxis domain={ [info.min, info.max ]} />
			<CartesianGrid strokeDasharray="3 3" />
			<Bar
				dataKey="openClose"
				fill="#8884d8"
				shape={ Candlestick }
				// label={{ position: 'top' }}
			>
			</Bar>
		</BarChart>
	);
};
