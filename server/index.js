const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRouter = require('./routes/api')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect("mongodb://localhost/guestMap").then(
    ()=>{ console.log("connection to MongoDB successful")},
    (error)=>{ console.log("Connection to MongoDB failed "+ error)}
)

app.use("/api", apiRouter);

//server port
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`listening to port ${port}`);
});