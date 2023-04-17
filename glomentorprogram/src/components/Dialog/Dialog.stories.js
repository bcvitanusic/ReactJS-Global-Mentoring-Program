import Dialog from './Dialog';
import MovieForm from '../MovieForm/MovieForm';

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
	title: 'Dialog',
	component: Dialog,
	decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
	argTypes: {
		onClose: {
			action: 'close-clicked',
		},
	},
};

export const DialogMovieForm = {
	render: () => {
		return (
			<Dialog>
				{' '}
				<MovieForm initialMovieInfo={{}} />{' '}
			</Dialog>
		);
	},
};

export const DialogMovieFormWithInitialValue = {
	render: () => {
		return (
			<Dialog>
				{' '}
				<MovieForm initialMovieInfo={initialMovie} />{' '}
			</Dialog>
		);
	},
};

export const DialogDeleteMovie = {
	render: () => {
		return <Dialog title={'Are you sure you want to delete movie?'} />;
	},
};
