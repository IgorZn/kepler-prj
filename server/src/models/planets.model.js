const fs = require('fs');
const path = require('path')
const parse = require('csv-parse');

const fileName = 'kepler_data.csv';
const filePath = path.join(__dirname, '..', '..', 'data', fileName)

const planets = require('./planets.mongo')

const habitablePlanet = [];

const isHabitablePlanet = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36
        && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
    };

function loadPlanetsData() {
    return new Promise( (resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(parse({
                comment: '#',
                columns: true
            }))
            .on('data', (data) => {
                if (isHabitablePlanet(data)) {
                    // TODO: Replace below create with insert + update = upsert
                    // planets.create({
                    //     keplerName: data.kepler_name
                    // });
                };
            })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
            .on('end', () => {
                console.log(`${habitablePlanet.length} habitable planets found!`);
                resolve();
            })
    });
};

async function getAllPlanets() {
    return await planets.find({});
}

module.exports = {
    loadPlanetsData,
    getAllPlanets,
}