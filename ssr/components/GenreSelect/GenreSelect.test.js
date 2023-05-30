/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GenreSelect from './GenreSelect';

const fakeList = [
	{
		id: 0,
		name: 'FIRST',
	},
	{
		id: 1,
		name: 'SECOND',
	},
	{
		id: 2,
		name: 'THIRD',
	},
];

const mockedOnSelect = jest.fn();

describe('GenreSelect', () => {
	const renderGenreSelect = () => {
		render(
			<GenreSelect
				GenreList={fakeList}
				selectedGenre={'SECOND'}
				onSelect={mockedOnSelect}
			/>
		);
	};
	test('renders all genres passed in props', () => {
		renderGenreSelect();
		const list = screen.getAllByRole('listitem');
		expect(list).toHaveLength(3);
		const genreNames = screen
			.getAllByTestId('genre-name')
			.map((li) => li.textContent);
		const fakeGenreNames = fakeList.map((c) => c.name);
		expect(genreNames).toEqual(fakeGenreNames);
	});

	test('component highlights selected genre passed in props', () => {
		renderGenreSelect();
		const items = screen.getAllByRole('listitem');
		expect(items[1]).toHaveClass('active');
	});

	test('after a click on genre button onchange callback', () => {
		renderGenreSelect();
		const items = screen.getAllByRole('listitem');
		fireEvent.click(items[0]);
		expect(mockedOnSelect).toBeCalledWith('FIRST');
	});
});
