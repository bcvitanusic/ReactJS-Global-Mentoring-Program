'use client';
import React from 'react';
import './MovieTile.css';
import MovieCard from './MovieCard';
import { useMoviesContext } from '../../app/context/movieList';
function MovieTile({ movies }) {
	// const { moviesList, setMoviesList } = useMoviesContext();

	// setMoviesList(movies.data);
	return (
		<div className='movieTile'>
			<div className='movies-found'>
				<p>{movies.data.length}</p>
				<p>movies found</p>
			</div>
			<div className='card-list'>
				{movies.data.map((movie) => {
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
