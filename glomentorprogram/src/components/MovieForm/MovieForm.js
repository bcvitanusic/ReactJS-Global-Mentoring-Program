/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import './MovieForm.css';
import { AiFillCloseCircle as CloseIcon } from 'react-icons/ai';

function MovieForm({ onClose, initialMovieInfo, onSubmit }) {
	const [movieInfo, setMovieInfo] = useState({
		title: initialMovieInfo.title ?? '',
		releaseDate: initialMovieInfo.releaseDate ?? '',
		movieUrl: initialMovieInfo.movieUrl ?? '',
		rating: initialMovieInfo.rating ?? '',
		genre: initialMovieInfo.genre ?? '',
		runtime: initialMovieInfo.runtime ?? '',
		overview: initialMovieInfo.overview ?? '',
	});

	return (
		<div className='dialog'>
			<div className='wrapper'>
				<div aria-label='close-form' className='close-dialog' onClick={onClose}>
					<CloseIcon size={35} className='close-icon' />
				</div>
				<div className='title'>Add movie</div>
				<div className='content'>
					<div className='content-row'>
						<div className='content-row-item'>
							<div className='item-placeholder'>
								<p>Title</p>
							</div>
							<div className='item-input'>
								<input
									type={'text'}
									onChange={(e) =>
										setMovieInfo({ ...movieInfo, title: e.target.value })
									}
									value={movieInfo.title}
								/>
							</div>
						</div>

						<div className='content-row-item'>
							<div className='item-placeholder'>
								<p>Release Date</p>
							</div>
							<div className='item-input'>
								<input
									type={'text'}
									onChange={(e) =>
										setMovieInfo({ ...movieInfo, releaseDate: e.target.value })
									}
									value={movieInfo.releaseDate}
								/>
							</div>
						</div>
					</div>
					<div className='content-row'>
						<div className='content-row-item'>
							<div className='item-placeholder'>
								<p>Movie Url</p>
							</div>
							<div className='item-input'>
								<input
									type={'text'}
									onChange={(e) =>
										setMovieInfo({ ...movieInfo, movieUrl: e.target.value })
									}
									value={movieInfo.movieUrl}
								/>
							</div>
						</div>
						<div className='content-row-item'>
							<div className='item-placeholder'>
								<p>Rating</p>
							</div>
							<div className='item-input'>
								<input
									type={'text'}
									onChange={(e) =>
										setMovieInfo({ ...movieInfo, rating: e.target.value })
									}
									value={movieInfo.rating}
								/>
							</div>
						</div>
					</div>
					<div className='content-row'>
						<div className='content-row-item'>
							<div className='item-placeholder'>
								<p>Genre</p>
							</div>
							<div className='item-input'>
								<input
									type={'text'}
									onChange={(e) =>
										setMovieInfo({ ...movieInfo, genre: e.target.value })
									}
									value={movieInfo.genre}
								/>
							</div>
						</div>
						<div className='content-row-item'>
							<div className='item-placeholder'>
								<p>Runtime</p>
							</div>
							<div className='item-input'>
								<input
									type={'text'}
									onChange={(e) =>
										setMovieInfo({ ...movieInfo, runtime: e.target.value })
									}
									value={movieInfo.runtime}
								/>
							</div>
						</div>
					</div>
					<div className='content-row'>
						<div className='content-row-item'>
							<div className='item-placeholder'>
								<p>Overview</p>
							</div>
							<div className='item-input'>
								<input
									type={'text'}
									className={'overview'}
									onChange={(e) =>
										setMovieInfo({ ...movieInfo, overview: e.target.value })
									}
									value={movieInfo.overview}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className='footer'>
					<button className='reset'>Reset</button>
					<button
						type={'submit'}
						className='submit'
						onClick={() => onSubmit(movieInfo)}
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}

export default MovieForm;
