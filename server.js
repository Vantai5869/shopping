
global.__basedir = __dirname;

// Declaring Environment
const dotenv = require('dotenv');
dotenv.config();

// Declare DB
const { sequelize } = require(__basedir + '/models');

// Declaring Modules
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

/** MIDDLEWARES */

// CORS Middleware
app.use(cors({ origin: "*", credentials: true }));

// BodyParser Middleware
app.use(express.json());

// Cookie Parser Middleware
app.use(cookieParser());

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Session

/** IMPORT ROUTES */

// authentication route
const rAuth = require(__basedir + '/routes/auth');
const rBrand = require(__basedir + '/routes/brand');
const rType = require(__basedir + '/routes/type');
const rProduct = require(__basedir + '/routes/product');
const rProductSize = require(__basedir + '/routes/productSize');
const rSize = require(__basedir + '/routes/size');
const rComment = require(__basedir + '/routes/comment');
const rInvoice = require(__basedir + '/routes/invoice');
const rInvoiceDetail = require(__basedir + '/routes/invoiceDetail');
const rBlog = require(__basedir + '/routes/blog');
const rVoucher= require(__basedir + '/routes/voucher');
const rUser= require(__basedir + '/routes/user');

/** ROUTES */

// authentication route middleware
app.use('/api/auth', rAuth);
app.use('/api/brand', rBrand);
app.use('/api/type', rType);
app.use('/api/product', rProduct);
app.use('/api/productSize', rProductSize);
app.use('/api/size', rSize);
app.use('/api/comment', rComment);
app.use('/api/invoice', rInvoice);
app.use('/api/invoiceDetail', rInvoiceDetail);
app.use('/api/blog', rBlog);
app.use('/api/voucher', rVoucher);
app.use('/api/user', rUser);

/** RUN THE API ON PORT */
app.listen(process.env.PORT||5000, async () => {
    console.log('local server is running on port', 5000);
    await sequelize.authenticate();
    console.log('database is connected');
});