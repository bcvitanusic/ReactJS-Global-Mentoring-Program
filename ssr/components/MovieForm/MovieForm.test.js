import { fireEvent, render, screen } from '@testing-library/react';
import MovieForm from './MovieForm';

const mockedFunc = jest.fn();
const mockedSubmit = jest.fn();

const initialMovie = {
	title: 'Terminator',
	release_date: '2004-01-01',
	poster_path: 'url',
	vote_average: '8.5',
	genres: ['Comedy'],
	runtime: '101',
	overview: 'overview',
};

describe('Movie Details', () => {
	const renderMovieForm = () =>
		render(
			<MovieForm
				initialMovieInfo={initialMovie}
				onClose={mockedFunc}
				onSubmit={mockedSubmit}
			/>
		);

	test('if props in MovieDetails display correctly', () => {
		renderMovieForm();
		const title = screen.getByDisplayValue(/terminator/i);
		expect(title).toBeInTheDocument();
		const releaseDate = screen.getByDisplayValue(/2004-01-01/i);
		expect(releaseDate).toBeInTheDocument();
		const rating = screen.getByDisplayValue(/8.5/i);
		expect(rating).toBeInTheDocument();
		const genre = screen.getByDisplayValue(/comedy/i);
		expect(genre).toBeInTheDocument();
		const runtime = screen.getByDisplayValue(/101/i);
		expect(runtime).toBeInTheDocument();
		const overview = screen.getByDisplayValue(/overview/i);
		expect(overview).toBeInTheDocument();
		const url = screen.getByDisplayValue(/url/i);
		expect(url).toBeInTheDocument();
		const close = screen.getByLabelText('close-form');
		expect(close).toBeInTheDocument();
		fireEvent.click(close);
		expect(mockedFunc).toBeCalled();
	});

	test('if func submit calls', () => {
		renderMovieForm();
		const submit = screen.getByText(/submit/i);
		expect(submit).toBeInTheDocument();
		fireEvent.click(submit);
		expect(mockedSubmit).toBeCalled();
	});
});
