import { fireEvent, render, screen } from '@testing-library/react';
import Dialog from './Dialog';

const mockedFunc = jest.fn();

describe('Movie Details', () => {
	const renderDialog = () =>
		render(
			<Dialog title='Dialog' onClose={mockedFunc}>
				<div>children</div>
			</Dialog>
		);

	test('if props in MovieDetails display correctly if no children', () => {
		render(<Dialog title='Dialog' onClose={mockedFunc} />);
		const title = screen.getByText(/dialog/i);
		expect(title).toBeInTheDocument();
		const close = screen.getByLabelText(/close/);
		fireEvent.click(close);
		expect(mockedFunc).toBeCalled();
	});

	test('if children are shown correctly', () => {
		renderDialog();
		const children = screen.getByText(/children/i);
		expect(children).toBeInTheDocument();
	});
});
