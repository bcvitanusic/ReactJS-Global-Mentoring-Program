import React from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
import './MovieListPage.css';
import GenreSelect from '../GenreSelect/GenreSelect';
import MovieTile from '../MovieTile/MovieTile';
import Dialog from '../Dialog/Dialog';
import GenreList from '../../assets/utils';
import MovieForm from '../MovieForm/MovieForm';
import { useNavigate } from 'react-router-dom';

function MovieListPage({
	sortBy,
	loading,
	openDialog,
	closeDialog,
	selectedGenre,
	sortMovies,
	onSelectGenre,
	moviesList,
	error,
}) {
	const navigate = useNavigate();

	return (
		<div className='main-page'>
			<Outlet />
			<GenreSelect
				GenreList={GenreList}
				selectedGenre={selectedGenre}
				onSelect={(genre) => onSelectGenre(genre)}
				onSelectSortBy={(id) => {
					sortMovies(id);
				}}
				sortBy={sortBy}
			/>
			{!loading && (
				<MovieTile
					moviesList={moviesList}
					onSelectMovie={(id) => {
						navigate(`/${id}`);
						window.scrollTo(0, 0);
					}}
				/>
			)}
			{openDialog && (
				<Dialog onClose={() => closeDialog()}>
					<MovieForm
						onSubmit={() => console.log('submitted')}
						initialMovieInfo={{}}
						onClose={() => closeDialog()}
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
