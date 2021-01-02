import React from 'react';
import 'tachyons';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonClick}) => {
	return(
		<div >
			<p className="center tc"> The magic brain will show which celebrity is present in your image. Give it a try. </p>
			<div className="center" >
				<div className="pa4 shadow-2 background dib">
					<div>
						<input className=" br2" size="25" tpye="text" onChange={onInputChange} placeholder="Paste the URL of the image" /> 
						<button className=" bg-light-purple br2 " onClick={onButtonClick} >Detect</button> 
					</div>
				</div>
			</div>
		</div>
	)

}

export default ImageLinkForm;
