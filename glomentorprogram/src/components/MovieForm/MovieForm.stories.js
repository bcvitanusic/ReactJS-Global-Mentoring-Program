import MovieForm from './MovieForm';

const initialMovie = {
	title: 'Terminator',
	releaseDate: '2004',
	movieUrl: 'url',
	rating: '8.5',
	genre: 'comedy',
	runtime: '2h',
	overview: 'overview',
};

export default {
	title: 'MovieForm',
	component: MovieForm,
	decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
	argTypes: {
		onClose: {
			action: 'close-clicked',
		},
		onSubmit: {
			action: 'submit clicked',
		},
	},
};

const Template = (args) => <MovieForm {...args} />;

export const MovieDet = Template.bind({});

MovieDet.args = {
	initialMovieInfo: initialMovie,
};
