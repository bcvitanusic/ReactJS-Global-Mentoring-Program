import React from 'react';
import { createPortal } from 'react-dom';
import './Dialog.css';
import { AiFillCloseCircle as CloseIcon } from 'react-icons/ai';

const Dialog = ({ onClose, title, children }) => {
	return createPortal(
		<div id='dialog-overlay' className='dialog-overlay'>
			{children ? (
				children
			) : (
				<div className='dialog-content'>
					<div aria-label='close' className='close-dialog' onClick={onClose}>
						<CloseIcon size={35} className='close-icon' />
					</div>
					<div className='dialog-header'>
						<p>{title}</p>
					</div>
				</div>
			)}
		</div>,
		document.body
	);
};

export default Dialog;
