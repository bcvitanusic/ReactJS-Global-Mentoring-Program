import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import GenreSelect from './components/GenreSelect/GenreSelect';
import Counter from './components/Counter/Counter.js';
import GenreList from './assets/utils.js';
import MovieTile from './components/MovieTile/MovieTile';
import moviesList from './assets/moviesList';
import MovieDetails from './components/MovieDetails/MovieDetails';
import MovieForm from './components/MovieForm/MovieForm';
import Dialog from './components/Dialog/Dialog';

const App = () => {
	const [selectedGenre, setSelectedGenre] = useState('ALL');
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [sortBy, setSortBy] = useState(0);
	const [moviesListState, setMoviesListState] = useState(
		moviesList.sort((a, b) => b.year - a.year)
	);
	const [openMovieForm, setOpenMovieForm] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);

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
			<button onClick={() => setOpenDialog(true)}>Open dialog</button>
			{openDialog && (
				<Dialog
					title={'Dialog title'}
					onClose={() => setOpenDialog(false)}
					children={<div className='dialog-sth'> caooo</div>}
				/>
			)}
			{!selectedMovie && <Header openDialog={() => setOpenMovieForm(true)} />}
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
			{openMovieForm && (
				<MovieForm
					initialMovieInfo={{
						title: 'Terminator',
						releaseDate: '2004',
						movieUrl: 'url',
						rating: '8.5',
						genre: 'comedy',
						runtime: '2h',
						overview: 'overview',
					}}
					onClose={() => setOpenMovieForm(false)}
					title={'EDIT MOVIE'}
					onSubmit={(movieInfo) => console.log(movieInfo)}
				/>
			)}

			{/* <Counter num={5} /> */}
		</div>
	);
};

export default App;
