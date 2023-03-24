import React, { useState } from 'react';
import './GenreSelect.css';

const GenreSelect = ({ GenreList, selectedGenre, onSelect }) => {
	return (
		<div className='genre-select'>
			<div className='genre-list'>
				<ul>
					{GenreList.map((item, index) => {
						return (
							<li
								key={index}
								className={`${
									item.name.toUpperCase() === selectedGenre && 'active'
								} `}
								onClick={() => onSelect(item.name)}
							>
								<p className='genre-item'>{item.name}</p>
							</li>
						);
					})}
				</ul>
			</div>
			<div className='movie-sort'>
				<p>Sort by: something</p>
			</div>
		</div>
	);
};

export default GenreSelect;
