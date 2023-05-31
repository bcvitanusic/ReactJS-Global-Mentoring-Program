import { getAllMovies } from './getAllMovies';
export default async function selectByGenre(genre: string) {
	if (genre === 'ALL') {
		const data = getAllMovies();

		return data;
	} else {
		const res = await fetch(
			`http://localhost:4000/movies?filter=${genre.toLowerCase()}&searchBy=title`
		);
		if (!res.ok) throw new Error('Failed to fetch data');
		const data = await res.json();
		return data;
	}
}
