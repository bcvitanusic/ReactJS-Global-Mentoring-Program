'use client';

import { createContext, useContext, useState } from 'react';

const MoviesContext = createContext({});

export const MoviesContextProvider = ({ children }) => {
	const [moviesList, setMoviesList] = useState([]);

	return (
		<MoviesContext.Provider value={{ moviesList, setMoviesList }}>
			{children}
		</MoviesContext.Provider>
	);
};

export const useMoviesContext = () => useContext(MoviesContext);
