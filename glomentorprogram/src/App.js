import './App.css';
import Header from './components/Header/Header';
import GenreSelect from './components/GenreSelect/GenreSelect';
import Counter from './components/Counter/Counter.js';
import GenreList from './assets/utils.js';

const App = () => {
	return (
		<div className='App'>
			<Header />
			<GenreSelect GenreList={GenreList} />
			<Counter num={5} />
		</div>
	);
};

export default App;
