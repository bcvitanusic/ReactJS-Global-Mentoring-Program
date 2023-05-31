import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import GenreSelect from '@/components/GenreSelect/GenreSelect';
import MovieTile from '@/components/MovieTile/MovieTile';
import GenreList from '@/assets/utils';
import { getAllMovies } from '@/lib/getAllMovies';
import { MoviesContextProvider, useMoviesContext } from './context/movieList';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'React Mentoring Program',
	description: 'React Advanced Mentoring Program',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<MoviesContextProvider>
					{children}
					<GenreSelect GenreList={GenreList} />
					<MovieTile />
				</MoviesContextProvider>
			</body>
		</html>
	);
}
