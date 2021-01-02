import React from 'react';
import 'tachyons';
import './FaceDetection.css';

const FaceDetection = ({imageUrl,box}) => {
	return(
		<div className='center'>
			<div className='absolute mt3'>
				<img id='image' src={imageUrl} width = '500px' height='auto' alt='' /> 
				<div className='bounding-box' style={{ top : box.topHeight, bottom : box.bottomHeight, left : box.leftWidth, right : box.rightWidth}} > </div>
			</div>
		</div>
	)
}

export default FaceDetection;
