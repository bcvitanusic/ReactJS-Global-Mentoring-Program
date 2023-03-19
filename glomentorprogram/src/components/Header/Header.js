import React from 'react';
import './Header.css';
import SearchForm from '../SearchForm/SearchForm';

function Header() {
	return (
		<div className='app-header'>
			{/* <span>FIND YOUR MOVIE</span> */}
			<SearchForm
				initialSearchQuery={'What do you want to watch?'}
				onSearch={(searchQuery) => {}}
			/>
			<div className='header-top-addons'>
				<div className='logo'>
					<p className='first'>netflix</p>
					<p className='second'>roulette</p>
				</div>
				<div className='add-movie'>
					<button>+ add movie</button>
				</div>
				<header>find your movie</header>
			</div>
		</div>
	);
}

export default Header;
