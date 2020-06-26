require("dotenv").config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const conn = require('./database/dataConnection');
const app = express();
const port = process.env.PORT || conn.conf_port_app || 3000;

//Importing routes
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

// Settings
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(morgan('dev'));

// DB Connection
require('./database/connection');

// BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Handling Errors
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

//Starting the Server
sequelize.authenticate()
.then(() => {
    app.listen(port, () => {
        console.log(`Server on port ${port}`);
    });
})
.catch(err => console.error(`Unable to connect to the database: ${err}`))

