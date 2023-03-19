import React, { useState } from 'react';
import './SearchForm.css';

function SearchForm({ initialSearchQuery, onSearch }) {
	const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
	return (
		<div className='search-form'>
			<div className='form-container'>
				<div className='input-field'>
					<input
						type={'search'}
						placeholder={initialSearchQuery}
						onChange={(e) => {
							setSearchQuery(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								onSearch(searchQuery);
							}
						}}
					/>
				</div>
				<button className='search-button' onClick={() => onSearch(searchQuery)}>
					<p>Search</p>
				</button>
			</div>
		</div>
	);
}

export default SearchForm;
