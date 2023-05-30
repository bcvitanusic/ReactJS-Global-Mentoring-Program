import { fireEvent, render, screen } from '@testing-library/react';
import MovieDetails from './MovieDetails';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const mockedFunc = jest.fn();
const selMovie = {
	id: 0,
	title: 'Pulp Fiction',
	tagline: 'description for movie',
	release_date: '2004-01-01',
	overview: 'long desc',
	genres: ['Drama'],
	vote_average: 8.4,
};

describe('Movie Details', () => {
	const renderMovieDetails = () =>
		render(
			<BrowserRouter>
				<Routes>
					<Route
						path='*'
						element={
							<MovieDetails selectedMovie={selMovie} onReturn={mockedFunc} />
						}
					/>
				</Routes>
			</BrowserRouter>
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
		const year = screen.getByText(/2004-01-01/i);
		expect(year).toBeInTheDocument();
		const longdesc = screen.getByText(/Long desc/i);
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
