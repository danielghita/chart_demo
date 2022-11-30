import { QueryFunction } from 'react-query';

export const fetchData: QueryFunction<any, string[]> = async function (context) {
	const resp = await fetch('/data.json');
	const data = await resp.json();
	return data;
}
