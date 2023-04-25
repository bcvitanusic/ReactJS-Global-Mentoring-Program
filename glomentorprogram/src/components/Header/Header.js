import React, { useEffect } from 'react';
import './Header.css';
import SearchForm from '../SearchForm/SearchForm';
import { useSearchParams } from 'react-router-dom';

function Header({ openDialog }) {
	let [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {}, [searchParams.get('search')]);
	let initialQuery =
		searchParams.get('search') ?? 'What do you want to search?';

	return (
		<div className='app-header'>
			<SearchForm
				initialSearchQuery={initialQuery}
				onSearch={(searchQuery) => {
					searchParams.set('search', searchQuery);
					setSearchParams(searchParams);
				}}
			/>
			<div className='header-top-addons'>
				<div className='logo'>
					<p className='first'>netflix</p>
					<p className='second'>roulette</p>
				</div>
				<div className='add-movie'>
					<button onClick={openDialog}>+ add movie</button>
				</div>
				<header>find your movie</header>
			</div>
		</div>
	);
}

export default Header;
