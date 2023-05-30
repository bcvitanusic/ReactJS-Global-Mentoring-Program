import './MovieTile.css';
import Image from 'next/image';

const MovieCard = ({
	id,
	url,
	name,
	year,
	description,
	genreList,
	onSelectMovie,
}) => {
	return (
		<div className='movie-card' data-testid='movie-card'>
			<Image
				className='movie-poster'
				src={url}
				alt={name}
				width={400}
				height={550}
				onClick={() => onSelectMovie(id)}
			/>
			<div className='card-heading'>
				<p>{name}</p>
				<p className='year'>{year}</p>
			</div>
		</div>
	);
};

export default MovieCard;
