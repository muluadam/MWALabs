const mongoose = require("mongoose");
require("dotenv").config();
require("./games-model");

const dbName = "meanGameDb";

const dburl = process.env.DB_URL + process.env.DB_NAME;

console.log("DBURL-------------"+dburl);

mongoose.connect(dburl,{ useNewUrlParser: true, useUnifiedTopology: true } );

mongoose.connection.on("connected", function () {
    console.log("mongoose connected to", dburl);
});

mongoose.connection.on("Disconnected", function () {
    console.log("mongoose disconnected to", dburl);
});

mongoose.connection.on("errpr", function () {
    console.log("mongoose error to", dburl);
});


process.on("SIGINT", function () {
    mongoose.connection.close(function () {
        console.log("Mongoose disconnected by app  termination");
        process.exit(0);
    });
});


process.on("SIGTERM", function () {
    mongoose.connection.close(function () {
        console.log("Mongoose disconnected by app        termination");
        process.exit(0);
    });
});
process.once("SIGUSR2", function () {
    mongoose.connection.close(function () {
        console.log("Mongoose disconnected by app        termination");
        process.kill(process.pid, "SIGUSR2");
    });
});