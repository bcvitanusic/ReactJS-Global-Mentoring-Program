/* eslint-disable no-restricted-globals */
import React from 'react';
import './MovieForm.css';
import { AiFillCloseCircle as CloseIcon } from 'react-icons/ai';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	title: Yup.string().required(),
	releaseDate: Yup.date().required(),
	movieUrl: Yup.string(),
	rating: Yup.number().required(),
	genre: Yup.mixed().oneOf(['Comedy', 'Horror', 'Documentary', 'Crime']),
	runtime: Yup.number().required(),
	overview: Yup.string(),
});

function MovieForm({ onClose, initialMovieInfo, onSubmit, title }) {
	return (
		<div className='dialog'>
			<Formik
				initialValues={{
					title: initialMovieInfo.title ?? '',
					releaseDate: initialMovieInfo.release_date ?? '',
					movieUrl: initialMovieInfo.poster_path ?? '',
					rating: initialMovieInfo.vote_average ?? '',
					genre: initialMovieInfo.genres ? initialMovieInfo.genres[0] : '',
					runtime: initialMovieInfo.runtime ?? '',
					overview: initialMovieInfo.overview ?? '',
				}}
				validationSchema={validationSchema}
				onSubmit={(values, errors, resetForm) => {}}
			>
				{({
					resetForm,
					errors,
					touched,
					validate,
					values,
					isSubmitting,
					handleChange,
				}) => {
					return (
						<Form
							onChange={handleChange}
							className='content'
							data-testid='movie-form'
						>
							<div
								aria-label='close-form'
								className='close-dialog'
								onClick={onClose}
							>
								<CloseIcon size={35} className='close-icon' />
							</div>
							<div
								data-testid='title-dialog'
								aria-label='title'
								className='title'
							>
								{title}
							</div>

							<div className='content-row'>
								<div className='content-row-item'>
									<label className={`item-placeholder`} htmlFor='title'>
										Title
									</label>

									<Field
										className={`item-input ${
											errors.title && touched.title && 'error-input'
										}`}
										id='title'
										name='title'
									/>
								</div>
								<div className='content-row-item'>
									<label className='item-placeholder' htmlFor='releaseDate'>
										Release Date
									</label>
									<Field
										className={`item-input ${
											errors.releaseDate && touched.releaseDate && 'error-input'
										}`}
										id='releaseDate'
										name='releaseDate'
									/>
								</div>
							</div>

							<div className='content-row'>
								<div className='content-row-item'>
									<label className='item-placeholder' htmlFor='movieUrl'>
										URL
									</label>
									<Field
										className={`item-input ${
											errors.movieUrl && touched.movieUrl && 'error-input'
										}`}
										id='movieUrl'
										name='movieUrl'
									/>
								</div>
								<div className='content-row-item'>
									<label className='item-placeholder' htmlFor='rating'>
										Rating
									</label>
									<Field
										className={`item-input ${
											errors.rating && touched.rating && 'error-input'
										}`}
										id='rating'
										name='rating'
									/>
								</div>
							</div>

							<div className='content-row'>
								<div className='content-row-item'>
									<label className='item-placeholder' htmlFor='genre'>
										Genre
									</label>
									<Field
										className={`item-input ${
											errors.genre && touched.genre && 'error-input'
										} genre-option`}
										as='select'
										name='genre'
									>
										<option className='genre-option' value='-'>
											Select genre
										</option>
										<option className='genre-option' value='Action'>
											Action
										</option>
										<option className='genre-option' value='Comedy'>
											Comedy
										</option>

										<option className='genre-option' value='Horror'>
											Horror
										</option>

										<option className='genre-option' value='Documentary'>
											Documentary
										</option>
										<option className='genre-option' value='Crime'>
											Crime
										</option>
									</Field>
								</div>
								<div className='content-row-item'>
									<label className='item-placeholder' htmlFor='runtime'>
										Runtime
									</label>
									<Field
										className={`item-input ${
											errors.runtime && touched.runtime && 'error-input'
										}`}
										id='runtime'
										name='runtime'
									/>
								</div>
							</div>

							<div className='content-row'>
								<div className='content-row-item'>
									<label className='item-placeholder' htmlFor='overview'>
										Overview
									</label>
									<Field
										component='textarea'
										className='item-input overview'
										id='overview'
										name='overview'
									/>
								</div>
							</div>
							<div className='footer'>
								<button className='reset' onClick={() => resetForm()}>
									Reset
								</button>
								<button
									disabled={isSubmitting}
									type='button'
									className='submit'
									onClick={() => {
										let valuesSubmit = { ...values, id: initialMovieInfo.id };
										if (Object.keys(errors).length > 0) {
											return;
										}
										onSubmit(valuesSubmit);
										resetForm();
									}}
								>
									Submit
								</button>
							</div>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
}

export default MovieForm;
