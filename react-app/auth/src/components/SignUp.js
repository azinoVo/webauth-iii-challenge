import React, { Component } from 'react';

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
            <div className='register'>
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
        console.log(this.state);

        this.setState({
            [event.target.name]: event.target.value
        })

    }

    register = event => {
        event.preventDefault();


    }

}

export default SignUp;