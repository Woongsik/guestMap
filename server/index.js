const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRouter = require('./routes/api')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//local mongo
// mongoose.connect("mongodb://localhost/guestMap").then(
//     ()=>{ console.log("connection to MongoDB successful")},
//     (error)=>{ console.log("Connection to MongoDB failed "+ error)}
// )


//database connection
let mongourl = 'mongodb+srv://shoppinglist:shoppingpassword@cluster0-9li3p.mongodb.net/test?retryWrites=true'

mongoose.connect(mongourl, {dbName:"guestMap", useNewUrlParser: true }).then(
    () => {console.log("Connection to mongoDB successful")},
    (error) => {console.log("Connection to mongoDB failed:"+error)}
);


app.use("/api", apiRouter);

//server port
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`listening to port ${port}`);
});