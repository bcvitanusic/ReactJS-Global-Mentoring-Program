'use client';
import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Link from 'next/link';
import './Header.css';
import { useRouter, useSearchParams } from 'next/navigation';
import searchMovies from '@/lib/searchMovies';
import { useMoviesContext } from '../../app/context/movieList';
import { getAllMovies } from '@/lib/getAllMovies';

function Header({ initialQuery }) {
	const { setMoviesList } = useMoviesContext();
	const [openDialog, setOpenDialog] = useState(false);
	const router = useRouter();

	const searchParams = useSearchParams();
	const query = searchParams.get('query');

	const searchMoviess = async (searchQuery) => {
		if (
			query === null &&
			(searchQuery === null || searchQuery === initialQuery)
		) {
			const res = await getAllMovies();
			setMoviesList(res.data);
			return;
		}
		const res = await searchMovies(query ?? searchQuery);
		router.push(`/?query=${searchQuery}`);

		setMoviesList(res.data);
	};

	useEffect(() => {
		searchMoviess(query);
	}, [query]);

	return (
		<div className='app-header'>
			<div className='bg' />
			<div className='header-top-addons'>
				<Link href={'/'} className='logo'>
					<p className='first'>netflix</p>
					<p className='second'>roulette</p>
				</Link>

				<div
					className='add-movie'
					onClick={() => {
						router.push('/new', undefined, { shallow: true });
						setOpenDialog(true);
					}}
				>
					<button aria-label='add-movie-button'>+ add movie</button>
				</div>

				<header>find your movie</header>
				<SearchForm
					initialSearchQuery={query === null ? initialQuery : query}
					onSearch={(searchQuery) => {
						searchMoviess(searchQuery);
					}}
				/>
			</div>
			{openDialog && <div onClick={() => setOpenDialog(false)}>hahah</div>}
		</div>
	);
}

export default Header;
