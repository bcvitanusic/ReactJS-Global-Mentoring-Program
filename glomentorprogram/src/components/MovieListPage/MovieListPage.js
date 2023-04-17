import React, { useEffect, useState } from 'react';

import './MovieListPage.css';
import Header from '../Header/Header';
import MovieDetails from '../MovieDetails/MovieDetails';
import GenreSelect from '../GenreSelect/GenreSelect';
import MovieTile from '../MovieTile/MovieTile';

import GenreList from '../../assets/utils';
import moviesList from '../../assets/moviesList';

const defaultPoster = '../../assets/images/default-movie.jpg';

function MovieListPage() {
	const [selectedGenre, setSelectedGenre] = useState('ALL');
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [moviesListState, setMoviesListState] = useState([]);
	const [sortBy, setSortBy] = useState(0);
	const [loading, setLoading] = useState(false);

	const onSelect = (genre) => {
		if (genre === 'ALL') {
			getMoviesList();
			return;
		}
		setSelectedGenre(genre.toUpperCase());
		fetch(`http://localhost:4000/movies?filter=${genre}`)
			.then((res) => res.json())
			.then((data) => {
				setMoviesListState(data.data);
				setLoading(false);
			});
	};
	const sortMovies = (id) => {
		if (id === 1) {
			fetch(`http://localhost:4000/movies?sortBy=title&sortOrder=desc`)
				.then((res) => res.json())
				.then((data) => {
					setMoviesListState(data.data);
				});
		} else {
			fetch(`http://localhost:4000/movies?sortBy=release_date&sortOrder=asc`)
				.then((res) => res.json())
				.then((data) => {
					setMoviesListState(data.data);
				});
		}
		setSortBy(id);
	};

	const getMoviesList = async () => {
		setLoading(true);
		fetch('http://localhost:4000/movies?sortBy=release_date&sortOrder=desc')
			.then((response) => response.json())
			.then((data) => {
				if (data) {
					setMoviesListState(data.data);
					setLoading(false);
				}
			});
	};

	const searchMovies = (query) => {
		setLoading(true);
		fetch(`http://localhost:4000/movies?search=${query}&searchBy=title`)
			.then((res) => res.json())
			.then((data) => {
				setMoviesListState(data.data);
				setLoading(false);
			});
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
					duration={selectedMovie.runtime}
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
		</div>
	);
}

export default MovieListPage;
