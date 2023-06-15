let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Game Model
let Game = require('../models/game');

let gameController = require('../controllers/game')

// Get Route for the Game List page - READ Operation
router.get('/', async (req, res, next)=>{
    try {
        let gameList = await Game.find();
        //console.log(gameList);

        res.render('game/list', {title: 'Games', GameList: gameList})
    } catch (err){
        console.log(err);
    }
});


// Get Route for the Add page - CREATE operation
router.get('/add', async (req, res, next)=>{
    try {
        res.render('game/add', {title: 'Games'})
    } catch (err){
        console.log(err);
    }
});

// Post Route for processing the Add page - CREATE operation
router.post('/add', async (req, res, next) => {
    let newGame = new Game({
        "name": req.body.name,
        "developer": req.body.developer,
        "released": req.body.released,
        "description": req.body.description,
        "price": req.body.price

    });

    try { 
        await newGame.save();
        res.redirect('/game-list')
    } catch (err) {
        console.log(err);
        res.status(500).send(err);

    }
});


// Get Route for displaying the Edit page - UPDATE operation
router.get('/edit/:id', async (req, res, next) => {
    let id = req.params.id;

    try{
        let gameToEdit = await Game.findById(id);
        res.render('game/edit', {title: 'Edit Game', game: gameToEdit});
    } catch (err){
        console.log(err);
        res.status(500).send(err);

    }
});

// Post Route for processing the Edit page - UPDATE operation
router.post('/edit/:id', async (req, res, next) => {
    let id = req.params.id;

    let updatedGame = {
        "name": req.body.name,
        "developer": req.body.developer,
        "released": req.body.released,
        "description": req.body.description,
        "price": req.body.price
    };
    try{
      await Game.updateOne({_id: id}, updateGame);
      res.redirect('/game-list');
    } catch (err){
        console.log(err);
        res.status(500).send(err);

    }
});

// Get to perform Deletion - Delete operation
router.get('/delete/:id', async (req, res, next) => {
    let id = req.params.id; 

    try {
        await Game.findByIdAndRemove(id);
        res.redirect('/game-list');
    } catch (err){
        console.log(err);
        res.status(500).send(err);

    }
});

module.exports = router;