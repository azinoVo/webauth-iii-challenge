import React, { Component } from 'react';
import axios from 'axios';


class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            credentials: {
                username: "",
                password: "",
                department: ""
            }

        }
    }

    render() {
        return (
            <div className='credential-form'>
                LOGIN FORM HERE
                <form onSubmit={this.login} autoComplete="off">
                    <input
                        type="text"
                        name="username"
                        value={this.state.credentials.username}
                        placeholder="...username"
                        onChange={this.onChange}
                    />
                    <input
                        type="password"
                        name="password"
                        value={this.state.credentials.password}
                        placeholder="...password"
                        onChange={this.onChange}
                    />

                    <input
                        type="text"
                        name="department"
                        value={this.state.credentials.department}
                        placeholder="...department"
                        onChange={this.onChange}
                    />

                    <button>Login</button>
                </form>
            </div>
        );
    }

    

    onChange = event => {
        console.log(this.state.credentials);

        this.setState({
            credentials: { ...this.state.credentials,
                [event.target.name]: event.target.value
            }
        })
    }

    login = event => {
        event.preventDefault();
        const credentials = {
            ...this.state.credentials
        }

        axios
            .post('http://localhost:8000/api/login', credentials)
            .then(res => {
                console.log(res);

                localStorage.setItem('token', res.data.token)

                this.props.history.push('/users')
            })
            .catch(err => {
                console.log(err);

            })

    }

}

export default SignIn;