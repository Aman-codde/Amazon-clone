
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { ProductModel } from './schemas/product.schema.js'
import mongoose from 'mongoose';
import { UserModel } from './schemas/user.schema.js';
import { CategoryModel } from './schemas/category.schema.js';

const app = express();
const PORT = 3504;


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
// .populate(
    //     {path: 'parentCategory', 
    //     populate: [
    //         {path: 'parentCategory',
    //         populate: [{path: 'parentCategory'}]
    //         }
    //     ]})// populate return array of document in place of original _ids only

//show category collection 
app.get('/categories', function(req,res) {
    CategoryModel
    .find()
    .populate(
             {path: 'parent_category', 
             populate: [
                 {path: 'parent_category',
                 populate: [{path: 'parent_category'}]
                 }
             ]})
    .then( data => {
        //console.log("get categories: ",data)
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

// update (or add) parent category if not assigned etc.
app.post('/update-parent-category', function(req,res) {
    CategoryModel
    .findByIdAndUpdate(
        req.body.id,
        {parent_category: req.body.parent},
        {new: true})
    .then((data) => {
        console.log('parent Category updated: ', {data})
        res.json({data})})
    .catch(err => res.json(err))
}) 

// show products collection
app.post('/products', function(req,res){
    const query: any = {};
    if(req.body.categories)
    {
        query.categories = {$in:[req.body.categories]};
    }
    //console.log('hello',query);
    ProductModel.find(query)
    .then(data => res.json({data}))
    .catch(err => {
        res.status(501)
        res.json({errors: err});
    })
});

// show particular product by id 
app.post('/product/:id', function(req,res) {
    console.log("Product selected: ",req.params.id);
    ProductModel
    .findById(req.params.id)
    .populate('categories')
    .then(data => {
        console.log("Product choosen: ", data);
        res.json({data})
    })
    .catch(err => {err})
})

//create product
app.post('/create-product', function(req,res){
    const {product_name, price, quantity, imgUrl} = req.body;
    const product = new ProductModel({
        product_name,
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
//{
//     $set: { product_name: req.body.product_name, price: req.body.price, quantity: req.body.quantity, imgUrl: req.body.imgUrl },
// }
app.put('/update-product/:id', function(req, res) {
    console.log("req.body",req.body);
    const categoryId = req.body.id;
    ProductModel.findByIdAndUpdate(
        req.params.id,
        {
            $push: {categories: categoryId}
        }
        ,
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
app.post('/create-user', function(req,res) {
    const {firstName, lastName, email, password} = req.body;
    bcrypt.genSalt(saltRounds,function(err, salt) {
        console.log("salt (complex string generated): ",salt)
        
        bcrypt.hash(password,salt,function(err,hash) {
            console.log("Encrypted/hashed password with salt string added: ", hash);

            const new_user = new UserModel({
                firstName,
                lastName,
                email,
                password: hash
            });
            console.log(new_user);
            new_user
            .save()
            .then(data => {
                console.log("new user: ", data)
                res.json({data})
            })
            .catch(err => res.status(501).json({err}));
        })
    })
})


// show users
app.get('/users', function(req,res){
    UserModel.find()
    .then(data => res.json({data}))
    .catch(err => {
        res.status(501).json({errors: err});
    })
});

//login user
app.post('/login', function(req,res) {
    const {email, password} = req.body;

    UserModel
    .findOne({email})
    .then((user: any) => {
        console.log(user);
        bcrypt.compare(password, `${user?.password}`,function(err, result) {
            if(result) {
                console.log("It matches!");
                res.json({user});
                //res.json({message: "Successfully Logged In"});
            }
            else {
                console.log("Invalid password");
                res.sendStatus(403);
            }
        })
    })
    .catch(err => {
        return res.sendStatus(404)
    })
})

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

// total amount in particular cart($sum, $projection "totalAmountt")
app.get('/cart-amount', function(req,res) {
    const user = "615ee77596fadd70d45456a2";
    ProductModel
    .find({user})
    //.populate('products')
    .then(data => res.json(data))
    .catch(err => res.json({err}))
})




app.listen(PORT, function(){
    console.log( `starting at localhost http://localhost:${PORT}`);
})
