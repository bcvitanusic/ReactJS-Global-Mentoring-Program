'use client';
import React, { useState } from 'react';
import './SortControl.css';
import { FaSort } from 'react-icons/fa';

const sortOptions = [
	{
		id: 0,
		label: 'RELEASE DATE',
		active: true,
	},
	{
		id: 1,
		label: 'TITLE',
		active: false,
	},
];

function SortControl({ onSelectSortBy }) {
	const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
	const [sortBy, setSortBy] = useState(0);

	return (
		<div className='movie-sort'>
			<div className='label'>
				<p>Sort By</p>
			</div>
			<div
				className='sort-type'
				onMouseEnter={() => setSortDropdownOpen(!sortDropdownOpen)}
			>
				<div
					className='active-sort'
					onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
					onBlur={() => setSortDropdownOpen(!sortDropdownOpen)}
				>
					<div className='active-label'>
						<p>{sortBy === 0 ? 'Release Date' : 'Title'}</p>
					</div>
					<FaSort size={18} className='arrow' aria-label='arrow' />
				</div>

				{sortDropdownOpen && (
					<div className='dropdown'>
						<ul>
							{sortOptions.map((option) => (
								<li
									className={`${sortBy === option.id && 'active'}`}
									key={option.id}
									onClick={() => {
										setSortBy(option.id);
										onSelectSortBy(option.id);
										setSortDropdownOpen(false);
									}}
								>
									{option.label}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}

export default SortControl;
