import React from 'react';
import { render, screen } from '@testing-library/react';
import App, { queryClient } from './app';
import { act } from 'react-dom/test-utils';

// create-react-app uses an old version of jest which doesn't have fake timers set by default
jest.useFakeTimers();

const mockData = [{
	date: "04/03/2021",
	open: 381.220001,
	high: 384,
	low: 371.880005,
	close: 376.700012,
	volume: 183433000,
}, {
	date: "05/03/2021",
	open: 380.459991,
	high: 384.76001,
	low: 372.640015,
	close: 383.630005,
	volume: 152039600,
}];

global.fetch = jest.fn(async () => ({
	async json() {
		return mockData;
	}
}) as Response);

// empty mock
window.ResizeObserver = jest.fn(() => ({
	disconnect() {},
	observe() {},
})) as any;

afterEach(() => {
	// clear caches after each test
	queryClient.clear();
});

test('App renders title', async () => {
	render(<App />);
	await act(() => {
		// wait for initial data load
		jest.advanceTimersByTime(100);
	});
	const title = screen.getByText(/Chart demo/i);
	expect(title).toBeInTheDocument();
});

test('StockInfo fetches data on load', async () => {
	render(<App />);
	await act(() => {
		// wait for initial data load
		jest.advanceTimersByTime(100);
	});
	expect(fetch).toHaveBeenCalled();
});
