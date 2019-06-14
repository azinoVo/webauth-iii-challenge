import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component {
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
                SIGNUP FORM HERE
                <form onSubmit={this.register} autoComplete="off">
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

                    <button>Register</button>
                </form>
            </div>
        );
    }


    onChange = event => {
        console.log(this.state.credentials);

        this.setState({
            credentials: {
                ...this.state.credentials,
                [event.target.name]: event.target.value
            }
        })
    }

    register = event => {
        event.preventDefault();
        const credentials = {
            username: this.state.credentials.username,
            password: this.state.credentials.password,
            department: this.state.credentials.department
        }

        axios
            .post('http://localhost:8000/api/register', credentials)
            .then(res => {
                console.log(res);

                this.props.history.push('/signin')

            })
            .catch(err => {
                console.log(err);

            })
    }

}

export default SignUp;