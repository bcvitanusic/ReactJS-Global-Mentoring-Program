import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter', () => {
	const renderCounter = () => render(<Counter num={5} />);

	test('if props display correctly', () => {
		renderCounter();
		expect(screen.getByText(5)).toBeInTheDocument();
	});

	test('increments by click', () => {
		renderCounter();
		const buttonElement = screen.getByText('Increment');
		expect(buttonElement).toBeInTheDocument();
		userEvent.click(buttonElement);
		expect(screen.getByText(6)).toBeInTheDocument();
		// screen.debug();
	});

	test('decrements by click', () => {
		renderCounter();
		const buttonElement = screen.getByText('Decrement');
		expect(buttonElement).toBeInTheDocument();
		userEvent.click(buttonElement);
		expect(screen.getByText(4)).toBeInTheDocument();
		// screen.debug();
	});
});
