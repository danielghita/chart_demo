import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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

test('StockInfo fetches data with the updated time interval', async () => {
	render(<App />);
	await act(() => {
		// wait for initial data load
		jest.advanceTimersByTime(100);
	});
	expect(fetch).toHaveBeenCalledWith('/data.json?symbol=SPY&start=2021-03-04&end=2022-03-03');
	// @ts-expect-error fetch is mocked
	fetch.mockClear();
	const startInput = screen.queryByLabelText('Start:');
	// react-query doesn't seem to play nice with fake timers so this prints warnings in the console (but the test passes)
	fireEvent.change(startInput!, {target: {value: '2021-07-01'}});
	await act(() => {
		// wait for the updated data load
		jest.advanceTimersByTime(100);
	});
	expect(fetch).toHaveBeenCalledWith('/data.json?symbol=SPY&start=2021-07-01&end=2022-03-03');
});
