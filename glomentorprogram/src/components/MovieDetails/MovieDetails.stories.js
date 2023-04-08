import MovieDetails from './MovieDetails';
import moviesList from '../../assets/moviesList';

export default {
	title: 'MovieDetails',
	component: MovieDetails,
	decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
};

const Template = (args) => <MovieDetails {...args} />;

export const MovieDet = Template.bind({});

MovieDet.args = {
	url: moviesList[0].url,
	name: moviesList[0].name,
	rating: moviesList[0].rating,
	description: moviesList[0].description,
	year: moviesList[0].year,
	duration: moviesList[0].duration,
	longDdesc: moviesList[0].longDesc,
};
