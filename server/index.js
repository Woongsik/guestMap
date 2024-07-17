const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRouter = require('./routes/api')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname+"/Publichtml"));

const mongodb_url = process.env.MONGODB_URL;

mongoose.connect(mongodb_url, {dbName:"guestMap", useNewUrlParser: true }).then(
    () => {console.log("Connection to mongoDB successful")},
    (error) => {console.log("Connection to mongoDB failed:"+error)}
);


app.use("/api", apiRouter);

//server port
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`listening to port ${port}`);
});
