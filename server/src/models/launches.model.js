const launches = new Map();

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer 1',
    launchDate: new Date('December 27, 2030'),
    destination: 'Kepler-442 b',
    customer: [
        'ZTM', 'NASA'
    ],
    upcoming: true,
    success: true,
};

let latestFlightNumber = launch.flightNumber;

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
    return Array.from(launches.values())
};

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            success: true,
            upcoming: true,
            customer: ['Zero to Mastery', 'NASA'],
            fightNumber: latestFlightNumber,
    }))
};

module.exports = {
    getAllLaunches,
    addNewLaunch,
};