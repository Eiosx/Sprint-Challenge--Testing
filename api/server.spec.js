const request = require('supertest');

const server = require('./server');
const db = require('../data/dbConfig');

describe('server.js', () => {
    describe('GET /', () => {
        it('should return 200 OK', async () => {
            const response = await request(server).get('/');

            expect(response.status).toEqual(200);
        });
    });

    describe('/games', () => {

        describe('POST', () => {
            it('should take an object that includes at least a title and genre', async () => {
                const game = { title: 'Fallout', genre: 'rpg' };
                const response = await request(server).post('/games').send(game);
                expect(response.body).toEqual('created game')
            });
            it('should return status 422 if missing required information', async () => {
                const game = { title: 'Halo' };
                const response = await request(server).post('/games').send(game);
                expect(response.status).toBe(422);
            });
            it('should return status 201 if game is created', async () => {
                const game = { title: 'Dragon Age', genre: 'rpg' };
                const response = await request(server).post('/games').send(game);
                expect(response.status).toBe(201);
            });
        });

        describe('GET', () => {
            it('should always return array', async () => {
                const response = await request(server).get('/games');
                expect(Array.isArray(response.body)).toEqual(true);

            });
            it('should return a list of games and 200 OK', async () => {
                const response = await request(server).get('/games');
                
                expect(Array.isArray(response.body)).toEqual(true)
                expect(response.status).toBe(200);
            });
            it('should return an empty array when there are no games', async () => {
                await db('games').truncate();
                const response = await request(server).get('/games');
                expect(response.body).toEqual([]);
            });

        });
    });
});