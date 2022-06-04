const express = require('express');
const cors = require('cors');
const {mongoose} = require('./db');


var productController = require('./controller/productControler');
var tagController = require('./controller/tagController');
var categoryController = require('./controller/categoryController');
var userController = require('./controller/userController');
var registerController = require('./controller/registerController');
var loginController = require('./controller/loginController');
var orderController = require('./controller/orderController');



const app = express();

app.use(cors());

app.use(express.json());



app.use(express.urlencoded({
  extended: true
}));



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}.....`));



app.use('/product', productController );
app.use('/tag', tagController );
app.use('/category', categoryController );
app.use('/user', userController );
app.use('/register', registerController  );
app.use('/login', loginController  );
app.use('/order', orderController  );





