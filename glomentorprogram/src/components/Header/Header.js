import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function Header({ openDialog, initialQuery, onSearch }) {
	const navigate = useNavigate();

	return (
		<div className='app-header'>
			<Outlet />
			<div className='header-top-addons'>
				<div className='logo'>
					<p className='first'>netflix</p>
					<p className='second'>roulette</p>
				</div>
				<div className='add-movie'>
					<button
						onClick={() => {
							openDialog();
							navigate('/new');
						}}
					>
						+ add movie
					</button>
				</div>
				<header>find your movie</header>
			</div>
		</div>
	);
}

export default Header;

{
}
