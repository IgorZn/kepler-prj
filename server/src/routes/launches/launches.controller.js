const { getAllLaunches } = require('../../models/launches.model')

// Any function that working with http response or request
// will start with 'http'
// and return RESPONSE

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches())
}

module.exports = {
    httpGetAllLaunches,
}