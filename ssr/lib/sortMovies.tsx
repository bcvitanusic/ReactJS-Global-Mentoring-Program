export default async function sortMovies(sortBy: string) {
	const res = await fetch(
		`http://localhost:4000/movies?sortBy=${sortBy}&sortOrder=desc&searchBy=title`
	);
	if (!res.ok) throw new Error('Failed to fetch data');
	const data = await res.json();
	return data;
}
