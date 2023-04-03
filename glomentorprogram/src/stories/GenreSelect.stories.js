import GenreSelect from '../components/GenreSelect/GenreSelect';
import genreList from '../assets/utils.js';

export default {
	title: 'Select Genre',
	component: GenreSelect,
	decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
};

const Template = (args) => <GenreSelect {...args} />;

export const GenreSelectT = Template.bind({});
GenreSelectT.args = {
	GenreList: genreList,
	selectedGenre: 'ALL',
};
