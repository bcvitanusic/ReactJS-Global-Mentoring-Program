import React, { useState } from 'react';
import ButtonSearch from './ButtonSearch/ButtonSearch';
import './SearchForm.css';

function SearchForm({ initialSearchQuery, onSearch }) {
	const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
	const onSearchPress = () => {
		setSearchQuery('What do you want to search?');
		onSearch(searchQuery);
	};
	return (
		<div className='search-form'>
			<div className='form-container'>
				<div className='input-field'>
					<input
						onFocus={() => {
							setSearchQuery('');
						}}
						name='search'
						aria-label='search'
						type={'search'}
						value={searchQuery}
						onChange={(e) => {
							setSearchQuery(e.target.value);
						}}
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								onSearchPress();
							}
						}}
					/>
				</div>
				<ButtonSearch callBackFunc={() => onSearchPress()} />
			</div>
		</div>
	);
}

export default SearchForm;
