const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
require('./passport');
require('./db');

const app = express();
app.use(express.json());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 *1000
    }

})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));


app.use('/auth', authRoutes);
app.use('/api/users', userRoutes)

app.listen(5000, () => console.log('Server is running on port 5000'));

