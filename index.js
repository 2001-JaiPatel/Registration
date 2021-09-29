const express = require('express');
const path = require('path');
const mongose = require('mongoose');
const cookieSession = require('cookie-session');
const db = require('./db');
require('dotenv').config();

const registerRouter = require('./routes/registration');
const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');
const passwordRouter = require('./routes/password');

const { API_PORT } = process.env;
const PORT = process.env.PORT || API_PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// cookie session
app.use(cookieSession({
    name: 'session',
    keys: ['jwt']
}));

app.use('/', registerRouter);
app.use('/', userRouter);
app.use('/', loginRouter);
app.use('/', passwordRouter);

async function init() {
    try {
        await db.init();

        console.log(`Starting user registration app on port ${PORT}...`);
        app.listen(PORT, () => {
            console.log(`Express server started on port ${PORT}'.`);
        });
    } catch (error) {
        if (error instanceof mongose.Error) {
            console.error(`Database Connection error ${error.message}`);
        }
        process.exit(1);
    }
}

init();
