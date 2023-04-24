import React, { useState } from 'react';
import './Header.css';
import SearchForm from '../SearchForm/SearchForm';

function Header({ onSearch, openDialog, initialSearchQuery }) {
	return (
		<div className='app-header'>
			<SearchForm
				initialSearchQuery={initialSearchQuery}
				onSearch={(searchQuery) => {
					onSearch(searchQuery === '' ? '' : searchQuery);
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
