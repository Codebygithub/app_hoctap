const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors({
    origin:'http://127.0.0.1:5500',
    methods:'POST , DELETE , PUT , PATCH, OPTIONS'
}));
app.use(express.json());

const UserRoute = require('./Router/UserRoute')
const AuthRoute = require('./Router/AuthRoute')
const mongoose = require('mongoose');

// const cors = require('cors')
//connect db
mongoose.connect('mongodb://127.0.0.1:27017/Mern_auth')
    .then(()=> {
        console.log('connect db success');
    })
    .catch(()=> {
        console.log('connect db error');
    })
require('dotenv').config()
//router
app.use('/auth/admin',UserRoute)
app.use('/api/auth',AuthRoute)


app.listen(process.env.PORT, ()=> {
    console.log(`listening on localhost ${process.env.PORT}`);
})