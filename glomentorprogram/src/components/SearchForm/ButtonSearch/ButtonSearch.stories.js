import ButtonSearch from './ButtonSearch';

export default {
	title: 'ButtonSearch',
	component: ButtonSearch,
	argTypes: {
		handleClick: {
			action: 'button-clicked',
		},
	},
};

const Template = (args) => <ButtonSearch {...args} />;

export const SearchButton = Template.bind({});
SearchButton.args = {
	primary: true,
	label: 'Button',
	disabled: false,
};
