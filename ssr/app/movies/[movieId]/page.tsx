import getMovie from '@/lib/getMovie';
import React from 'react';
import MovieDetails from '../../../components/MovieDetails/MovieDetails';

type Params = {
	params: {
		movieId: number;
	};
};

export default async function MoviePage({ params: { movieId } }: Params) {
	const movie = await getMovie(movieId);

	return (
		<div className='moviePage'>
			<MovieDetails selectedMovie={movie} />
		</div>
	);
}
