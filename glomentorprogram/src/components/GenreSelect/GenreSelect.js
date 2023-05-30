'use client';
import React from 'react';
import './GenreSelect.css';
import SortControl from '../SortControl/SortControl';

const GenreSelect = ({
	GenreList,
	selectedGenre,
	onSelect,
	onSelectSortBy,
	sortBy,
}) => {
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
			<SortControl
				sortBy={sortBy}
				onSelectSortBy={(id) => {
					onSelectSortBy(id);
				}}
			/>
		</div>
	);
};

export default GenreSelect;
