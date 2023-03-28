import React from 'react';

const el = React.createElement;

export function Button(props) {
	return el(
		'button',
		{ onClick: props.handleClick, className: 'counter-button' },
		props.name
	);
}
