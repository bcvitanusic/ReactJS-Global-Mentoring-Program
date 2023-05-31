'use client';
import React from 'react';
import './MovieTile.css';
import MovieCard from './MovieCard';
import { useMoviesContext } from '../../app/context/movieList';
function MovieTile({}) {
	const { moviesList } = useMoviesContext();

	return (
		<div className='movieTile'>
			<div className='movies-found'>
				<p>{moviesList.length}</p>
				<p>movies found</p>
			</div>
			<div className='card-list'>
				{moviesList.map((movie) => {
					return (
						<MovieCard
							key={movie.id}
							url={movie.poster_path}
							name={movie.title}
							year={movie.release_date}
							description={movie.description}
							id={movie.id}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default MovieTile;
