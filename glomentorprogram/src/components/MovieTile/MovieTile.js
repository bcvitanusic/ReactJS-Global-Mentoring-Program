import React from 'react';
import './MovieTile.css';
import MovieCard from './MovieCard';
function MovieTile({ moviesList, onSelectMovie }) {
	return (
		<div className='movieTile'>
			<div className='movies-found'>
				<p>6</p>
				<p> movies found</p>
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
							onSelectMovie={(id) => onSelectMovie(id)}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default MovieTile;
