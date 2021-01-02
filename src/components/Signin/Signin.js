import React from 'react';
import 'tachyons';

class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signinEmail : '',
			signinPassword : '',
			userValidityDetails : ''
		}
	}

	onEmailChange = (event) => {
		this.setState( {
			signinEmail : event.target.value
		})
	}

	onPasswordChange = (event) => {
		this.setState( {
			signinPassword : event.target.value
		})
	}

	onInvalidUser = () => {
		if(!this.state.userValid) {
			return `Wrong Credentials`
		}
	}

	onSubmit = () => {
		fetch('https://obscure-crag-57150.herokuapp.com/signin',{ 	
		 	method : 'POST',
		 	headers : { 'Content-Type' : 'application/json'},
		 	body : JSON.stringify({
		 		email : this.state.signinEmail,
		 		password : this.state.signinPassword
		 	})
		})
		.then( response => response.json())
		.then( data => {
			if(data!=='Invalid Credentials'){
				this.props.loadUser(data);
				this.props.onRouteChange('home');
			}
			else {
				this.setState({
					userValidityDetails : `Invalid Credentials`
				})
			}
		})
	}

	render() {
		return(
			<article className="br2 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw9 center">
				<main className="pa4 black-80 ">
				  <div className="measure">
					    <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
					      <legend className="f4 fw6 ph0 mh0 center">Sign In</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
					      </div>
					    </fieldset>
					    <div className="center red mb2">
					      {this.state.userValidityDetails}
					    </div>
					    <div className="center">
					      <input onClick={this.onSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
					    </div>
					    <div className="lh-copy mt3 center">
					      <a href="#0" onClick={() => this.props.onRouteChange('register')} className="f6 link dim black db">Register</a>
					    </div>
				  </div>
				</main>
			</article>
		)
	}
}

export default Signin;
