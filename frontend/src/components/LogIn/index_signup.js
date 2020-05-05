import React from 'react';
import './styles_login.scss';

import { withRouter } from 'react-router-dom';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            interests: "",
            user: {}
        };
        this.attemptSignUp = this.attemptSignUp.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleSignUp = _ => {
        const { name, email, password, interests } = this.state;
        if (!name || !email || !password) {
            alert("Name, email, and password are required.");
            return;
        } else {
            fetch(`http://localhost:3030/users/add?name=${name}&email=${email}&password=${password}&interests=${interests}`)
                .then(response => response.json())
                .then(response => this.setState({ user: response.data },
                    () => { this.attemptSignUp() }))
                .catch(err => console.error(err));
        }
    }

    attemptSignUp() {
        this.props.history.push({
            pathname: '/home',
            state: { user: this.state.user }
        });
    }

    render() {
        const { name, email, password, interests } = this.state;
        return (
            <div className="signup-box">
                <div className="signup-content">
                    <input
                        placeholder="name"
                        value={name}
                        onChange={e => this.setState({ name: e.target.value })} />
                    <input
                        placeholder="email"
                        value={email}
                        onChange={e => this.setState({ email: e.target.value })} />
                    <input
                        placeholder="password"
                        value={password}
                        onChange={e => this.setState({ password: e.target.value })} />
                    <input
                        placeholder="interests"
                        value={interests}
                        onChange={e => this.setState({ interests: e.target.value })} />
                    <button type="button" onClick={this.handleSignUp}> Sign Up </button>
                </div>
            </div>
        );
    }
}

export default withRouter(Signup);
