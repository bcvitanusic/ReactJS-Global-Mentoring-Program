import SearchForm from '../components/SearchForm/SearchForm';

export default {
	title: 'SearchForm',
	component: SearchForm,
	decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
};

const Template = (args) => <SearchForm {...args} />;

export const Search = Template.bind({});

Search.args = {
	initialSearchQuery: 'What do you want to watch?',
};
