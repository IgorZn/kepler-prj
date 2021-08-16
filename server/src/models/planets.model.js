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

async function loadPlanetsData() {
    return new Promise( (resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(parse({
                comment: '#',
                columns: true
            }))
            .on('data', async (data) => {
                if (isHabitablePlanet(data)) {
                    await savePlanets(data);
                };
            })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
            .on('end', async () => {
                const countPlanetsFounds = (await getAllPlanets()).length;
                console.log(`${countPlanetsFounds} habitable planets found!`);
                resolve();
            })
    });
};

async function getAllPlanets() {
    return planets.find({}, {
        '_id': 0, '__v': 0
    });
};

async function savePlanets(planet) {
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name,
        }, {
            keplerName: planet.kepler_name,
        }, {
            upsert: true,
        });
    } catch (e) {
        console.error('Could not save planet: ' +  e);
    }

};

module.exports = {
    loadPlanetsData,
    getAllPlanets,
}