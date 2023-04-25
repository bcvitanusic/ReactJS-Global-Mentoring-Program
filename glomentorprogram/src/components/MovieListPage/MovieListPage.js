import React, { useEffect, useState } from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
import './MovieListPage.css';
import GenreSelect from '../GenreSelect/GenreSelect';
import MovieTile from '../MovieTile/MovieTile';
import Dialog from '../Dialog/Dialog';
import GenreList from '../../assets/utils';
import MovieForm from '../MovieForm/MovieForm';
import { useNavigate } from 'react-router-dom';

function MovieListPage({ openDialog, closeDialog }) {
	let [searchParams, setSearchParams] = useSearchParams();
	const [selectedGenre, setSelectedGenre] = useState(
		searchParams.get('filter')
			? searchParams.get('filter').toUpperCase()
			: 'ALL'
	);
	const [moviesListState, setMoviesListState] = useState([]);
	const [sortBy, setSortBy] = useState(
		searchParams.get('sortBy') || 'release_date'
	);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	const onSelect = (genre) => {
		let itemSearch = searchParams.get('search');
		setLoading(true);
		searchParams.set('filter', genre === 'ALL' ? '' : genre.toLowerCase());
		setSearchParams(searchParams);
		if (genre === 'ALL') {
			setSelectedGenre('ALL');
			fetch(`http://localhost:4000/movies`)
				.then((res) => res.json())
				.then((data) => {
					setMoviesListState(data.data);
				})
				.catch(() => setError(true))
				.finally(() => setLoading(false));
		} else {
			setSelectedGenre(genre.toUpperCase());

			fetch(
				`http://localhost:4000/movies?filter=${genre.toLowerCase()}&search=${itemSearch}`
			)
				.then((res) => res.json())
				.then((data) => {
					setMoviesListState(data.data);
				})
				.catch(() => setError(true))
				.finally(() => setLoading(false));
		}
	};
	const sortMovies = (sortBy) => {
		setLoading(true);
		const controller = new AbortController();
		searchParams.set('search', '');
		searchParams.set('sortBy', sortBy);
		setSearchParams(searchParams);

		fetch(`http://localhost:4000/movies?sortBy=${sortBy}&sortOrder=desc`, {
			signal: controller.signal,
		})
			.then((res) => res.json())
			.then((data) => {
				setMoviesListState(data.data);
			})
			.catch(() => setError(true))
			.finally(() => setLoading(false));

		setSortBy(sortBy);
		return () => controller.abort();
	};
	const getMoviesList = () => {
		console.log('here');
		console.log('SP from getMoviesList', searchParams);
		let itemSearch = searchParams.get('search');
		let filter = searchParams.get('filter');

		setLoading(true);
		const controller = new AbortController();

		fetch(
			`http://localhost:4000/movies?sortBy=${sortBy}&sortOrder=desc&search=${itemSearch}&searchBy=title&filter=${filter}`,
			{
				signal: controller.signal,
			}
		)
			.then((response) => response.json())
			.then((data) => {
				setMoviesListState(data.data);
				console.log(data);
			})
			.catch(() => setError(true))
			.finally(() => setLoading(false));

		return () => controller.abort();
	};

	const searchMovies = () => {
		let query = searchParams.get('search') || '';

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

	useEffect(() => {
		searchMovies();
	}, [searchParams.get('search')]);

	return (
		<div className='main-page'>
			<Outlet />
			<GenreSelect
				GenreList={GenreList}
				selectedGenre={selectedGenre}
				onSelect={(genre) => onSelect(genre)}
				onSelectSortBy={(id) => {
					if (id === 1) {
						sortMovies('title');
					} else {
						sortMovies('release_date');
					}
				}}
				sortBy={sortBy === 'title' ? 1 : 0}
			/>
			{!loading && (
				<MovieTile
					moviesList={moviesListState}
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
