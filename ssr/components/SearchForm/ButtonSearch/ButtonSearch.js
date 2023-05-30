import './ButtonSearch.css';

import React from 'react';

function ButtonSearch({ callBackFunc }) {
	return (
		<button className='search-button' onClick={callBackFunc}>
			<p>Search</p>
		</button>
	);
}

export default ButtonSearch;
