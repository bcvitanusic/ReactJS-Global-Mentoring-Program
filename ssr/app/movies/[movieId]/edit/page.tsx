'use client';
import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import getMovie from '@/lib/getMovie';
import MovieForm from '@/components/MovieForm/MovieForm';
import MovieDetails from '@/components/MovieDetails/MovieDetails';
import { editMovie } from '@/lib/editMovie';

export default async function Page() {
	const router = useRouter();
	const params = useParams();
	let id = parseInt(params.movieId);
	const movie = await getMovie(id);

	const editMovieById = async (values: any) => {
		const res = await editMovie(values);
	};

	return (
		<>
			<MovieDetails selectedMovie={movie} />
			<MovieForm
				onClose={() => {
					router.replace('/');
				}}
				initialMovieInfo={movie}
				onSubmit={(values: any) => {
					editMovieById(values);
				}}
				title='Edit Movie'
			/>
		</>
	);
}
