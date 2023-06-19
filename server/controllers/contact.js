// File name: Express app portfolio
// Student’s Name: Theresa Bennett
// StudentID: 300909345
// Date: June 18th, 2023

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Contact Model
let Contact = require('../models/contact');

module.exports.displayContactList = async (req, res, next)=>{
    try {
        let contactList = await Contact.find();
        //console.log(ContactList);

        res.render('contact/list', 
            {title: 'Contact', 
            ContactList: contactList,
            displayName: req.user ? req.user.displayName : ''})
    } catch (err){
        console.log(err);
    }
};

module.exports.displayAddPage = async (req, res, next)=>{
    try {
        res.render('contact/add', 
        {title: 'Add Contact',
        displayName: req.user ? req.user.displayName : ''})
    } catch (err){
        console.log(err);
    }
};

module.exports.processAddPage = async (req, res, next) => {
    let newContact = new Contact({
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
   
    });

    try {
        await newContact.save();
        res.redirect('/contact-list')
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports.displayEditPage = async (req, res, next) => {
    let id = req.params.id;

    try {
        let contactToEdit = await Contact.findById(id);
        res.render('contact/edit', 
        {title: 'Edit Contact', 
        contact: contactToEdit,
        displayName: req.user ? req.user.displayName : ''});
    } catch (err){
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports.processEditPage = async (req, res, next) => {
    let id = req.params.id;

    let updatedContact = {
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    };

    try {
        await Contact.updateOne({_id: id}, updatedContact);
        res.redirect('/contact-list');
    } catch (err){
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports.performDelete = async (req, res, next) => {
    let id = req.params.id;

    try {
        await Contact.findByIdAndRemove(id);
        res.redirect('/contact-list');
    }catch (err){
        console.log(err);
        res.status(500).send(err);
    }
};
