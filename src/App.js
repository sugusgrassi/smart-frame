import React, { Component }  from 'react';
import Particles from 'react-particles-js';

import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';


const particlesOptions ={
  particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 600
        }
      }
    }



/*   particles: {
      line_linked: {
        shadow: {
          enable: true,
          color: "#3CA9D1",
          blur: 5
        }
      }
    }*/

}

const initialState = {
  // the user will input  
    input: '',
   // image url state, that should be display on submit
    imageURL: '',
    // This box will contain the values of the face location response 
    box: {},
    // Create a route to know where we are in the page. And we want to start in the sign in form
    route: 'signin',
    isSignIn: false,
    user: {
          id: '',
          name: '',
          email: '',
          password: '',
          entries: 0,
          joined: ''
    }
  }

class App extends Component {
  // We need to create a state so the app will know the value that the user enters, remember and update
  constructor(){
    //call super in order to use this.
    super();
    this.state = initialState;
  }

// Load user will be sth that the entire app will need. So we create the function and pass to register:
loadUser = (data) => {
  this.setState({user: {
    id: data.id,
    name: data.name,
    email: data.email,
    password: data.password,
    entries: data.entries,
    joined: data.joined
  }})
}

 // We want to calculate the face location based on the input. Receiving data
  calculateFaceLocation = (data) => {
    //The bounding box that we receive are percentages
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    // Return an object that will fill up the box: {}
    return {
      // Calculate percentages from the response to px
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFacebox = (box) => {
    console.log(box);
    // with ES6 it could be just {box}
    this.setState({box: box})
  }

  // The input will have a on Input change. And whenever it is an event listener we receive an event.
  onInputChange = (event) => {
  // To detect the event and to get our value from the input
    // console.log(event.target.value);
    // to update de imageURL and pass ir to the facerecognition
    this.setState({input: event.target.value});
  }

  // To detect an image when Detect button is clicked
  onButtonSubmit = () => {
    // To hide the API Clarifai key:
    this.setState({imageURL: this.state.input});
    // instead of http://localhost:3000 we change it to the one that Heroku gave
    fetch('https://obscure-crag-57150.herokuapp.com/imageurl', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      input: this.state.input
    })
    })
    .then(response => response.json())
    // .then arrow function
    .then(response => {
    // to access the response, bounding box that we receive from de API.
    // 1st we calculate the inner function calculateFaceLocation
    // 2nd we calculate the displayFacebox
      if (response){
            // instead of http://localhost:3000 we change it to the one that Heroku gave
        fetch('https://obscure-crag-57150.herokuapp.com/image', {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
          id: this.state.user.id
        })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count }))
        })
        .catch(console.log)
      }
      this.displayFacebox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }


  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    // and no matter what we still wanna change the route
    this.setState({route: route});
  }

    render(){
      const { isSignedIn, imageURL, route, box } = this.state;
      return (
        <div className="App">
                <Particles className='particles'
                  params={particlesOptions}
                />
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
          {/* We use a {Javascript expression} to make an if statement*/}
          { route === 'home' ?
          //JSX elements must be wrapped in an enclosed tag: <>...</> within a {Javascriot expression}
          <>
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries}/> 
          {/* In the ImageLinkForm we can pass the states with this.StateName as props. Now we need to trigger the props in the ImageLinkForm.js component*/}
          <ImageLinkForm onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit} />
          {/* to use the face recognition src  in the component*/}
          <FaceRecognition box={box} imageURL={imageURL}/>
          </>
          : (
            route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
          }
        </div>
      );

    }
}

export default App;
