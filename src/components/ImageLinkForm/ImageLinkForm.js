import React from 'react';
import './ImageLinkForm.css';


// destructor the { onInputChange } from the props
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div className=''>
            <p className='f3'>
                {'This Magic frame will detect faces in your pictures. Git it a try'}
            </p>
            <div className='center'>
                <div className='center form pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' 
                    // Onchange is a react event = to oninput
                    type='text' onChange={onInputChange}/>
                    <button 
                    className='w-30 f4 link ph3 pv2 dib white bg-black'
                    onClick={onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    );
}


export default ImageLinkForm;