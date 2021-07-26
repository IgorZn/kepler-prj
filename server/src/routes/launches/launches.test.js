const request = require('supertest')
const app = require('../../app')

describe('Test GET /launches', () => {
    test('It should response 200', async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200)
    })
})

describe('Test POST /launches', () => {
    test('200 as response', () => {

    })

    test('It should catch missing required properties', () => {

    })

    test('It should catch invalid date', () => {

    })
})