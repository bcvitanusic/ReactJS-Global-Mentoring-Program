/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen } from '@testing-library/react';
import SortControl from './SortControl';

const mockedOnSelect = jest.fn();

describe('SortControl', () => {
	const renderSortControl = () => {
		render(<SortControl sortBy={0} onSelectSortBy={mockedOnSelect} />);
	};
	test('renders all genres passed in props', () => {
		renderSortControl();
		const sortby = screen.getByText(/release date/i);
		expect(sortby).toBeInTheDocument();
	});

	test('after a click on sort by onchange callback', () => {
		renderSortControl();
		const arrow = screen.getByLabelText('arrow');
		expect(arrow).toBeInTheDocument();
		fireEvent.click(arrow);
		const items = screen.getAllByRole('listitem');
		expect(items).toHaveLength(2);
		fireEvent.click(items[1]);
		expect(mockedOnSelect).toBeCalledWith(1);
	});
});
