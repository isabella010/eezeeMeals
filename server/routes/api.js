//import { AccountsService } from '../accounts.service';

//const {accSer} = require('.../src/app/account.service');

const { CallTracker } = require('assert');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');
const Account = require('./models/accounts');
const Meals = require('./models/food')
//const AccountsService = require('../account.services'); // 2/2
//const accService = new AccountsService();
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./localstorage');

const db = "mongodb+srv://Admin:ThePurpleDrank@eezeemeals.bxdvjqk.mongodb.net/?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;

mongoose.connect(db, function(err)
{
    if(err)
    {
        console.error("ERROR! " + err);
    }
    else{
        console.log("CONNECTED TO DATABASE");
    }
})
/////////////////////ACCOUNTS//////////////////////////////////////
router.get('/accounts', function(req, res)
{
    console.log('Get Request for accounts');
    Account.find({})
    .lean().exec(function(err, userAccounts){
        if(err)
        {
            console.log("Error retrieving accounts");
        }else{
            res.json(userAccounts);
        }
    })
    //res.send('api works')
});

//isabellas addition v-----------------------------------------------------------------------------------------
router.post('/login',(req,res)=>{
    let userData = req.body
    Account.findOne({email: userData.email}, (error, user) =>{
        if (error){
            console.log(error)
        } else{
            if(!user){
                res.status(401).send('Invalid Email');
            }else{
                if(user.password !== userData.password){
                    res.status(401).send('Invalid Password');
                }else{
                    let payload = { subject: user._id }
                    let token_ = jwt.sign(payload, 'secretKey') //let token = jwt.sign(payload, 'secretKey') 

                    const data={
                        token: token_,
                        currId: user._id
                    };
                    res.status(200).send({data}) //res.status(200).send({token}) // 2/2/2023
                }
            }
        }
    })
})

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new Account(userData);
    user.save((error, registerdUser) => {
        if(error){
            console.log(error)
        } else {
            let payload = {subject: registerdUser._id}
            let token_ = jwt.sign(payload, 'secretKey') //let token = jwt.sign(payload, 'secretKey') 
            const data={
                token: token_,
                currId: user._id
            };
            res.status(200).send({data}) //res.status(200).send({token}) // 2/2/2023
        }
    })
})

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token == 'null'){
        return res.status(401).send('unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload){
        return res.status(401).send('unauthorized request')
    }
    req.userId = payload.subject
    next()
}

//good version!!!
/*
router.put('/addCart/:itemId', function(req, res) { // 2/2/2023
    console.log('Adding to cart');
    let _userId = localStorage.getItem('currId');

    Account.findById(_userId, function(err, foundAccount) {
        if (err) {
            res.send('Error finding account');
        } else {
            foundAccount.cart.push(req.params.itemId);
            foundAccount.save(function(err, updatedAccount) {
                if (err) {
                    res.send('Error adding to cart');
                } else {
                    res.json(updatedAccount);
                }
            });
        }
    });
}); */

router.put('/addCart/:itemId', function(req, res) { // 2/19
    /*console.log('Adding to cart');
    let _userId = localStorage.getItem('currId');

    Account.findById(_userId, function(err, foundAccount) {
        if (err) {
            res.send('Error finding account');
        } else {
            let itemIndex = foundAccount.cart.findIndex(item => item.itemId === req.params.itemId);
            let quantity = parseInt(req.params.quantity);
            let cartQuantity = 0;
            if (itemIndex !== -1) {
                cartQuantity = foundAccount.cart[itemIndex].quantity;
                foundAccount.cart[itemIndex].quantity += 1;
                cartQuantity++;
                console.log("cart quantity in if: ", cartQuantity);
            }
            if (cartQuantity === 0) {
                console.log("cart quantity in ===: ", cartQuantity);
                foundAccount.cart.push({itemId: req.params.itemId, quantity: cartQuantity});
            } else if (cartQuantity > 0) {
                if (itemIndex !== -1) {
                    foundAccount.cart[itemIndex].quantity += 1;
                } else {
                    foundAccount.cart.push({itemId: req.params.itemId, quantity: 1});
                }
            } else {
                res.send('Invalid quantity');
                return;
            }
            foundAccount.save(function(err, updatedAccount) {
                if (err) {
                    res.send('Error adding to cart');
                } else {
                    res.json(updatedAccount);
                }
            });
        }
    }); */
});


    router.get('/getCart', function(req, res) // 2/2/2023
{   
    let userId = req.query.user;
    console.log("req.body: ", req.query.user)
    Account.findOne({_id: userId}, (error, user) =>{
        if (error){
            console.log(error)
        } else{
            if(!user){
                res.status(401).send('User not found');
            }else{
                let cart = user.cart;
                res.status(200).send({cart}) //res.status(200).send({token}) // 2/2/2023
            }
        }
    })
});    //deleteCart

/*
  router.put('/deleteCart', function(req, res) {   
    let userId = req.body.params.user;
    let foodId = req.body.params.item;

    Account.findById(userId, (error, user) => {
      if (error) {
        console.log(error)
        return res.status(500).send({ error });
      } else {
        if(!user) {
          return res.status(401).send('User not found');
        } else {
          let cart = user.cart;
          let fcart = [];
          for(let i = 0; i < cart.length; i++) {
            if(cart[i]._id != foodId) {
              fcart.push(cart[i]);
            }else{
                foodId = 5;
            }
          }
          Account.findByIdAndUpdate(userId,
            { $set: { cart: fcart } },
            { new: true },
            (err, updatedAccount) => {
              if (err) {
                res.send("Error updating account");
              } else {
                res.json(updatedAccount);
              }
            }
          )
        }
      }
    });
}); */

router.put('/deleteAll', function(req, res) {   
    let userId = req.body.params.user;
  
    Account.findById(userId, (error, user) => {
      if (error) {
        console.log(error)
        return res.status(500).send({ error });
      } else {
        if (!user) {
          return res.status(401).send('User not found');
        } else {
          let fcart = [];
          Account.findByIdAndUpdate(userId,
            { $set: { cart: fcart } },
            { new: true },
            (err, updatedAccount) => {
              if (err) {
                res.send("Error updating account");
              } else {
                res.json(updatedAccount);
              }
            }
          );
        }
      }
    });
  });

  /*
  router.put('/updateM/:id', function(req, res) {   
    Meals.findById(req.params.id, function(err, mealToEdit){
        if(err)
        {
            res.send("Error editing Meal");
        }
        else{
            if(mealToEdit.stock == true){
                mealToEdit.splice(i, false);
            }else{
                mealToEdit.splice(i, true);
            }

            Meals.findByIdAndUpdate(req.params.id,
                { $set: { meal: mealToEdit } },
                { new: true },
                (err, updatedMeal) => {
                  if (err) {
                    res.send("Error updating meal");
                  } else {
                    res.json(updatedMeal);
                  }
                }
              )
        }
    })
  }) */

  router.put('/updateM/:id', function(req, res) {   
    Meals.findById(req.params.id, function(err, mealToEdit){
        if(err)
        {
            res.send("Error editing Meal");
        }
        else{
            // Toggle the stock status of the meal
            var change = !mealToEdit.stock;

            //mealToEdit.save(function(err) {
            //    if (err) {
            //        res.send("Error updating Meal");
            //    } else {
            //        res.json(mealToEdit);
            //    }
            //});

            Meals.findByIdAndUpdate(req.params.id,
                { $set: { stock: change } },
                { new: true },
                (err, mealToE) => {
                  if (err) {
                    res.send("Error updating meal");
                  } else {
                    res.json(mealToE);
                  }
                }
              )
        }
    });
});


  /*
  router.delete('/meals/:id', function(req,res)
{
    console.log('Deleting Meal');
    Meals.findByIdAndRemove(req.params.id, function(err,deletedMeal)
    {
        if(err)
        {
            res.send("Error deleting Meal");
        }
        else{
            res.json(deletedMeal);
        }
    })
}) */

  /*
  router.post('/meals', function(req, res) ///For Creating Meal
{
    console.log('Post meal');
    var newMeal = new Meals();
    newMeal.name = req.body.name;
    newMeal.description = req.body.description;
    newMeal.image = req.body.image;
    newMeal.price = req.body.price;

    newMeal.save(function(err, insertMeal)
    {
        if (err)
        {
            console.log('Error saving account');
        }
        else{
            res.json(insertMeal);
        }
    });
}) */

router.put('/deleteCart', function(req, res) {   
    let userId = req.body.params.user;
    let foodId = req.body.params.item;
  
    Account.findById(userId, (error, user) => {
      if (error) {
        console.log(error)
        return res.status(500).send({ error });
      } else {
        if(!user) {
          return res.status(401).send('User not found');
        } else {
          let cart = user.cart;
          for(let i = 0; i < cart.length; i++) {
            if(cart[i]._id == foodId) {
              if(cart[i].quantity > 1) {
                cart[i].quantity -= 1;
              } else {
                cart.splice(i, 1);
              }
              break;
            }
          }
          Account.findByIdAndUpdate(userId,
            { $set: { cart: cart } },
            { new: true },
            (err, updatedAccount) => {
              if (err) {
                res.send("Error updating account");
              } else {
                res.json(updatedAccount);
              }
            }
          )
        }
      }
    });
  });
  

router.get('/userCart', function(req, res) // 2/2/2023
{   
    //let _userId = accService.getId()
    let _userId = localStorage.getItem('currId');
    console.log('Get Request for account cart');
    Account.find({_userId})
    .lean().exec(function(err, userAccount){
        if(err)
        {
            console.log("Error retrieving account cart");
        }else{
            res.json(_userId);
            //res.json(userAccount.cart);
        }
    }) 
});

//isabellas addition ^-----------------------------------------------------------------------------------------


router.get('/accounts/:id', function(req, res)
{
    console.log('Get Request for single account');
    Account.findById(req.params.id)
    .lean().exec(function(err, account){
        if(err)
        {
            console.log("Error retrieving account");
        }else{
            res.json(account);
        }
    })
    //res.send('api works')
});

// router.get('/getCart', function(req, res) // 2/2/2023
// {   
//     let userId = req.query.user;
//     console.log("req.body: ", req.query.user)
//     Account.findOne({_id: userId}, (error, user) =>{
//         if (error){
//             console.log(error)
//         } else{
//             if(!user){
//                 res.status(401).send('User not found');
//             }else{
//                 let cart = user.cart;
//                 res.status(200).send({cart}) //res.status(200).send({token}) // 2/2/2023
//             }
//         }
//     })
// });    //deleteCart

router.post('/accounts', function(req, res) ///For Creating account
{
    console.log('Post account');
    var newAccount = new Account();
    newAccount.account_name = req.body.account_name;
    newAccount.first_name = req.body.first_name;
    newAccount.last_name = req.body.last_name;
    newAccount.email = req.body.email;
    newAccount.password = req.body.password;

    newAccount.save(function(err, insertAcc)
    {
        if (err)
        {
            console.log('Error saving account');
        }
        else{
            res.json(insertAcc);
        }
    });
})

router.put('/accounts/:id', function(req,res)
{
    console.log('Update Account');
    Account.findByIdAndUpdate(req.params.id,
    {
        $set: {account_name: req.body.account_name, 
               first_name: req.body.first_name,
               last_name: req.body.last_name, 
               password: req.body.password,
               street: req.body.street,
               number: req.body.number,
               unit: req.body.unit,
               city: req.body.city,
               postal: req.body.postal,
               phone: req.body.phone}
    },
    {
        new: true
    },
    function(err, updatedAccount)
    {
        if(err)
        {
            res.send("Error Updating Account");
        }
        else{
            res.json(updatedAccount);
        }
    }
    )
})

router.delete('accounts/:id', function(req,res)
{
    console.log('Deleting account');
    Account.findByIdAndRemove(req.params.id, function(err,deletedAccount)
    {
        if(err)
        {
            res.send("Error deleting account");
        }
        else{
            res.json(deletedAccount);
        }
    })
})
/////////////////////ACCOUNTS//////////////////////////////////////
/////////////////////MEALS////////////////////////////////////////
router.get('/meals', function(req, res)
{
    console.log('Get Request for meals');
    Meals.find({}).exec(function(err, allMeals){
        if(err)
        {
            console.log("Error retrieving accounts");
        }else{
            res.json(allMeals);
        }
    })
    //res.send('api works')
});

router.get('/meals/:id', function(req, res)
{
    console.log('Get Request for single account');
    Meals.findById(req.params.id)
    .lean().exec(function(err, Meals){
        if(err)
        {
            console.log("Error retrieving account");
        }else{
            res.json(Meals);
        }
    })
    //res.send('api works')
});

router.post('/meals', function(req, res) ///For Creating Meal
{
    console.log('Post meal');
    var newMeal = new Meals();
    newMeal.name = req.body.name;
    newMeal.description = req.body.description;
    newMeal.image = req.body.image;
    newMeal.price = req.body.price;

    newMeal.save(function(err, insertMeal)
    {
        if (err)
        {
            console.log('Error saving account');
        }
        else{
            res.json(insertMeal);
        }
    });
})

router.put('/updateFALSE/:id', function(req, res) {   
    Meals.findByIdAndUpdate(req.params.id,
        {
            $set: {stock: false}
        },
        {
            new: true
        },
        function(err, updatedMeal)
        {
            if(err)
            {
                res.send("Error Updating Meal");
            }
            else{
                res.json(updatedMeal);
            }
        }
        )
});

router.put('/updateTRUE/:id', function(req, res) {   
    Meals.findByIdAndUpdate(req.params.id,
        {
            $set: {stock: true}
        },
        {
            new: true
        },
        function(err, updatedMeal)
        {
            if(err)
            {
                res.send("Error Updating Meal");
            }
            else{
                res.json(updatedMeal);
            }
        }
        )
});

router.put('/meals/:id', function(req,res)
{
    console.log('Update Meal');
    console.log(req.params)
    Meals.findByIdAndUpdate(req.params.id,
    {
        $set: {name: req.body.name, 
               description: req.body.description,
               price: req.body.price}
    },
    {
        new: true
    },
    function(err, updatedMeal)
    {
        if(err)
        {
            res.send("Error Updating Meal");
        }
        else{
            res.json(updatedMeal);
        }
    }
    )
})


//original working add
/*router.put('/add', (req, res) => {
    let userId = req.body.user;
    let foodId = req.body.item;
    Account.findById(userId, function(err, account) {
        if (err) {
            res.send("Error finding account");
        } else {
            account.cart.push(foodId);
            account.save(function(err, updatedAccount) {
                if (err) {
                    res.send("Error updating cart");
                } else {
                    res.json(updatedAccount);
                }
            });
        }
    });
}); */


router.put('/add', (req, res) => {
    let userId = req.body.user;
    let foodId = req.body.item;
    Account.findById(userId, function(err, account) {
        if (err) {
            res.send("Error finding account");
        } else {
            let found = false;
            let cartLength = account.cart.length;
            for(var i = 0; i < cartLength; i++){
                if(account.cart[i]._id === foodId._id){
                    console.log("in the cart already..");
                    account.cart[i].quantity += 1;
                    found = true;
                    account.cart.splice(i, 1, account.cart[i]);
                    break;
                }
            }
            if(!found){
                account.cart.push(foodId);
            }
            account.save(function(err, updatedAccount) {
                if (err) {
                    res.send("Error updating cart");
                } else {
                    res.json(updatedAccount);
                }
            });
        }
    });
});
  



  
/*
router.put('/add', (req, res) => {
    let userId = req.body.user;
    let foodId = req.body.item;
  
    Account.findById(userId, function(err, account) {
      if (err) {
        res.send("Error finding account");
      } else {
        let itemIndex = account.cart.findIndex(item => item.itemId.toString() === foodId.toString());
  
        if (itemIndex !== -1) {
          // If the item is already in the cart, update the quantity
          account.cart[itemIndex].quantity++;
        } else {
          // If the item is not in the cart, add a new entry with quantity 1
          account.cart.push({ itemId: foodId, quantity: 1 });
        }
  
        account.save(function(err, updatedAccount) {
          if (err) {
            res.send("Error updating cart");
          } else {
            res.json(updatedAccount);
          }
        });
      }
    });
  }); */
  

router.delete('/meals/:id', function(req,res)
{
    console.log('Deleting Meal');
    Meals.findByIdAndRemove(req.params.id, function(err,deletedMeal)
    {
        if(err)
        {
            res.send("Error deleting Meal");
        }
        else{
            res.json(deletedMeal);
        }
    })
})

module.exports = router;