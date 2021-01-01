import React from 'react';
import 'tachyons';

const Navigation = ( {onRouteChange, isSignedin}) => {
	if( isSignedin === true) {
		return(
			<nav>
				<div onClick={() => onRouteChange('signin')} className="f3 pa3 dim blacklink underline pointer" style={{display:'flex' ,justifyContent:'flex-end'}} > 
				   {'Signout'}
				</div>
			</nav>
		)
	}
	else {
		return(
			<nav>
				<div className="f3 pa3 dim blacklink underline pointer" style={{display:'flex' ,justifyContent:'flex-end'}} > 
				   <div onClick={() => onRouteChange('signin')} className='ma3'> {'Signin'} </div>
				   <div onClick={() => onRouteChange('register')} className='ma3'>  {'Register'} </div>
				</div>
			</nav>
		)
	}

}

export default Navigation;
