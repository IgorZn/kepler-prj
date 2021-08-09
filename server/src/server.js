const http = require('http');

const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

const MONGO_PWD = 'DXhmU5QV63U8nAxO';
const MONGO_USR = 'nasa-api';
const MONGO_DB = 'nasa-prj';
const MONGO_URL = `mongodb+srv://${MONGO_USR}:${MONGO_PWD}@nasacluster0.3fral.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;
const mongoose = require('mongoose');

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready...')
})

async function startServer() {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    });

    await loadPlanetsData();
    server.listen(PORT, () => {
        console.log(`Port: ${PORT}`);
        console.log(`URL: http://localhost:${PORT}`);
    });
};

startServer();

