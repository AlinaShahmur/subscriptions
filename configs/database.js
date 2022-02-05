const mongoose = require('mongoose');
const subscriptionDB = process.env.DB_STRING

mongoose.connect(subscriptionDB, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})
