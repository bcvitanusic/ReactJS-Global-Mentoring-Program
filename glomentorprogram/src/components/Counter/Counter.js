import React from 'react';
import './Counter.css';

const el = React.createElement;

function Button(props) {
	return el(
		'button',
		{ onClick: props.handleClick, className: 'counter-button' },
		props.name
	);
}

class Counter extends React.Component {
	state = {
		num: this.props.num,
	};

	handleIncrement = () => {
		this.setState({
			num: this.state.num + 1,
		});
	};

	handleDecrement = () => {
		this.setState({
			num: this.state.num - 1,
		});
	};

	render() {
		return el('div', { className: 'container' }, [
			el('h1', null, 'COUNTER'),
			el('div', null, [
				el(
					Button,
					{
						handleClick: this.handleDecrement,
						name: 'Decrement',
					},
					null
				),
				el(
					Button,
					{ handleClick: this.handleIncrement, name: 'Increment' },
					null
				),
			]),

			el(
				'p',
				{
					className: 'paragraph',
				},
				null,
				this.state.num
			),
		]);
	}
}

export default Counter;
