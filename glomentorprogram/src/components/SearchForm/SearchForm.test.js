import { fireEvent, render, screen } from '@testing-library/react';
import SearchForm from './SearchForm';

const mockedOnChange = jest.fn();

describe('SearchForm', () => {
	const renderSearchForm = () =>
		render(
			<SearchForm initialSearchQuery={'test'} onSearch={mockedOnChange} />
		);

	test('if props in SearchForm display correctly', () => {
		renderSearchForm();
		const input = screen.getByLabelText('search', { name: 'search' });
		// expect(screen.getByDisplayValue('test')).toBeInTheDocument();
		expect(input).toHaveValue('test');
	});

	test('onChange is called after submit click', () => {
		renderSearchForm();
		const buttonElement = screen.getByRole('button');
		expect(buttonElement).toBeInTheDocument();
		const input = screen.getByLabelText('search', { name: 'search' });
		fireEvent.change(input, {
			target: {
				value: 'React',
			},
		});
		fireEvent.click(buttonElement);
		expect(mockedOnChange).toBeCalledWith('React');
	});

	test('on press enter onchange is called', () => {
		renderSearchForm();
		const input = screen.getByLabelText('search', { name: 'search' });
		fireEvent.change(input, {
			target: {
				value: 'React',
			},
		});
		expect(input.value).toBe('React');
		fireEvent.keyPress(input, { key: 'Enter', charCode: 13 });
		expect(mockedOnChange).toBeCalledWith('React');
	});
});
