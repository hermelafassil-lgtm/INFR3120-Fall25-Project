let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Book = require('../models/book');

// get --> Extract & read something
// post --> post something
// put --> Edit/Update some data
// delete --> Delete the data
// CRUD --> Create, Read, Update & Delete

// Get route for the read book list - Read Operation
router.get('/',async(req,res,next)=>{
    try
    {
        const BookList = await Book.find();
        //console.log(BookList);
        res.render('Books/list',{
            title:'Books',
            BookList:BookList
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Books/list',{
            error:'Error on server'
        })
    }
})

// Get route for displaying the Add Page - Create Operation
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Books/add',{
            title:'Add a Book'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Books/add',{
            error:'Error on server'
        })
    }
})
// Post route for processing the Add Page - Create Operation
router.post('/add',async(req,res,next)=>{
    try
    {
        let newBook = Book({
            "name":req.body.name,
            "author":req.body.author,
            "description":req.body.description,
            "price":req.body.price
        });
        Book.create(newBook).then(()=>{
            res.redirect('/books')
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Books/add',{
            error:'Error on server'
        })
    }
})
// Get route for displaying the Edit Page - Update Operation
router.get('/edit/:id',async(req,res,next)=>{

})
// Post route for processing the Edit Page - Update Operation
router.post('/edit/:id',async(req,res,next)=>{

})
// Get route for performing delete operation - Delete Operation
router.get('/delete/:id',async(req,res,next)=>{

})
module.exports = router;