'use strict'
const db = require('../models/index');
const controller = {};

// FUNCTIONS
controller.listAll = async(req, res) => {
    db.listProducts()
    .then(products => res.status(200).json(products))
    .catch((err) => {
        console.log('Error: ', err.message);
        res.status(500).json('Error: ' + err.message)
    });
};
controller.add = (req, res) => {
    db.newProduct(req.body.name, req.body.description, req.body.price, req.body.img)
    .then(product => { res.status(200).json({ 
        response: {
            message: 'Product created successfully:', 
            product: product 
        } });
    })
    .catch((err) => {
        console.log('Error: ', err.message);
        res.status(500).json('Error: ' + err.message)
    });
};
controller.listById = async(req, res) => {
    db.listProduct(req.params.productId)
    .then(product => res.status(200).json(product))
    .catch((err) => {
        console.log('Error: ', err.message);
        res.status(500).json('Error: ' + err.message)
    });
};
controller.put = async(req, res) => {
    db.putProduct(req.params.productId, req.body.name, req.body.description, req.body.price, req.body.img)
    .then(product =>{
        if(product[1] !== 1) 
        res.status(500).json('Product could not be updated');
        else
        res.status(200).json('Product updated successfully')
    })
    .catch((err) => {
        console.log('Error: ', err.message);
        res.status(500).json('Error: ' + err.message)
    });
};
controller.delete = async(req, res) => {
    db.deleteProduct(req.params.productId)
    .then(() => res.status(200).json('Product deleted successfully'))
    .catch((err) => {
        console.log('Error: ', err.message);
        res.status(500).json('Error: ' + err.message)
    });
}

module.exports = controller;