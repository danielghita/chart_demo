import React from 'react';
import Stock from './stock-info';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				Chart demo
			</header>
			<Stock symbol="SPY" />
		</div>
	);
}

export default App;
