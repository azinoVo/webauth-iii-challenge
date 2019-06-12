const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig.js');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret')
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send("Server Works!");
});


server.post('/api/register', (req, res) => {
    const { username, password, department } = req.body;

    if (!username, !password, !department) {
        // Checks if fields are present in the body from user. Better as a middleware, but again, good practice.
        res.status(500).json({ message: "Please provide credentials!" });
    } else {
        db('users')
            // Make sure the username is unique, though this would already throw an error if there's a conflict
            // due to constraints, but it's good practice.
            .where({ username })
            .first()
            .then(user => {
                console.log(user);
                // If username already exists, throw error
                if (user) {
                    res.status(400).json({ message: "A user with that username already exists." })
                } else {
                    // Hash the password and save the user into the database
                    let user = req.body;
                    const hash = bcrypt.hashSync(user.password, 10)
                    user.password = hash;

                    db('users')
                        .insert(user, 'id')
                        .then(ids => {
                            const [id] = ids;

                            // After insert, find the user within the database and welcome by name.
                            // This ensures the user is registered first.

                            db('users')
                                .where({ id })
                                .first()
                                .then((user) => {
                                    res.status(200).json({ message: `Welcome ${user.username}!` });

                                })
                                .catch(err => {
                                    res.status(500).json({ message: "Error while adding user." })
                                })
                        })
                        .catch(err => {
                            res.status(500).json({ message: "Error while finding users." })
                        })
                }
            })
            .catch(err => {
                res.status(500).json({ message: "Error adding user." })
            })
    }
})

server.post('/api/login', (req, res) => {
    const { username, password, department } = req.body;

    // Checks if fields are present in the body from user. Better as a middleware.

    if (!username, !password, !department) {
        res.status(500).json({ message: "Please provide credentials!" });
    } else {
        // Find user in database

        db('users')
            .where({ username })
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                // Create the token using a function passing in the user as argument
                const token = generateToken(user)

                    res.status(200).json({ message: "Login Successful!", token })
                } else {
                    res.status(401).json({ message: "Login Failure. Please Provide correct user information!" })
                }
            })
            .catch(err => {
                res.status(404).json(err);
            })
    }
});

server.get('/api/users', (req, res) => {

});

// Create the Token function
// No sensitive information in tokens

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username, // add other relevant data here
    };
    // other options available in library

    const options = {
        expiresIn: '3h'
    };

    return jwt.sign(payload, secret.jwtSecret, options); // this method is synchronous
}


// Middleware

function nameHere(req, res, next) {

};



module.exports = server;
