import React, { useState } from 'react';
import './App.css';
import MovieListPage from './components/MovieListPage/MovieListPage';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import MovieDetailsPageWrapper from './components/MovieDetails/MovieDetailsPageWrapper';

const App = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [openAddMovie, setOpenAddMovie] = useState(false);

	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route
						path='/'
						element={
							<MovieListPage
								itemSearch={searchQuery}
								openDialog={openAddMovie}
								closeDialog={() => setOpenAddMovie(false)}
							/>
						}
					>
						<Route
							path='/'
							element={
								<Header
									onSearch={(item) => {
										setSearchQuery(item);
									}}
									openDialog={() => {
										setOpenAddMovie(true);
									}}
									initialSearchQuery={searchQuery}
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
