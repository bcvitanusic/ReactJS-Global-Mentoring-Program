import styles from './page.module.css';
import React, { use, useState, useEffect, Suspense } from 'react';
// import MovieListPage from './components/MovieListPage/MovieListPage';
// import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
// import MovieDetailsPageWrapper from './components/MovieDetails/MovieDetailsPageWrapper';
// import SearchForm from './components/SearchForm/SearchForm';
// import MovieForm from './components/MovieForm/MovieForm';
// import Dialog from './components/Dialog/Dialog';
import { BsFillCheckCircleFill as MovieAddedIcon } from 'react-icons/bs';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import GenreSelect from '../components/GenreSelect/GenreSelect';
import MovieTile from '../components/MovieTile/MovieTile';
import GenreList from '../assets/utils';
import { getAllMovies } from '@/lib/getAllMovies';
import useSWR from 'swr';

// async function sortMovies(sortBy: string) {
// 	const res = await fetch(
// 		`http://localhost:4000/movies?sortBy=${sortBy}&sortOrder=asc`,
// 		{ cache: 'no-store' }
// 	);

// 	return res.json();
// }

export default async function Home() {
	const moviesList = await getAllMovies();
	// const mList = moviesList();
	console.log(moviesList);

	// const fetcher = (...args: any) => fetch(...args).then((res) => res.json());
	// const { data, error, isLoading } = useSWR(
	// 	'http://localhost:4000/movies?sortBy=title&sortOrder=desc',
	// 	fetcher
	// );

	// if (error) return <div>Failed to fetch users.</div>;
	// if (isLoading) return <h2>Loading...</h2>;

	// console.log('dataaaaa', data);

	// const moviesList = await getMoviesList();
	// console.log(moviesList);
	// const router = useRouter();
	// const pathname = usePathname();
	// const searchParams: any = useSearchParams();
	// let [searchParams, setSearchParams] = useSearchParams();

	// const [openAddMovie, setOpenAddMovie] = useState(false);
	// const [selectedGenre, setSelectedGenre] = useState(
	// 	searchParams.get('filter')
	// 		? searchParams.get('filter').toUpperCase()
	// 		: 'ALL'
	// );
	// const [moviesListState, setMoviesListState] = useState([]);
	// const [sortBy, setSortBy] = useState(
	// 	searchParams.get('sortBy') || 'release_date'
	// );
	// const [loading, setLoading] = useState(false);
	// const [error, setError] = useState(false);
	// const [searchQuery, setSearchQuery] = useState(
	// 	searchParams.get('search') ? searchParams.get('search') : ''
	// );
	// const [openAddMovieDialog, setOpenAddMovieDialog] = useState(false);
	// const [selectedMovie, setSelectedMovie] = useState(null);
	// const [openConfrmationDialog, setOpenConfimationDialog] = useState(false);

	// const [openEdit, setOpenEdit] = useState(false);

	// const onSelect = (genre) => {
	// 	searchParams.delete('search');
	// 	setSearchParams(searchParams);

	// 	setLoading(true);
	// 	searchParams.set('filter', genre === 'ALL' ? '' : genre.toLowerCase());
	// 	setSearchParams(searchParams);
	// 	if (genre === 'ALL') {
	// 		setSelectedGenre('ALL');
	// 		searchParams.delete('filter');
	// 		setSearchParams(searchParams);
	// 		fetch(`http://localhost:4000/movies`)
	// 			.then((res) => res.json())
	// 			.then((data) => {
	// 				setMoviesListState(data.data);
	// 			})
	// 			.catch(() => setError(true))
	// 			.finally(() => setLoading(false));
	// 	} else {
	// 		setSelectedGenre(genre.toUpperCase());

	// 		fetch(
	// 			`http://localhost:4000/movies?filter=${genre.toLowerCase()}&searchBy=title`
	// 		)
	// 			.then((res) => res.json())
	// 			.then((data) => {
	// 				setMoviesListState(data.data);
	// 			})
	// 			.catch(() => setError(true))
	// 			.finally(() => setLoading(false));
	// 	}
	// };
	// const sortMovies = (sortBy) => {
	// 	setLoading(true);
	// 	const controller = new AbortController();
	// 	setSelectedGenre('ALL');

	// 	searchParams.delete('search');
	// 	setSearchParams(searchParams);

	// 	let filter = searchParams.get('filter');
	// 	if (!filter) {
	// 		searchParams.delete('filter');
	// 		setSearchParams(searchParams);
	// 	}
	// 	searchParams.set('sortBy', sortBy);
	// 	setSearchParams(searchParams);

	// 	fetch(
	// 		`http://localhost:4000/movies?sortBy=${sortBy}&sortOrder=desc&searchBy=title`,
	// 		{
	// 			signal: controller.signal,
	// 		}
	// 	)
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			setMoviesListState(data.data);
	// 		})
	// 		.catch(() => setError(true))
	// 		.finally(() => setLoading(false));

	// 	setSortBy(sortBy);
	// 	return () => controller.abort();
	// };
	// const getMoviesList = () => {
	// 	setLoading(true);
	// 	const controller = new AbortController();

	// 	fetch(
	// 		`http://localhost:4000/movies?sortBy=${sortBy}&sortOrder=desc&search=${searchQuery}&searchBy=title&filter=${
	// 			selectedGenre.toLowerCase() === 'all' ? '' : selectedGenre.toLowerCase()
	// 		}`,

	// 		{
	// 			signal: controller.signal,
	// 		}
	// 	)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			setMoviesListState(data.data);
	// 		})
	// 		.catch(() => setError(true))
	// 		.finally(() => setLoading(false));

	// 	return () => controller.abort();
	// };

	// const searchMovies = (query) => {
	// 	setSearchParams({ search: query });
	// 	setSelectedGenre('ALL');
	// 	setSearchQuery(query);
	// 	setLoading(true);
	// 	const controller = new AbortController();

	// 	fetch(`http://localhost:4000/movies?search=${query}&searchBy=title`, {
	// 		signal: controller.signal,
	// 	})
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			setMoviesListState(data.data);
	// 		})
	// 		.catch(() => setError(true))
	// 		.finally(() => setLoading(false));
	// 	return () => controller.abort();
	// };

	// const addNewMovie = async (values) => {
	// 	const endPoint = 'http://localhost:4000/movies';

	// 	const options = {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({
	// 			title: values.title,
	// 			vote_average: parseInt(values.rating),
	// 			release_date: values.releaseDate,
	// 			poster_path: values.movieUrl,
	// 			overview: values.overview,
	// 			runtime: parseInt(values.runtime),
	// 			genres: [values.genre],
	// 		}),
	// 	};

	// 	const response = await fetch(endPoint, options);

	// 	const jsonRes = await response.json();
	// 	if (!jsonRes.messages) {
	// 		setOpenConfimationDialog(true);
	// 	}
	// };

	// const editMovie = async (values) => {
	// 	const endPoint = 'http://localhost:4000/movies';

	// 	const options = {
	// 		method: 'PUT',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({
	// 			title: values.title,
	// 			vote_average: parseInt(values.rating),
	// 			release_date: values.releaseDate,
	// 			poster_path: values.movieUrl,
	// 			overview: values.overview,
	// 			runtime: parseInt(values.runtime),
	// 			genres: [values.genre],
	// 			id: values.id,
	// 		}),
	// 	};

	// 	const response = await fetch(endPoint, options);
	// 	const jsonRes = await response.json();
	// 	if (!jsonRes.messages) {
	// 		setOpenConfimationDialog(true);
	// 	}
	// };

	// useEffect(() => {
	// 	if (location.pathname === '/new') {
	// 		setOpenAddMovieDialog(true);
	// 	}
	// 	getMoviesList();
	// }, []);

	return (
		<div className='main-page'>
			<Header
				onSearch={(searchQuery: string) => {
					// searchMovies(searchQuery);
				}}
				openDialog={() => {
					// setOpenAddMovieDialog(true);
				}}
				initialQuery={'aaa'}
			/>
			<GenreSelect
				GenreList={GenreList}
				selectedGenre={'ALL'}
				onSelect={(genre: any) => {
					// onSelectGenre(genre)
				}}
				onSelectSortBy={(id: number) => {
					if (id === 0) {
						// use(sortMovies('title'));
					} else {
						// use(sortMovies('release_date'));
					}
					// sortMovies(id);
				}}
				sortBy={'title'}
			/>
			<Suspense fallback={<div>Loading...</div>}>
				<MovieTile
					moviesList={moviesList.data}
					onSelectMovie={(id: number) => {
						window.scrollTo(0, 0);
					}}
				/>
			</Suspense>
			hahahahah
		</div>
	);
}
