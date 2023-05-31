export default async function searchMovies(searchQuery: string) {
	const res = await fetch(
		`http://localhost:4000/movies?sortOrder=asc&search=${searchQuery}&searchBy=title`,
		{ cache: 'no-store' }
	);

	if (!res.ok) throw new Error('Failed to fetch data');
	const data = await res.json();

	return data;
}
