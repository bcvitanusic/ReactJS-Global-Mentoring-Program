import React, { useState } from 'react';

import './MovieListPage.css';
import Header from '../Header/Header';
import MovieDetails from '../MovieDetails/MovieDetails';
import GenreSelect from '../GenreSelect/GenreSelect';
import MovieTile from '../MovieTile/MovieTile';

import GenreList from '../../assets/utils';
import moviesList from '../../assets/moviesList';

function MovieListPage() {
	const [searchQuery, setSearchQuery] = useState('');
	const [sortCriterio, setSortCriterio] = useState(0);
	const [selectedGenre, setSelectedGenre] = useState('ALL');
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [moviesListState, setMoviesListState] = useState(
		moviesList.sort((a, b) => b.year - a.year)
	);
	const [sortBy, setSortBy] = useState(0);

	const onSelect = (genre) => {
		setSelectedGenre(genre.toUpperCase());
	};
	const sortMovies = (id) => {
		if (id === 0) {
			setMoviesListState(moviesListState.sort((a, b) => b.year - a.year));
		} else {
			setMoviesListState(
				moviesListState.sort((a, b) =>
					a.name !== b.name ? (a.name < b.name ? -1 : 1) : 0
				)
			);
		}
		setSortBy(id);
	};

	return (
		<div className='main-page'>
			{!selectedMovie && <Header />}
			{selectedMovie && (
				<MovieDetails
					url={selectedMovie.url}
					name={selectedMovie.name}
					rating={selectedMovie.rating}
					description={selectedMovie.description}
					year={selectedMovie.year}
					duration={selectedMovie.duration}
					longDdesc={selectedMovie.longDesc}
					onReturn={() => {
						setSelectedMovie(null);
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
			<MovieTile
				moviesList={moviesListState}
				onSelectMovie={(id) => {
					setSelectedMovie(moviesList.find((m) => m.id === id));
					window.scrollTo(0, 0);
				}}
			/>
		</div>
	);
}

export default MovieListPage;
