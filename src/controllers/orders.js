'use strict'
const db = require('../models/index');
const controller = {};

// FUNCTIONS
controller.listAll = async(req, res) => {
    db.listOrders()
    .then(orders => res.status(200).json(orders))
    .catch((err) => {
        console.log('Error: ', err.message);
        res.status(500).json('Error: ' + err.message)
    });
};
controller.add = (req, res) => {
    db.newOrder(req.body.userId, req.body.state, req.body.paymentMethod, req.body.price)
    .then(orderId => {
        try {
            req.body.products.forEach(product => { //array of product selected by the client
                db.newCart(product.id, orderId.id, product.cuantity)
                .then(() => res.status(200).json('Order created successfully'))
                .catch(err => res.status(500).json('The Cart could not be created.'));
            });
        } catch (error) {
            res.status(500).json('The cart could not be created. You have to enter the array of products')
        }
    })
    .catch((err) => {
        console.log('Error: ', err.message);
        res.status(500).json('Error: ' + err.message)
    });
};
controller.listById = async(req, res) => {
    const user = await db.getUserId(req.userAuthenticated);
    db.listOrder(req.params.orderId)
    .then(order => {
        //if the user made the order he can see it
        if (user[0].dataValues.id === order.userId)
            res.status(200).json(order);
        else
            res.status(403).json('User not allowed to get this order');
    })
    .catch((err) => {
        console.log('Error: ', err.message);
        res.status(500).json('Error: ' + err.message)
    });
};
controller.put = async(req, res) => {
    db.putOrder(req.params.orderId, req.body.state)
    .then(order => {
        if(JSON.stringify(order) === undefined)
        res.status(500).json('Order could not be updated');
        else
        res.status(200).json('Order updated successfully')
    })
    .catch((err) => {
        console.log('Error: ', err.message);
        res.status(500).json('Error: ' + err.message)
    });
};
controller.delete = async(req, res) => {
    db.deleteOrder(req.params.orderId)
    .then(order => {
        console.log(JSON.stringify(order))
        if (JSON.stringify(order) === undefined){
            res.status(500).json('Order could not be deleted');
        }
        else {
            if(JSON.stringify(order) == 0){
                res.status(500).json('Order could not be deleted because it did not exist in the database.')
            }
            else{
                res.status(200).json('Order deleted successfully')
            }
        }
    })
    .catch((err) => {
        console.log('Error: ', err.message);
        res.status(500).json('Error: ' + err.message)
    });
}

module.exports = controller;