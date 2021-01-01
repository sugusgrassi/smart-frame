import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import FaceDetection from './components/FaceDetection/FaceDetection';
import FaceDetails from './components/FaceDetails/FaceDetails';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';


const paramtersObject = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      input : '', 
      imageUrl : '',
      box : {},
      celebrityDetails : '',
      route : 'signin',
      isSignedin : false,
      user : {
        id : '',
        name : '',
        entries : 0,
        email : '',
        joined : ''
      }
    }
  }

  loadUser = (data) => { 
    this.setState({
      user : {
        id : data.id,
        name : data.name,
        entries : data.entries,
        email : data.email,
        joined : data.joined
      }
    })
  }

  onInputChange = (event) => {
    this.setState({
      input : event.target.value
    });
  }

  calculateBoxDimensions = (data) => {
    const celebrityFace  = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('image');
    const width = image.width;
    const height = image.height;

    return {
      topHeight : celebrityFace.top_row*height,
      bottomHeight : height - celebrityFace.bottom_row*height,
      leftWidth : celebrityFace.left_col*width,
      rightWidth : width - celebrityFace.right_col*width
    }
  }

  celebrityDetails = (data) => {
    const celebrityName = data.outputs[0].data.regions[0].data.face.identity.concepts[0].name;
    this.setState({
      celebrityDetails : `Celebrity in the below image is ${celebrityName}`
    }) ;   
  }


  onButtonClick = () => {
    fetch('https://obscure-crag-57150.herokuapp.com/imageUrl',{
        method : 'post',
        headers : { 'Content-Type' : 'application/json'},
        body : JSON.stringify({
          imageUrl : this.state.input 
        })
      }
    )
    .then( response => response.json())
    .then( (response) =>  {
      fetch('https://obscure-crag-57150.herokuapp.com/image',{
        method : 'put',
        headers : { 'Content-Type' : 'application/json'},
        body : JSON.stringify({
          id : this.state.user.id 
        })
      })
      .then( response => response.json())
      .then( rank => {
        this.setState(Object.assign(this.state.user, {entries : rank}))
      })
      this.setState({
        imageUrl : this.state.input
      });
      this.setState({
        box : this.calculateBoxDimensions(response) 
      });
      this.celebrityDetails(response);
    })
    .catch ( (error) => {
      console.log("There was an error fetching the image");
      this.setState({
      box : '',
      imageUrl : '',
      celebrityDetails : `Unable to fetch the image. Please try another image.`
    });
    })
  }

  onRouteChange = (route) => {
    if( route === 'home') {
      this.setState({
        isSignedin : true,
        celebrityDetails : '',
        imageUrl : ''
      })
    }
    else if( route === 'signin') {
      this.setState({
        isSignedin : false
      })
    }
    else if( route === 'register') {
      this.setState({
        isSignedin : false
      })
    }
    this.setState( 
    {
      route : route
    })
  }

  render() {
    return (
      <div>
        <Particles className="particles" params={paramtersObject} />
        <Navigation onRouteChange={this.onRouteChange} isSignedin={this.state.isSignedin }/>
        {( this.state.route === 'signin') ?
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> 
          :
          <div>
            { ( this.state.route === 'home') ? 
              <div>
                <Logo />
                <Rank name={this.state.user.name} rank={this.state.user.entries}/>
                <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/> 
                <FaceDetails celebrityDetails={this.state.celebrityDetails}/>
                <FaceDetection imageUrl={this.state.imageUrl} box={this.state.box} />
              </div> 
              :
              <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            }
          </div>
        }
      </div>
    );
  }
}

export default App;
