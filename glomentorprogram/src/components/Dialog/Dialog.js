import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import './Dialog.css';
import { AiFillCloseCircle as CloseIcon } from 'react-icons/ai';

const Dialog = ({ children, onClose, title }) => {
	return createPortal(
		<div className='dialog-overlay' onClick={onClose}>
			<div className='dialog-content'>
				<div aria-label='close' className='close-dialog' onClick={onClose}>
					<CloseIcon size={35} className='close-icon' />
				</div>
				<div className='dialog-header'>
					<p>{title}</p>
				</div>
				{children}
			</div>
		</div>,
		document.body
	);
};

export default Dialog;
