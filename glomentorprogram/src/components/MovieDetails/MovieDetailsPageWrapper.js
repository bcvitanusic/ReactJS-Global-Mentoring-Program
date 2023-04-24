import React, { useState, useEffect } from 'react';
import MovieDetails from './MovieDetails';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function MovieDetailsPageWrapper({ onReturn }) {
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const { movieId } = useParams();
	const navigate = useNavigate();

	const getMovieById = (id) => {
		const controller = new AbortController();
		setLoading(true);
		fetch(`http://localhost:4000/movies/${id}`, {
			signal: controller.signal,
		})
			.then((response) => response.json())
			.then((data) => {
				setSelectedMovie(data);
			})
			.catch(() => setError(true))
			.finally(() => setLoading(false));

		return () => controller.abort();
	};

	useEffect(() => {
		getMovieById(movieId);
	}, [movieId]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error...</div>;
	}
	if (selectedMovie) {
		return (
			<MovieDetails
				selectedMovie={selectedMovie}
				onReturn={() => {
					navigate('/');
				}}
			/>
		);
	}
}

export default MovieDetailsPageWrapper;
