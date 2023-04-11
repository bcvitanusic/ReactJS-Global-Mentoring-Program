import { render, screen } from '@testing-library/react';
import MovieTile from './MovieTile';
const mockedOnSelect = jest.fn();

const testList = [
	{
		id: 0,
		name: 'Pulp Fiction',
		description: 'Action & Adventure',
		year: 2004,
		longDesc: 'long desc',
	},
	{
		id: 1,
		name: 'Bohemian Rapsody',
		description: 'Drama, Biography, Music',
		year: 2003,
		longDesc:
			'Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight.	The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra',
	},
];

describe('SearchForm', () => {
	const renderMovieTile = () =>
		render(<MovieTile moviesList={testList} onSelectMovie={mockedOnSelect} />);

	test('if Movie Tile display correctly', () => {
		renderMovieTile();
		const logoImg = screen.getAllByRole('img');
		expect(logoImg).toHaveLength(2);
		const nameTitle = screen.getByText(/pulp fiction/i);
		expect(nameTitle).toBeInTheDocument();
		const nameTitle1 = screen.getByText(/bohemian rapsody/i);
		expect(nameTitle1).toBeInTheDocument();

		const desc = screen.getByText(/Action & Adventure/i);
		expect(desc).toBeInTheDocument();
		const desc1 = screen.getByText(/Drama, Biography, Music/i);
		expect(desc1).toBeInTheDocument();
		const year = screen.getByText(/2004/i);
		expect(year).toBeInTheDocument();
		const year1 = screen.getByText(/2003/i);
		expect(year1).toBeInTheDocument();
	});
});
