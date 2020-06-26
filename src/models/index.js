const faker = require('faker');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

User.hasMany(Order, { as:'Orders', foreignKey:'userId' });
Order.belongsTo(User, { as:'Users', foreignKey:'userId' });

Order.hasMany(Cart, { as:'Carts', foreignKey:'orderId' });
Cart.belongsTo(Order, { as:'Orders', foreignKey:'orderId' });

Product.hasMany(Cart, { as:'Carts', foreignKey:'productId' });
Cart.belongsTo(Product, { as:'Products', foreignKey:'productId' });

const { Op } = require('sequelize');
const db = {};

const errHandler = (err) => {
    console.log('Error: ', err);
}

// User functions
db.listUser = (id) => {
    return User.findOne({ where: { id: id } })
};
db.newUser = (username, name, address, email, phone, type, password) => {
    return User.create({
        username: username, 
        name: name, 
        address: address, 
        email: email, 
        phone: phone, 
        type: type, 
        password: password,  
    })
};
db.deleteUser = (id) => {
    return User.destroy({ where: {id: id} })
};
db.userLogin = (username, password) => { 
    return User.findAll({ where: { password: password, [Op.or]: [{username: username}, {email: username}] }})
};
db.getUserId = (username) => {
    return User.findAll({ where: { username: username } })
} 
// Product functions
db.newProduct = (name, description, price, img) => {
    return Product.create({ 
        name: name, 
        description: description, 
        price: price,
        img: img
    });
};
db.listProducts = () => {
    return Product.findAll()
};
db.listProduct = (id) => {
    return Product.findOne({ where: { id: id } })
};
db.putProduct = (id, name, description, price, img) => {
    // Done with '.update' you can change if you want some parameters, 
    // it's not neccessary to send all the parameters
    return Product.update({
        name: name,
        description: description,
        price: price,
        img: img
    },
    { where: { id: id }, 
    returning: true, // needed for affectedRows to be populated
    plain: true // makes sure that the returned instances are just plain objects }
});
}

db.deleteProduct = (id) => {
    return Product.destroy({ where: { id: id } })
};

// Order functions
db.newOrder = (userId, state, paymentMethod, price) => {
    return Order.create({
        userId: userId,
        state: state,
        paymentMethod: paymentMethod,
        price: price,
    })
};
db.listOrders = () => {
    return Order.findAll()
};
db.listOrder = (id) => {
    return Order.findOne({ where: { id: id } })
};
db.putOrder = async (id, state) => {
    // We don't use '.update' because we just want to change the state
    const order = await db.listOrder(id)
    .then(order => order);
    order.state = state;
    await order.save();
    return order;
};
db.deleteOrder = (id) => {
    Cart.destroy({ where: { orderId: id } })
    .then(res => Order.destroy({ where: { id: id } }) );
};
// Cart functions
db.newCart = (productId, orderId, productCuantity) => {
    return Cart.create({
        productId: productId,
        orderId: orderId,
        productCuantity: productCuantity
    })
};


// Bootstraping Tables
db.populateTables = async () => {
    let user = await User.create({ 
        username: faker.internet.userName(), 
        name: faker.name.findName(), 
        address:faker.address.streetAddress(),
        email: faker.internet.email(), 
        phone: Math.floor(Math.random() * (1000000 - 100000) + 100000), 
        type:'user', 
        password: faker.internet.password()
    })
    .catch(errHandler)
    
    let product = await Product.create({ 
        name: faker.commerce.productName(), 
        description: faker.commerce.productAdjective(), 
        price: faker.commerce.price(),
        img: faker.image.imageUrl() + (Math.floor(Math.random() * (1000000 - 100000) + 100000)).toString(), 
    })
    .catch(errHandler)
    
    let order = await Order.create({ 
        userId: user.id,
        state: 'nuevo',
        paymentMethod: 'efectivo', 
        price: product.price,  
    })
    .catch(errHandler)
    
    let cart = await Cart.create({
        productId: product.id,
        orderId: order.id,
        productCuantity: 1
    })
    .catch(errHandler)
}

module.exports = db;