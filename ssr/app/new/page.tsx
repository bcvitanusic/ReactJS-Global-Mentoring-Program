'use client';
import React, { useState } from 'react';
import MovieForm from '../../components/MovieForm/MovieForm';
import Header from '@/components/Header/Header';
import { useRouter } from 'next/navigation';
import { addNewMovie } from '@/lib/addNewMovie';
import Image from 'next/image';
import { MdDoneOutline } from 'react-icons/md';
import { IoMdCloseCircleOutline } from 'react-icons/io';

export default function Page() {
	const router = useRouter();
	const [confirmationDialogOpen, setConfirmationDialoOpen] = useState(false);
	return (
		<>
			<Header initialQuery={'What do you want to watch?'} />

			<MovieForm
				onClose={() => {
					router.push('/');
				}}
				initialMovieInfo={{}}
				onSubmit={(values: any) => {
					addNewMovie(values);
					setConfirmationDialoOpen(true);
				}}
				title='Add Movie'
			/>
			{confirmationDialogOpen && (
				<div className='conf-dialog'>
					<div
						className='close-dialog'
						onClick={() => {
							router.push('/');
						}}
					>
						<IoMdCloseCircleOutline size={40} color={'#F65261'} />
					</div>
					<MdDoneOutline size={100} color={'green'} />
					<h1>Succesfully added movie</h1>
				</div>
			)}
		</>
	);
}
