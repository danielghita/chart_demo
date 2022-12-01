import { QueryFunction } from 'react-query';
import { OHLC } from './types';

export const fetchData: QueryFunction<OHLC[], string[]> = async function (context) {
	const [, , start, end] = context.queryKey;
	const resp = await fetch('/data.json');
	const allData = await resp.json() as OHLC[];
	console.log('context', context)
	// we don't have server-side filtering of time interval so we simulate it here
	// in real life it would be undesirable to load all the data in the frontend, particularly when segments can be as small as one minute
	const data = allData.filter((item) => {
		const d = item.date.split('/').reverse().join('-');
		if ((start && d < start) || (end && d > end)) {
			return false;
		}
		return true;
	});
	return data;
}
