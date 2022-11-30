export interface OHLC {
	date: string;
	open: number,
	high: number;
	low: number;
	close: number;
}

export interface OHLC2 extends OHLC {
	ts: string;
	openClose: readonly [number, number];
}