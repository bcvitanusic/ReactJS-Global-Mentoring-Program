'use client';
import React, { useState } from 'react';
import './GenreSelect.css';
import SortControl from '../SortControl/SortControl';
import {
	MoviesContextProvider,
	useMoviesContext,
} from '@/app/context/movieList';
import selectByGenre from '@/lib/selectByGenre';
import sortMovies from '@/lib/sortMovies';

const GenreSelect = ({ GenreList }) => {
	const { moviesList, setMoviesList } = useMoviesContext();
	const [selectedGenre, setSelectedGenre] = useState('ALL');

	const onSelect = async (genre) => {
		setSelectedGenre(genre.toLowerCase());
		const res = await selectByGenre(genre);
		setMoviesList(res.data);
	};

	const sortMoviess = async (sortBy) => {
		const res = await sortMovies(sortBy);
		setSelectedGenre('ALL');
		setMoviesList(res.data);
	};
	return (
		<div className='genre-select'>
			<div className='genre-list'>
				<ul>
					{GenreList.map((item) => {
						return (
							<li
								id={item.id}
								data-testid='genre-name'
								key={item.id}
								className={`${
									item.name.toUpperCase() === selectedGenre.toUpperCase() &&
									'active'
								} `}
								onClick={() => onSelect(item.name)}
							>
								<p className='genre-item'>{item.name}</p>
							</li>
						);
					})}
				</ul>
			</div>
			<SortControl
				onSelectSortBy={(id) => {
					if (id === 1) {
						sortMoviess('title');
					} else {
						sortMoviess('release_date');
					}
				}}
			/>
		</div>
	);
};

export default GenreSelect;
