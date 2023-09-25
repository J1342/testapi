import db from "../models";
import { UserTypes } from '../user'
import { generateToken } from '../user/utils'
const request = require('supertest');
const app = require('../app');


let token;

beforeAll(async () =>{
    let user = await db.User.create({
        username: "admin",
        role: UserTypes.admin
    })
    let JWT = generateToken(user);
    token = JWT;
});

describe('genres api', () => {
    beforeEach(async () => {
         await db.Genre.create({
            name: 'Пьеса'
         })
    })
    
    afterEach(async () => {
         await db.Genre.destroy({
            where: {
                name: 'Пьеса'
            }
         });
    })

    test('get all genres 200', async function() {
        return request(app)
            .get("/genres/all")
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(1);
            })
    });
    
})

test('get all genres 404', async () => {
    return request(app)
    .get("/genres/all")
    .set('Authorization', `Bearer ${token}`)
    .then(response => {
        expect(response.statusCode).toBe(404);
    })
})


