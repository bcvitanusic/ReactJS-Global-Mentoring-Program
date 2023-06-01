import './MovieTile.css';
import Image from 'next/image';
import Link from 'next/link';

const MovieCard = ({ id, url, name, year, description, genreList }) => {
	return (
		<div className='movie-card' data-testid='movie-card'>
			<Link href={`/movies/${id}`}>
				<Image
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
			</Link>
		</div>
	);
};

export default MovieCard;
