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

const Template = (args) => <Dialog {...args} />;

export const DialogStory = Template.bind({});

DialogStory.args = {
	title: 'Delete movie',
	children: <p>Hello storybook</p>,
};

DialogStory.decorators = [
	() => {
		return (
			<>
				<Dialog>
					<MovieForm initialMovieInfo={{}} />
				</Dialog>
				<Dialog>
					<MovieForm initialMovieInfo={initialMovie} />
				</Dialog>
				<Dialog title={'Are you sure you want to delete movie?'} />
			</>
		);
	},
];
