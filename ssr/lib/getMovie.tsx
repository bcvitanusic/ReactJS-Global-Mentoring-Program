export default async function getMovie(movieId: number) {
	const res = await fetch(`http://localhost:4000/movies/${movieId}`);

	if (!res.ok) throw new Error('Failed to fetch data');

	return res.json();
}
