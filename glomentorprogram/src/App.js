import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import MovieListPage from './components/MovieListPage/MovieListPage';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import MovieDetailsPageWrapper from './components/MovieDetails/MovieDetailsPageWrapper';

const App = () => {
	let [searchParams, setSearchParams] = useSearchParams();

	const [openAddMovie, setOpenAddMovie] = useState(false);
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
	const [searchQuery, setSearchQuery] = useState(
		searchParams.get('search') ? searchParams.get('search') : ''
	);

	const onSelect = (genre) => {
		searchParams.delete('search');
		setSearchParams(searchParams);

		setLoading(true);
		searchParams.set('filter', genre === 'ALL' ? '' : genre.toLowerCase());
		setSearchParams(searchParams);
		if (genre === 'ALL') {
			setSelectedGenre('ALL');
			searchParams.delete('filter');
			setSearchParams(searchParams);
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
				`http://localhost:4000/movies?filter=${genre.toLowerCase()}&searchBy=title`
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
		setSelectedGenre('ALL');

		searchParams.delete('search');
		setSearchParams(searchParams);

		let filter = searchParams.get('filter');
		if (!filter) {
			searchParams.delete('filter');
			setSearchParams(searchParams);
		}
		searchParams.set('sortBy', sortBy);
		setSearchParams(searchParams);

		fetch(
			`http://localhost:4000/movies?sortBy=${sortBy}&sortOrder=desc&searchBy=title`,
			{
				signal: controller.signal,
			}
		)
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
		setLoading(true);
		const controller = new AbortController();

		fetch(
			`http://localhost:4000/movies?sortBy=${sortBy}&sortOrder=desc&search=${searchQuery}&searchBy=title&filter=${
				selectedGenre.toLowerCase() === 'all' ? '' : selectedGenre.toLowerCase()
			}`,

			{
				signal: controller.signal,
			}
		)
			.then((response) => response.json())
			.then((data) => {
				setMoviesListState(data.data);
			})
			.catch(() => setError(true))
			.finally(() => setLoading(false));

		return () => controller.abort();
	};

	const searchMovies = (query) => {
		setSearchParams({ search: query });
		setSelectedGenre('ALL');
		setSearchQuery(query);
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
		<div className='App'>
			<Routes>
				<Route
					path='/'
					element={
						<MovieListPage
							moviesList={moviesListState}
							openDialog={openAddMovie}
							closeDialog={() => setOpenAddMovie(false)}
							selectedGenre={selectedGenre}
							sortMovies={(id) => {
								if (id === 1) {
									sortMovies('title');
								} else {
									sortMovies('release_date');
								}
							}}
							onSelectGenre={(genre) => {
								onSelect(genre);
							}}
							loading={loading}
							sortBy={sortBy === 'title' ? 1 : 0}
							error={error}
						/>
					}
				>
					<Route
						path='/'
						element={
							<Header
								onSearch={(searchQuery) => {
									searchMovies(searchQuery);
								}}
								openDialog={() => {
									setOpenAddMovie(true);
								}}
								initialQuery={searchQuery}
							/>
						}
					/>
					<Route path=':movieId' element={<MovieDetailsPageWrapper />} />
				</Route>
			</Routes>

			{/* <Counter num={5} /> */}
		</div>
	);
};

export default App;
