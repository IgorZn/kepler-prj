const { getAllLaunches, addNewLaunch, existLaunchWithId } = require('../../models/launches.model')

// Any function that working with http response or request
// will start with 'http'
// and return RESPONSE

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches())
}

function httpAddNewLaunch(req, res) {
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
    addNewLaunch(launch);
    return res.status(201).json(launch)
}

function httpAbortLaunch(req, res) {
    const launchId = req.params.id

    if (!existLaunchWithId(launchId)){
        return res.status(400).json({
            error: "Launch does not exist"
        })
    }
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}