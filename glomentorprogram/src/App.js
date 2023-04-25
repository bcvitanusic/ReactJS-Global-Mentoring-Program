import React, { useState } from 'react';
import './App.css';
import MovieListPage from './components/MovieListPage/MovieListPage';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import MovieDetailsPageWrapper from './components/MovieDetails/MovieDetailsPageWrapper';

const App = () => {
	const [openAddMovie, setOpenAddMovie] = useState(false);

	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route
						path='/'
						element={
							<MovieListPage
								openDialog={openAddMovie}
								closeDialog={() => setOpenAddMovie(false)}
							/>
						}
					>
						<Route
							path='/'
							element={
								<Header
									openDialog={() => {
										setOpenAddMovie(true);
									}}
								/>
							}
						/>
						<Route path=':movieId' element={<MovieDetailsPageWrapper />} />
					</Route>
				</Routes>
			</Router>
			{/* <Counter num={5} /> */}
		</div>
	);
};

export default App;
