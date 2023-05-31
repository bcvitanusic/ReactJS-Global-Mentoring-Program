'use client';
import React, { useState } from 'react';
import './MovieDetails.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { VscSearch as SearchIcon } from 'react-icons/vsc';
import MovieForm from '../MovieForm/MovieForm';

function MovieDetails({ selectedMovie }) {
	const router = useRouter();

	const [openEditMovie, setOpenEditMovie] = useState(false);
	return (
		<div className='movie-details' data-testid='movie-details'>
			<div className='header'>
				<Link className='logo' href='/' aria-label='logo'>
					<div className='logo' aria-label='logo'>
						<p>netflix</p>
						<p>roulette</p>
					</div>
				</Link>
			</div>
			<div className='content-movie'>
				<div className='close-image-details'>
					<Link
						className='link-edit'
						href={{
							pathname: `/movies/${selectedMovie.id}/edit`,
							query: { movie: selectedMovie },
						}}
					>
						<p aria-label='edit-movie'>[edit]</p>
					</Link>

					<Link className='close-link' href={'/'}>
						<p>[close]</p>
					</Link>
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
			{/* {openEditMovie && (
				<div className='movie-form-edit'>
					<MovieForm
						initialMovieInfo={selectedMovie}
						onClose={() => setOpenEditMovie(false)}
						onSubmit={() => {}}
						title='Edit Movie'
					/>
				</div>
			)} */}
		</div>
	);
}

export default MovieDetails;
