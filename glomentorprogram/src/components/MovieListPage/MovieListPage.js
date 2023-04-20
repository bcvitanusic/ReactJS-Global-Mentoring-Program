import React, { useEffect, useState } from 'react';

import './MovieListPage.css';
import Header from '../Header/Header';
import MovieDetails from '../MovieDetails/MovieDetails';
import GenreSelect from '../GenreSelect/GenreSelect';
import MovieTile from '../MovieTile/MovieTile';
import Dialog from '../Dialog/Dialog';
import GenreList from '../../assets/utils';
import MovieForm from '../MovieForm/MovieForm';

const defaultPoster = '../../assets/images/default-movie.jpg';

function MovieListPage() {
	const [selectedGenre, setSelectedGenre] = useState('ALL');
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [moviesListState, setMoviesListState] = useState([]);
	const [sortBy, setSortBy] = useState(0);
	const [loading, setLoading] = useState(false);
	const [openAddMovie, setOpenAddMovie] = useState(false);
	const [error, setError] = useState(false);

	const onSelect = (genre) => {
		setSelectedGenre(genre.toUpperCase());
		if (genre === 'ALL') {
			getMoviesList();
			return;
		}
		setLoading(true);
		fetch(`http://localhost:4000/movies?filter=${genre}`)
			.then((res) => res.json())
			.then((data) => {
				setMoviesListState(data.data);
			})
			.catch(() => setError(true))
			.finally(() => setLoading(false));
	};
	const sortMovies = (id) => {
		setLoading(true);
		const controller = new AbortController();

		if (id === 1) {
			fetch(`http://localhost:4000/movies?sortBy=title&sortOrder=desc`, {
				signal: controller.signal,
			})
				.then((res) => res.json())
				.then((data) => {
					setMoviesListState(data.data);
				})
				.catch(() => setError(true))
				.finally(() => setLoading(false));
		} else {
			fetch(`http://localhost:4000/movies?sortBy=release_date&sortOrder=asc`, {
				signal: controller.signal,
			})
				.then((res) => res.json())
				.then((data) => {
					setMoviesListState(data.data);
				})
				.catch(() => setError(true))
				.finally(() => setLoading(false));
		}
		setSortBy(id);
		return () => controller.abort();
	};

	const getMoviesList = () => {
		setLoading(true);
		const controller = new AbortController();

		fetch('http://localhost:4000/movies?sortBy=release_date&sortOrder=desc', {
			signal: controller.signal,
		})
			.then((response) => response.json())
			.then((data) => {
				setMoviesListState(data.data);
			})
			.catch(() => setError(true))
			.finally(() => setLoading(false));

		return () => controller.abort();
	};

	const searchMovies = (query) => {
		setLoading(true);
		const controller = new AbortController();

		fetch(`http://localhost:4000/movies?search=${query}&searchBy=title`, {
			signal: controller.signal,
		})
			.then((res) => res.json())
			.then((data) => {
				setMoviesListState(data.data);
			})
			.catch(() => setError(true))
			.finally(() => setLoading(false));
		return () => controller.abort();
	};

	useEffect(() => {
		getMoviesList();
	}, []);

	return (
		<div className='main-page'>
			{!selectedMovie && (
				<Header
					onSearch={(item) => {
						searchMovies(item);
					}}
					openDialog={() => {
						setOpenAddMovie(true);
					}}
				/>
			)}
			{selectedMovie && (
				<MovieDetails
					url={
						selectedMovie.poster_path
							? selectedMovie.poster_path
							: defaultPoster
					}
					name={selectedMovie.title}
					rating={selectedMovie.vote_average}
					description={selectedMovie.tagline}
					year={selectedMovie.release_date}
					// duration={selectedMovie.runtime}
					longDdesc={selectedMovie.overview}
					onReturn={() => {
						setSelectedMovie(null);
						getMoviesList();
					}}
				/>
			)}
			<GenreSelect
				GenreList={GenreList}
				selectedGenre={selectedGenre}
				onSelect={(genre) => onSelect(genre)}
				onSelectSortBy={(id) => {
					sortMovies(id);
				}}
				sortBy={sortBy}
			/>
			{!loading && (
				<MovieTile
					moviesList={moviesListState}
					onSelectMovie={(id) => {
						setSelectedMovie(moviesListState.find((m) => m.id === id));
						window.scrollTo(0, 0);
					}}
				/>
			)}
			{openAddMovie && (
				<Dialog onClose={() => setOpenAddMovie(false)}>
					<MovieForm
						onSubmit={() => console.log('submitted')}
						initialMovieInfo={{}}
						onClose={() => setOpenAddMovie(false)}
					/>
				</Dialog>
			)}
			{loading && (
				<div className='loading-wrapper'>
					<div className='loading-spinner' />
				</div>
			)}
			{error && <p>Error loading data...</p>}
		</div>
	);
}

export default MovieListPage;
