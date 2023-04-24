import { fireEvent, render, screen } from '@testing-library/react';
import MovieDetails from './MovieDetails';
import moviesList from '../../assets/moviesList';

const mockedFunc = jest.fn();

describe('Movie Details', () => {
	const renderMovieDetails = () =>
		render(
			<MovieDetails
				url={moviesList[0].url}
				name={'Pulp Fiction'}
				rating={8.4}
				description={'description for movie'}
				year={1984}
				longDdesc={'Long description'}
				onReturn={mockedFunc}
			/>
		);

	test('if props in MovieDetails display correctly', () => {
		renderMovieDetails();
		const logoImg = screen.getByRole('img');
		expect(logoImg).toBeInTheDocument();
		const nameTitle = screen.getByText(/pulp fiction/i);
		expect(nameTitle).toBeInTheDocument();
		const rating = screen.getByText(/8.4/i);
		expect(rating).toBeInTheDocument();
		const desc = screen.getByText(/description for movie/i);
		expect(desc).toBeInTheDocument();
		const year = screen.getByText(/1984/i);
		expect(year).toBeInTheDocument();
		const longdesc = screen.getByText(/Long description/i);
		expect(longdesc).toBeInTheDocument();
	});

	test('if func calls', () => {
		renderMovieDetails();
		const logo = screen.getByLabelText('logo');
		expect(logo).toBeInTheDocument();
		fireEvent.click(logo);
		expect(mockedFunc).toBeCalled();
	});
});
