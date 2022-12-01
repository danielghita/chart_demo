import React, { useState } from 'react';
import DateFilter from './date-filter';
import Stock from './stock-info';


const min = "2021-03-04";
const max = "2022-03-03";

function App() {
	const [{ start, end }, setStartEnd] = useState({ start: min, end: max });
	return (
		<div className="App">
			<header className="App-header">
				Chart demo
			</header>
			<DateFilter min="2021-03-04" max="2022-03-03" start={start} end={end} onChange={ setStartEnd } />
			<Stock symbol="SPY" start={ start } end={ end } />
		</div>
	);
}

export default App;
