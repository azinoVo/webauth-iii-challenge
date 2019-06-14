import React, { Component } from 'react';
import axios from 'axios';
import '../config/axiosConfig';


class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }   
    }

    componentDidMount() {

        axios
        .get('http://localhost:8000/api/users')
        .then(res => {
            console.log(res)

            this.setState({
                users: res.data
            })
    
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    render() {
        return (
            <div>
                USERS LIST
                {localStorage.getItem('token') ? this.state.users.map(user => {
                    return <div key={user.id}>{user.username}</div>
                })  : <div>Please login to view users.</div>}

                {localStorage.getItem('token') && <button onClick={this.logout}>Logout</button>}


            </div>
        );
    }

    logout = event => {
        event.preventDefault();
        localStorage.removeItem('token');

        this.props.history.push('/signin')
    }
}

export default Users;