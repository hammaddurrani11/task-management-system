const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectToDB = require('./config/db');
connectToDB();
const userRouter = require('./routes/user.routes');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));


app.use('/', userRouter);

app.listen(3000, () => {
    console.log('App Listening on Port 3000');
});