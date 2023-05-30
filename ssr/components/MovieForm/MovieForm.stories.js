import React from 'react';
import { action } from '@storybook/addon-actions';
import MovieForm from './MovieForm';

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

const initialMovieInfo = {
	title: 'Star Wars',
	releaseDate: '1977-05-25',
	movieUrl: 'https://www.imdb.com/title/tt0076759/',
	rating: 8.6,
	genre: 'Science Fiction',
	runtime: 121,
	overview: 'overview',
};

export const Default = () => (
	<MovieForm
		initialMovieInfo={initialMovieInfo}
		onClose={action('close')}
		onSubmit={action('submit')}
	/>
);
