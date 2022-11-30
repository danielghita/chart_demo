import { useQuery } from 'react-query';
import CandlestickChart from './candlestick-chart';
import { fetchData } from '../data/loaders';
import { ResponsiveContainer } from 'recharts';

import './stock-info.css';


interface StockOptions {
	symbol: string;
}

export default function StockInfo({ symbol }: StockOptions) {
	const query = useQuery({ queryKey: ['quotes', symbol], queryFn: fetchData });
	return (
		<div className="StockInfo">
			<ResponsiveContainer width="80%" height={ 300 }>
				<CandlestickChart data={ query.data } />
			</ResponsiveContainer>
			{ JSON.stringify(query.data) }
		</div>
	);
}
