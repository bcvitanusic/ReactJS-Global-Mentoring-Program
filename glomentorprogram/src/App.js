import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import GenreSelect from './components/GenreSelect/GenreSelect';
import Counter from './components/Counter/Counter.js';
import GenreList from './assets/utils.js';
import MovieTile from './components/MovieTile/MovieTile';
import moviesList from './assets/moviesList';
import MovieDetails from './components/MovieDetails/MovieDetails';

const App = () => {
	const [selectedGenre, setSelectedGenre] = useState('ALL');
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [sortBy, setSortBy] = useState(0);
	const [moviesListState, setMoviesListState] = useState(
		moviesList.sort((a, b) => b.year - a.year)
	);

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
		<div className='App'>
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
			{/* <Counter num={5} /> */}
		</div>
	);
};

export default App;
