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
	constructor(props) {
		super(props);
		this.state = {
			num: this.props.num,
		};
		this.handleIncrement = this.handleIncrement.bind(this);
		this.handleDecrement = this.handleDecrement.bind(this);
	}

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
		return el('div', { className: 'container', key: 0 }, [
			el('h1', { key: 1 }, null, 'COUNTER'),
			el('div', { key: 2 }, [
				el(
					Button,
					{
						handleClick: this.handleDecrement,
						name: 'Decrement',
						key: 3,
					},
					null
				),
				el(
					Button,
					{ handleClick: this.handleIncrement, name: 'Increment', key: 4 },
					null
				),
			]),

			el(
				'p',
				{
					className: 'paragraph',
					key: 5,
				},
				null,
				this.state.num
			),
		]);
	}
}

export default Counter;
