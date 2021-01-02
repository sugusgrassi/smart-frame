import React from 'react';
import 'tachyons';

const Rank = ({rank, name}) => {
	return(
		<div> 
			<p className="f3 center mb1 white"> {`Hey ${name} your entry count is...`} </p>
			<p className="f1 center mt0 white"> {rank} </p>
		</div>
	)

}

export default Rank;
