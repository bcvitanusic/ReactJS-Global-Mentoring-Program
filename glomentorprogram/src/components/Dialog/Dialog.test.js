import { fireEvent, render, screen } from '@testing-library/react';
import Dialog from './Dialog';

const mockedFunc = jest.fn();

describe('Movie Details', () => {
	const renderDialog = () =>
		render(
			<Dialog
				title='Dialog'
				children={<div>children</div>}
				onClose={mockedFunc}
			/>
		);

	test('if props in MovieDetails display correctly', () => {
		renderDialog();
		const title = screen.getByText(/dialog/i);
		expect(title).toBeInTheDocument();
		const children = screen.getByText(/children/i);
		expect(children).toBeInTheDocument();
		const close = screen.getByLabelText(/close/);
		fireEvent.click(close);
		expect(mockedFunc).toBeCalled();
	});
});
