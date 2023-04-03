import MovieTile from '../components/MovieTile/MovieTile';
import moviesList from '../assets/moviesList';

export default {
	title: 'MovieTile',
	component: MovieTile,
	decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
};

const Template = (args) => <MovieTile {...args} />;

export const Tile = Template.bind({});

Tile.args = {
	moviesList: moviesList,
};
