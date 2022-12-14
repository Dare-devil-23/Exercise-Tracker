const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(process.env.MONGODB_URI ||  uri , {useNewUrlParser: true , useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("Mongodb connection success");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users' , usersRouter);

if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/dist'))
}

app.listen(port , ()=>{
    console.log(`Server is listening on port: ${port}`);
});

