import SortControl from './SortControl';

export default {
	title: 'SortControl',
	component: SortControl,
	decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
};

const Template = (args) => <SortControl {...args} />;

export const Sort = Template.bind({});

Sort.args = {
	sortBy: 0,
};
