const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');

require('dotenv').config();


const app = express()
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors())

const uri = process.env.ATLAS_URI;

mongoose.connect(uri)

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connected to MongoDB database')
})

const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
   res.send('Connection established')
})

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
})