const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo')

// const launches = new Map();

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer 1',
    launchDate: new Date('December 27, 2030'),
    target: 'Ass',
    customers: [
        'ZTM', 'NASA'
    ],
    upcoming: true,
    success: true,
};

saveLaunch(launch)

let latestFlightNumber = launch.flightNumber;

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if (!planet) {
        throw new Error('No matching planet found')
    }

    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    });
}

function existLaunchWithId(launchId) {
    return launches.has(launchId);
};

async function getAllLaunches() {
    return launchesDatabase.find(
        {}, { '_id': 0, '__v': 0}
    );
};

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            success: true,
            upcoming: true,
            customers: ['Zero to Mastery', 'NASA'],
            flightNumber: latestFlightNumber,
    }))
};

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
};

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existLaunchWithId,
    abortLaunchById,
};