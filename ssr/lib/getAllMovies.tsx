export const getAllMovies = async () => {
	const res = await fetch(
		`http://localhost:4000/movies?sortBy=title&sortOrder=asc`,
		{ cache: 'no-store' }
	);

	if (!res.ok) throw new Error('Failed to fetch data');

	return res.json();
};
