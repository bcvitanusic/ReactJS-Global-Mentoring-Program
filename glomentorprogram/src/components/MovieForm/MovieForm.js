/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import './MovieForm.css';
import { AiFillCloseCircle as CloseIcon } from 'react-icons/ai';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	title: Yup.string().required(),
	releaseDate: Yup.date(),
	movieUrl: Yup.string(),
	rating: Yup.number().required(),
	genre: Yup.mixed().oneOf(['comedy', 'horror', 'documentary', 'crime']),
	runtime: Yup.number().required(),
	overview: Yup.string(),
});

function MovieForm({ onClose, initialMovieInfo, onSubmit }) {
	return (
		<div className='dialog'>
			<Formik
				initialValues={{
					title: initialMovieInfo.title ?? '',
					releaseDate: initialMovieInfo.releaseDate ?? '',
					movieUrl: initialMovieInfo.movieUrl ?? '',
					rating: initialMovieInfo.rating ?? '',
					genre: initialMovieInfo.genre ?? '',
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
						<Form onChange={handleChange} className='content'>
							<div
								aria-label='close-form'
								className='close-dialog'
								onClick={onClose}
							>
								<CloseIcon size={35} className='close-icon' />
							</div>
							<div className='title'>Add movie</div>

							<div className='content-row'>
								<div className='content-row-item'>
									<label className={`item-placeholder`} htmlFor='title'>
										Title
									</label>

									<Field
										className={`item-input ${errors.title && 'error-input'}`}
										id='title'
										name='title'
									/>
								</div>
								<div className='content-row-item'>
									<label className='item-placeholder' htmlFor='releaseDate'>
										Release Date
									</label>
									<Field
										className='item-input'
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
										className={`item-input ${errors.title && 'error-input'}`}
										id='movieUrl'
										name='movieUrl'
									/>
								</div>
								<div className='content-row-item'>
									<label className='item-placeholder' htmlFor='rating'>
										Rating
									</label>
									<Field
										className={`item-input ${errors.title && 'error-input'}`}
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
											errors.title && 'error-input'
										} genre-option`}
										as='select'
										name='genre'
									>
										<option className='genre-option' value='-'>
											Select genre
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
										className={`item-input ${errors.title && 'error-input'}`}
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
										if (Object.keys(errors).length === 0) {
											onSubmit(values);
											resetForm();
										}
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
