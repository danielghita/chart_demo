import { useQuery } from 'react-query';
import CandlestickChart from './candlestick-chart';
import { fetchData } from '../data/loaders';
import { ResponsiveContainer } from 'recharts';

import './stock-info.css';


interface StockOptions {
	symbol: string;
	start?: string;
	end?: string;
}

export default function StockInfo({ symbol, start, end }: StockOptions) {
	const query = useQuery({ queryKey: ['quotes', symbol, start || '', end || ''], queryFn: fetchData });
	return (
		<div className="StockInfo">
			<ResponsiveContainer width="80%" height={ 300 }>
				{ /* @ts-expect-error ResponsiveContainer adds width & height props to the child component but TS doesn't understand this */ }
				<CandlestickChart data={ query.data } />
			</ResponsiveContainer>
		</div>
	);
}
