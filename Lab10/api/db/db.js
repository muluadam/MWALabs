const mongoose = require("mongoose")
const dotenv = require("dotenv")
const log = console.log;
const dburl = process.env.DB_URL + process.env.DB_NAME;
log("URL=", dburl);
mongoose.connect(dburl, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err));

mongoose.connection.on("connect", function () {
    log("Database is connected to ", process.env.DB_NAME);
})

mongoose.connection.on("disconnected", function () {
    log("Database disconnected to", process.env.DB_NAME)
})
mongoose.connection.on("closed", function () {
    log("Database Conneciton closed", process.env.DB_NAME)

});

process.on("SIGINT", function () {
    mongoose.connection.close(function () {
        log("Database connection is closed by Termination");
        process.exit();
    })
})

process.on("SIGUSR1", function () {
    mongoose.connection.close(function () {
        log("Database connection closed by USer");
    })
})

process.on("SIGTERM", function () {
    mongoose.connection.close(function () {
        log("Connection closed by SIGTERM")
    })
})
