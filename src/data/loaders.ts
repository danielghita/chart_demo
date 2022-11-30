import { QueryFunction } from 'react-query';
import { OHLC } from './types';

export const fetchData: QueryFunction<OHLC[], string[]> = async function (context) {
	const resp = await fetch('/data.json');
	const data = await resp.json();
	return data;
}
