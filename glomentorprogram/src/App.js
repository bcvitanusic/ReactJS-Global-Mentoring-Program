import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import MovieListPage from './components/MovieListPage/MovieListPage';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import MovieDetailsPageWrapper from './components/MovieDetails/MovieDetailsPageWrapper';
import SearchForm from './components/SearchForm/SearchForm';
import MovieForm from './components/MovieForm/MovieForm';
import Dialog from './components/Dialog/Dialog';
import { BsFillCheckCircleFill as MovieAddedIcon } from 'react-icons/bs';

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
	const [openAddMovieDialog, setOpenAddMovieDialog] = useState(false);
	const [openConfrmationDialog, setOpenConfimationDialog] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

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

	const addNewMovie = async (values) => {
		const endPoint = 'http://localhost:4000/movies';

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: values.title,
				vote_average: parseInt(values.rating),
				release_date: values.releaseDate,
				poster_path: values.movieUrl,
				overview: values.overview,
				runtime: parseInt(values.runtime),
				genres: [values.genre],
			}),
		};

		const response = await fetch(endPoint, options);
		const jsonRes = await response.json();
		if (!jsonRes.messages) {
			setOpenConfimationDialog(true);
		}
	};

	useEffect(() => {
		if (location.pathname === '/new') {
			setOpenAddMovieDialog(true);
		}
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
									setOpenAddMovieDialog(true);
								}}
								initialQuery={searchQuery}
							/>
						}
					>
						<Route
							path='/'
							element={
								<SearchForm
									initialSearchQuery={searchQuery}
									onSearch={(query) => {
										searchMovies(query);
									}}
								/>
							}
						/>
						{openAddMovieDialog && (
							<Route
								path='/new'
								element={
									<Dialog
										onClose={() => {
											navigate('/');
											setOpenAddMovieDialog(false);
										}}
									>
										<MovieForm
											onSubmit={(values) => addNewMovie(values)}
											initialMovieInfo={{}}
											onClose={() => {
												navigate('/');
												setOpenAddMovieDialog(false);
											}}
										/>
									</Dialog>
								}
							/>
						)}
					</Route>
					<Route path=':movieId' element={<MovieDetailsPageWrapper />} />
				</Route>
			</Routes>

			{openConfrmationDialog && (
				<Dialog
					onClose={() => setOpenConfimationDialog(false)}
					className='dialog-sth'
				>
					<div className='added-movie'>
						<MovieAddedIcon size={70} className='icon-success' />
						<p className='added-title'>Congratulations</p>
						<p className='added-content'>
							The movie has been added to database successfully
						</p>
					</div>
				</Dialog>
			)}

			{/* <Counter num={5} /> */}
		</div>
	);
};

export default App;
