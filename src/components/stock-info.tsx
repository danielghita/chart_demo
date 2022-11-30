import { useQuery } from 'react-query';
import { fetchData } from '../data/loaders';

interface StockOptions {
        symbol: string;
}

export default function StockInfo({ symbol }: StockOptions) {
	const query = useQuery({ queryKey: ['quotes', symbol], queryFn: fetchData });
	return <div>{ JSON.stringify(query.data) }</div>;
}
