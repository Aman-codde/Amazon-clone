
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { ProductModel } from './schemas/product.schema.js'
import mongoose from 'mongoose';
import { UserModel } from './schemas/user.schema.js';
import { CategoryModel } from './schemas/category.schema.js';

const app = express();
const PORT = 3501;


app.use(cors());
app.use(express.json());

const saltRounds = 10;


mongoose.connect('mongodb://localhost:27017/amazonCloneDB')
.then(() => {
    console.log('Connected to DB Successfully');
})
.catch(err => console.log('Failed to Connect to DB', err))


app.get('/', function(req, res) {
   res.json({message:'test'});
});

//show category collection 
app.get('/categories', function(req,res) {
    CategoryModel
    .find()
    .then( data => {
        console.log(data)
        res.json( {data} )})
    .catch(err => res.json(err))
})

// create category
app.post('/create-category', function(req,res) {
    const new_category = new CategoryModel(req.body)
    new_category
    .save()
    .then(data => {
        console.log('new category created', {data});
        res.json({data})
    })
    .catch(err => res.json(err))//which status number?
})

// show products collection
app.post('/products', function(req,res){
    console.log('hello',req.body);
    ProductModel.find(req.body)
    .then(data => res.json({data}))
    .catch(err => {
        res.status(501)
        res.json({errors: err});
    })
});

//create product
app.post('/create-product', function(req,res){
    const {name, price, quantity, imgUrl} = req.body;
    const product = new ProductModel({
        name,
        price,
        quantity,
        imgUrl
    });
    product.save()
    .then((data) => {
        res.json({data});
    })
    .catch(err => {
        res.status(501).json({errors: err});
    })
});

// delete product
app.delete('/delete-product/:id', function(req, res) {
    const _id = req.params.id;
    ProductModel.findByIdAndDelete(_id).then((data) => {
        console.log(data);
        res.json({data});
    });
})

// update product
app.put('/update-product/:id', function(req, res) {
    console.log("Update product");
    ProductModel.findByIdAndUpdate(
        req.params.id,
        {
            $set: { name: req.body.name, price: req.body.price, quantity: req.body.quantity, imgUrl: req.body.imgUrl },
        },
        {
            new: true,
        },
        function(err, updateProduct) {
            if(err) {
                res.send("Error updating product");
            }
            else{
                res.json(updateProduct);
            }
        }
    )
})

//create-user
app.post('/create-user', function(req,res){
    const {firstName, lastName, email, password} = req.body;
    // salt and hash orignial password to encrypted password
    bcrypt.genSalt(saltRounds, function(err, salt) {
        console.log('salt: '+ salt);
        bcrypt.hash(password, salt, function(err, hash) {
            console.log('hash' + hash);
            // store hash in database here
            const user = new UserModel({
                firstName,
                lastName,
                email,
                hashedPassword : hash // pass password as type hash
            });
            user.save()
            .then((data) => {
                res.json({data});
            })
            .catch(err => {
                res.status(501).json({errors: err});
            })
        })
    });
});

// show users
app.get('/users', function(req,res){
    UserModel.find()
    .then(data => res.json({data}))
    .catch(err => {
        res.status(501).json({errors: err});
    })
});

// delete user
app.delete('/delete-user/:id', function(req, res) {
    const _id = req.params.id;
    UserModel.findByIdAndDelete(_id).then((data) => {
        console.log(data);
        res.json({data});
    });
})


//update user
app.put('/update-user/:id', function(req, res) {
    console.log("Update user");
    UserModel.findByIdAndUpdate(
        req.params.id,
        {
            $set: { firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, hashedPassword: req.body.hashedPassword },
        },
        {
            new: true,
        },
        function(err, updateUser) {
            if(err) {
                res.send("Error updating user");
            }
            else{
                res.json(updateUser);
            }
        }
    )
})



app.listen(PORT, function(){
    console.log( `starting at localhost http://localhost:${PORT}`);
})
