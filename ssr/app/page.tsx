import React from 'react';
import Header from '../components/Header/Header';

export default async function Page() {
	return (
		<div className='main-page'>
			<Header initialQuery={'What do you want to watch?'} />
		</div>
	);
}
