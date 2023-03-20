import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import GenreSelect from './components/GenreSelect/GenreSelect';
import Counter from './components/Counter/Counter.js';
import GenreList from './assets/utils.js';

const App = () => {
	const [selectedGenre, setSelectedGenre] = useState('ALL');

	const onSelect = (genre) => {
		setSelectedGenre(genre.toUpperCase());
	};
	return (
		<div className='App'>
			<Header />
			<GenreSelect
				GenreList={GenreList}
				selectedGenre={selectedGenre}
				onSelect={(genre) => onSelect(genre)}
			/>
			<Counter num={5} />
		</div>
	);
};

export default App;
