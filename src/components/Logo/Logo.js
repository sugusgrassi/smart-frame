import React from 'react';
import LogoImage from './Logo.png';
import 'tachyons';
import './Logo.css';
import Tilt from 'react-tilt'

const Logo = () => {
	return(
		<div className="ma4 mt0">
			<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
				 <div className="Tilt-inner center"> 
				 	<img style={{paddingTop : '25px'}} src={LogoImage} alt='brain' />
				 </div>
			</Tilt>
		</div>
	)

}

export default Logo;
