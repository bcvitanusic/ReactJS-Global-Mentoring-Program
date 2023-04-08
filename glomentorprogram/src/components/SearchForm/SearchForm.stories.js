import SearchForm from './SearchForm';

export default {
	title: 'SearchForm',
	component: SearchForm,
	decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
	argTypes: {
		onSearch: {
			action: 'search-clicked',
		},
	},
};

const Template = (args) => <SearchForm {...args} />;

export const Search = Template.bind({});

Search.args = {
	initialSearchQuery: 'What do you want to watch?',
};
