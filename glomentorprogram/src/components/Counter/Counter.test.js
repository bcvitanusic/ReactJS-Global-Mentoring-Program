/* eslint-disable testing-library/await-async-query */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';
import renderer from 'react-test-renderer';

describe('Counter', () => {
	const renderCounter = () => render(<Counter num={5} />);

	test('if props display correctly', () => {
		renderCounter();
		expect(screen.getByText(5)).toBeInTheDocument();
	});

	test('increments by click', () => {
		renderCounter();
		const buttonElement = screen.getByText(/increment/i);
		expect(buttonElement).toBeInTheDocument();
		userEvent.click(buttonElement);
		expect(screen.getByText(6)).toBeInTheDocument();
	});

	test('decrements by click', () => {
		renderCounter();
		const buttonElement = screen.getByText('Decrement');
		expect(buttonElement).toBeInTheDocument();
		userEvent.click(buttonElement);
		expect(screen.getByText(4)).toBeInTheDocument();
	});
});

describe('Counter snapshot', () => {
	it('renders', () => {
		const component = renderer.create(<Counter num={5} />);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('decrements value', () => {
		const component = renderer.create(<Counter num={5} />);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();

		component.root.findAllByType('button')[0].props.onClick();
		tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('increments value', () => {
		const component = renderer.create(<Counter num={5} />);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();

		component.root.findAllByType('button')[1].props.onClick();
		tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
