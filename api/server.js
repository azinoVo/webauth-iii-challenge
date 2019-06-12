const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig.js');

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
        res.status(500).json({ message: "Please provide credentials!" });
    } else {
        db('users')
            .where({ username })
            .first()
            .then(user => {
                console.log(user);

                if (user) {
                    res.status(400).json({ message: "A user with that username already exists." })
                } else {
                    let user = req.body;
                    const hash = bcrypt.hashSync(user.password, 10)
                    user.password = hash;

                    db('users')
                        .insert(user, 'id')
                        .then(ids => {
                            const [id] = ids;

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
                res.status(500).json({message: "Error adding user."})
            })
    }
})

server.post('/api/login', (req, res) => {

});

server.get('/api/users', (req, res) => {

});


// Middleware

function nameHere(req, res, next) {

};



module.exports = server;
