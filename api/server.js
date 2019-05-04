const express = require('express');

const server = express();
const parser = express.json();
const db = require('../data/dbConfig');

server.use(parser);


server.get('/', async(req, res) => {
    res.status(200).json({api: 'running'});
});

server.post('/games', async(req, res) => {
    const game = req.body;
    if(game.title && game.genre){
        await db('games').insert(game);

        res.status(201).json('created game');
    }else{
        res.status(422).json({message: 'Please include at least a title and genre'});
    }

});

server.get('/games', async(req, res) => {
    const gamesList = await db('games');
    res.status(200).json([...gamesList]);
})

module.exports = server;