import './MovieTile.css';

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
		<div className='movie-card' onClick={() => onSelectMovie(id)}>
			<img
				className='movie-poster'
				src={url}
				alt={name}
				width={400}
				height={550}
			/>
			<div className='card-heading'>
				<p>{name}</p>
				<p className='year'>{year}</p>
			</div>
			<p className='desc'>{description}</p>
		</div>
	);
};

export default MovieCard;
