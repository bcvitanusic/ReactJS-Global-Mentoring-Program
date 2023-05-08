import React from 'react';
import './MovieDetails.css';
import { useNavigate } from 'react-router-dom';

import { VscSearch as SearchIcon } from 'react-icons/vsc';

function MovieDetails({ selectedMovie, onReturn, onOpenEdit }) {
	const navigate = useNavigate();

	return (
		<div className='movie-details' data-testid='movie-details'>
			<div className='header'>
				<div className='logo' onClick={() => onReturn()} aria-label='logo'>
					<p>netflix</p>
					<p>roulette</p>
				</div>
				<div className='search'>
					<SearchIcon size={25} />
				</div>
			</div>
			<div className='content-movie'>
				<div className='close-image-details'>
					<p
						onClick={() => {
							navigate(`edit`);
							onOpenEdit();
						}}
					>
						[edit]
					</p>
					<p onClick={() => onReturn()}>[close]</p>
				</div>
				<img
					className='poster-image'
					src={selectedMovie.poster_path}
					alt='Poster'
					width={270}
					height={410}
				/>
				<div className='movie-info'>
					<div className='movie-title'>
						<div className='heading'>
							<p name='title' className='title'>
								{selectedMovie.title}
							</p>
							<div className='rating'>
								<p>{selectedMovie.vote_average}</p>
							</div>
						</div>
						<div className='small-desc'>
							<p>{selectedMovie.tagline}</p>
						</div>
					</div>
					<div className='year-duration'>
						<p>{selectedMovie.release_date}</p>
					</div>
					<div className='desc'>{selectedMovie.overview}</div>
				</div>
			</div>
		</div>
	);
}

export default MovieDetails;
