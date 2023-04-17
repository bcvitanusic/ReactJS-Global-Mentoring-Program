import React from 'react';
import './MovieDetails.css';

import { VscSearch as SearchIcon } from 'react-icons/vsc';

function MovieDetails({
	url,
	name,
	rating,
	description,
	year,
	duration,
	longDdesc,
	onReturn,
}) {
	return (
		<div className='movie-details'>
			<div className='header'>
				<div className='logo' onClick={() => onReturn()} aria-label='logo'>
					<p>netflix</p>
					<p>roulette</p>
				</div>
				<div className='search'>
					<SearchIcon size={25} />
				</div>
			</div>
			<div className='content'>
				<div onClick={() => onReturn()} className='close-image-details'>
					[close]
				</div>
				<img
					className='poster-image'
					src={url}
					alt='Poster'
					width={270}
					height={410}
				/>
				<div className='movie-info'>
					<div className='movie-title'>
						<div className='heading'>
							<p name='title' className='title'>
								{name}
							</p>
							<div className='rating'>
								<p>{rating}</p>
							</div>
						</div>
						<div className='small-desc'>
							<p>{description}</p>
						</div>
					</div>
					<div className='year-duration'>
						<p>{year}</p>
						<p>{duration}min</p>
					</div>
					<div className='desc'>{longDdesc}</div>
				</div>
			</div>
		</div>
	);
}

export default MovieDetails;
