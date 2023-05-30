import React from 'react';

type Params = {
	params: {
		movieId: string;
	};
};

export default function MoviePage({ params: { movieId } }: Params) {
	return <div>page</div>;
}
