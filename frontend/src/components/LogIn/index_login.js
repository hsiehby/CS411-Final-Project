import React from 'react';
import './styles_login.scss';

import { withRouter } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            accounts: []
        };
        this.attemptLogin = this.attemptLogin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleSubmit = _ => {
        const { email, password } = this.state;
        fetch(`http://localhost:3030/users/login?email=${email}&password=${password}`)
            .then(response => response.json())
            .then(response => this.setState({ accounts: response.data },
                                            () => { this.attemptLogin() }))
            .catch(err => console.error(err));
    }

    handleSignUp = _ => {
        this.props.history.push('/signup');
    }

    attemptLogin() {
        const { accounts } = this.state;
        if (accounts.length === 0) {
            alert("Incorrect information inputted.");
        } else {
            this.props.history.push({
                pathname: '/home',
                state: { user: accounts[0] }
            });
        }
    }

    render() {
        const { email, password } = this.state;
        return (
            <div className="login-box"> 
                <div className="login-content">
                    <input
                        placeholder="email"
                        value={email}
                        onChange={e => this.setState({ email: e.target.value })} />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={e => this.setState({ password: e.target.value })} /> 
                    <button type="button" onClick={this.handleSubmit}> Log In </button>
                    <button type="button" onClick={this.handleSignUp}> Sign Up </button>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
