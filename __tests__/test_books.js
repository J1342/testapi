import db from "../models";
import { UserTypes } from '../user'
import { generateToken } from '../user/utils'
const request = require('supertest');
const app = require('../app');



beforeAll(async () =>{
    await db.Book.create({
        title: "TestUpdate"
    })
    await db.Book.create({
        title: "TestDelete"
    })
});

afterAll(async () => {
    await db.User.destroy({
        where: {
            username: "admin"
        }
    })
    await db.Book.destroy({
        where: {
            title: "TestUpdate"
        }
    })
});

test('create book', async () => {
    let user = await db.User.findOne({
        where: {
            username: "admin"
        }
    })
    let token = generateToken(user);
    let response = await request(app)
                     .post("/books/create")
                     .send({title: "somebook"})
                     .set('Accept', 'application/json')
                     .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(200);
    expect(response.body[0].title).toMatch(/somebook/)
})

test('create book with authors', async () => {
    let user = await db.User.findOne({
        where: {
            username: "admin"
        }
    })
    let token = generateToken(user);
    let response = await request(app)
                     .post("/books/create")
                     .send({
                        title: "somebook",
                        authors: [
                            {
                                name: "lermontov"
                            }
                        ]
                     })
                     .set('Accept', 'application/json')
                     .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(200);
    expect(response.body[0].title).toMatch(/somebook/);
    expect(response.body[0].Authors[0].name).toMatch(/lermontov/);
})

test('update book', async () => {
    let user = await db.User.findOne({
        where: {
            username: "admin"
        }
    })
    let token = generateToken(user);
    let book = await db.Book.findOne({
        where: {
            title: "TestUpdate"
        }
    })
    let response = await request(app)
                                    .put(`/books/update/${book.id}/`)
                                    .send({title: "newtitle"})
                                    .set('Accept', 'application/json')
                                    .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toMatch(/newtitle/);
})

test('delete book', async () => {
    let user = await db.User.findOne({
        where: {
            username: "admin"
        }
    })
    let token = generateToken(user);
    let book = await db.Book.findOne({
        where: {
            title: "TestDelete"
        }
    })
    let response = await request(app)
                              .delete(`/books/delete/${book.id}/`)
                              .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(200);    
})