import { OHLC, OHLC2 } from '../data/types';


interface CandlestickProps extends OHLC2 {
	fill: string;
	x: number;
	y: number;
	width: number;
	height: number;
}


export default function Candlestick(props: CandlestickProps) {
	const {
		x,
		y,
		width,
		height,
		low,
		high,
		open,
		close,
	} = props;
	const isGrowing = open <= close;
	const color = isGrowing ? 'green' : 'red';
	// open === close needs to be handled in a better way, but for now this prevents NaN errors
	const ratio = open === close ? 1 : Math.abs(height / (open - close));
	const d = `
		M ${x},${y}
		L ${x},${y + height}
		L ${x + width},${y + height}
		L ${x + width},${y}
		z
	`;
	const bodyFill = isGrowing ? '#50a073' : '#d75541';
	const [yTop, yBottom] = isGrowing ? [y, y + height] : [y + height, y];
	const [boxLow, boxHigh] = isGrowing ? [open, close] : [close, open];
	return (
		<g stroke={ color } fill="none" strokeWidth="2">
			<path d={ d } fill={ bodyFill } />
			{/* bottom line */}
			<path d={ `M ${x + width / 2}, ${yBottom} v ${(boxLow - low) * ratio}` } />
			{/* top line */}
			<path d={ `M ${x + width / 2}, ${yTop} v ${(boxHigh - high) * ratio}` } />
		</g>
	);
};
