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
    const completeLaunchDate = {
                mission: 'Deep V ANAL',
                rocket: 'XXX 22 CM Black',
                target: 'Mega PIZDA 4X',
                launchDate: 'January 4, 2023'
            };

    const launchDataWithoutDate = {
                mission: 'Deep V ANAL',
                rocket: 'XXX 22 CM Black',
                target: 'Mega PIZDA 4X',
            };

    test('201 as response and created', async () => {
        const response = await request(app)
            .post('/launches')
            .send(completeLaunchDate)
            .expect('Content-Type', /json/)
            .expect(201)

        const requestDate = new Date(completeLaunchDate.launchDate).valueOf(); // to get numerical
        const responseDate = new Date(response.body.launchDate).valueOf();
        expect(responseDate).toBe(requestDate);

        expect(response.body).toMatchObject(launchDataWithoutDate);
    })

    test('It should catch missing required properties', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400)

        expect(response.body).toStrictEqual({
            error: 'Missing required launch property'
        });

    })

    test('It should catch invalid date', async () => {
        completeLaunchDate.launchDate = 'baz'

        const response = await request(app)
            .post('/launches')
            .send(completeLaunchDate)
            .expect('Content-Type', /json/)
            .expect(400)

        expect(response.body).toStrictEqual({
            error: 'Invalid launch date'
        });

    })
})