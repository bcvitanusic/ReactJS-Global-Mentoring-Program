export const addNewMovie = async (values: any) => {
	const endPoint = 'http://localhost:4000/movies';
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			title: values.title,
			vote_average: parseInt(values.rating),
			release_date: values.releaseDate,
			poster_path: values.movieUrl,
			overview: values.overview,
			runtime: parseInt(values.runtime),
			genres: [values.genre],
		}),
	};
	const res = await fetch(endPoint, options);
	const data = await res.json();

	return data;
};
