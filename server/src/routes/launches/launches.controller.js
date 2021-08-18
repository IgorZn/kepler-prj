const { getAllLaunches, scheduleNewLaunch, existLaunchWithId, abortLaunchById } = require('../../models/launches.model')

// Any function that working with http response or request
// will start with 'http'
// and return RESPONSE

async function httpGetAllLaunches(req, res) {
    return res.status(200).json(await getAllLaunches())
}

async function httpAddNewLaunch(req, res) {
    const launch = req.body;

    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Missing required launch property'
        })
    }

    launch.launchDate = new Date(launch.launchDate)
    if (isNaN(launch.launchDate)){
        return res.status(400).json({
            error: 'Invalid launch date',
        })
    }

    await scheduleNewLaunch(launch);
    return res.status(201).json(launch)
}

function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id)

    if (!existLaunchWithId(launchId)){
        return res.status(400).json({
            error: "Launch does not exist"
        })
    };

    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted)
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}