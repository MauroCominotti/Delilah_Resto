'use strict'
require('../database/connection');
const db = require('../models/index');
const jwt = require('./auth');
//////////////////////////////// CONTROLLER ////////////////////////////////////////////////////////////////
const controller = {};

// FUNCTIONS
controller.listById = (req, res) => {
    db.listUser(req.params.userId)
    .then(user => res.status(200).json(user))
    .catch((err) => {
        console.log('Error: ', err.message);
        res.status(500).json('Error: ' + err.message)
    });
};
controller.validateUser = (req, res) => {
    const { username } = req.body;
    const { password } = req.body;
    
    db.userLogin(username, password)
    .then((result) => {
        if (result.length !== 0) {
            var token = jwt.jwtGenerate(username, result[0].dataValues.type);
            req.userAuthenticated = username;
            res.status(200).send({ token });
        }
        else {
            res.status(404).send('The user does not exist or the password is incorrect');
        }
    })
    .catch(err => {
        console.log('Error: ', err.message);
        res.status(500).json('Error: ' + err.message)
    })
};

controller.addAdmin = async (req, res) => {
    const data = req.body;
    db.newUser(data.username, data.name, data.address, data.email, data.phone, 'admin', data.password)
    .then(() => res.status(200).json('Successfully created.'))
    .catch((err) => {
        console.log('Error: ', err.message);
        res.status(500).json('Error: ' + err.message)
    })
};

controller.add = async (req, res) => {
    const data = req.body;
    db.newUser(data.username, data.name, data.address, data.email, data.phone, 'user', data.password)
    .then(user => {
        res.status(200).json({
            response: {
                message: 'User created successfully:',
                user: user
            }
        });
    })
    .catch((err) => {
        console.log('Error: ', err.message);
        res.status(500).json('Error: ' + err.message)
    })
};

controller.delete = async (req, res) => {
    const { id } = req.params;
    db.deleteUser(id)
    .then(() => res.status(200).json('User deleted successfully'))
    .catch((err) => {
        console.log('Error: ', err.message);
        res.status(500).json('Error: ' + err.message)
    })
};

controller.populateTables = async (req, res) => {
    console.log('----------------------------- SYNCHRONIZING -----------------------------');
    sequelize.sync({
        force: true
    })
    .then(async () => {
        console.log('----------------------------- THE SYNCHRONIZATION WAS SUCCESSFULLY DONE -----------------------------');
        console.log();
        console.log('----------------------------- POPULATING TABLES ----------------------------- ');
        for (let i = 0; i < 10; i++) {
            await db.populateTables()
            .then(() => { console.log(); console.log(`NUMBER ${i} GENERATED`); console.log() })
            .catch((err) => {
                console.log('Error: ', err.message);
                res.status(500).json('Error: ' + err.message)
            })
        };
        db.newUser('admin', 'admin', 'adminStreet 123', 'admin@hotmail.com', '03492565748', 'admin', 'admin123')
        .then(() => { console.log(); console.log('ADMIN SUCCESSFULLY CREATED'); console.log() })
        .catch((err) => {
            console.log('Error: ', err.message);
            res.status(500).json('Error: ' + err.message)
        });
    })
    .then(() => {
        res.status(200).json('The tables have been populated.')
    })
    .catch(err => {
        console.log('Error: ', err.message);
        res.status(500).json('Error: ' + err.message)
    })
};

module.exports = controller;